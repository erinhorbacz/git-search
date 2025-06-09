import { Octokit } from "octokit";

export const getProxy = async () => {
  const { proxyServer, gh_auth } = await fetch("http://localhost:2727/access-env")
    .then((res) => res.json())
    .then((data) => data);
  return { proxyServer, gh_auth };
};

// establish the octokit connection
const res = (async () => {
  const { proxyServer, gh_auth } = await getProxy();
  const octokit = new Octokit({
    auth: gh_auth,
    baseUrl: "https://api.github.com",
    agent: proxyServer,
  });

  return { octokit: octokit, gh_auth: gh_auth };
})();
const { octokit, gh_auth } = await res;

const searchRepoUsingOctokit = async (owner, repo) => {
  if (!gh_auth) {
    return {
      error:
        "GitHub personal access token not found in environment variables. Please add it to environment and restart git-search.",
    };
  }
  try {
    // const splitRepo = searchRepo.split("/");
    // const repo = splitRepo.pop();
    // const owner = splitRepo.pop();
    console.log("searching for repo:", owner, repo);
    const res = await octokit.request("GET /repos/{owner}/{repo}", {
      // owner: "amex-eng",
      // repo: "isp-root",
      owner,
      repo,
      headers: {
        authorization: gh_auth,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return res;
  } catch (error) {
    return { error: error };
  }
};

export const searchRepo = async (keyWord, owner, repo, setMatches, setError) => {
  //get the repo name and check if it is valid
  const res = await searchRepoUsingOctokit(owner, repo);
  //handle any errors.
  if (res?.error || !res?.data?.ssh_url) {
    setMatches([]);
    //a repo not found error occurred
    if (!res?.data?.ssh_url) {
      console.log("Error getting GitHub repo from Octokit:", res?.error);
      setError(
        `Error getting repo ${repo} from GitHub. Ensure correct spelling of name. Check console for more info.`
      );
      return;
    }
    //a personal access token error occurred
    if (res?.error?.includes("personal access token")) {
      setError(res?.error);
      return;
    }
    //a general error occurred. Provide more info in the console
    console.log("Error getting GitHub repo from Octokit:", res?.error);
    setError(
      `Error getting repo ${repo} from GitHub. Ensure correct spelling of name. Check console for more info.`
    );
    return;
  }
  const sshUrl = res?.data?.ssh_url;

  //make the search
  const matches = await fetch("http://localhost:2727/cl-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyWord,
      repo,
      sshUrl,
    }),
  });
  const reader = matches.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const matches = decoder.decode(value);
    const lines = matches.split("\n").filter((match) => match.trim() !== "");
    if (lines[0]?.error) {
      setMatches([]);
      setError(matches[0]?.error);
      break;
    }
    if (matches === "there are no matches") {
      setMatches("no ouput");
      break;
    }

    let parsedLines = [];
    lines.forEach((line) => {
      try {
        const data = JSON.parse(line);
        parsedLines.push(data);
      } catch (e) {
        console.warn("Error parsing JSON:", e);
      }
    });
    setMatches((prev) => [...prev, ...parsedLines]);
  }
};

export const searchFile = async (repoLink, branch, file) => {
  const splitRepo = repoLink.split("/");
  const repo = splitRepo.pop();
  const owner = splitRepo.pop();
  const res = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path: file,
    ref: branch,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return res?.data?.html_url;
};

export const getBranches = async (owner, repoLink) => {
  console.log("inside the get branches function");
  const res = await octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner,
    repo: repoLink,
    per_page: 100,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const branches = [...new Set(res?.data?.map((branch) => branch?.name))];
  console.log("branches", branches);
  return branches;
};
