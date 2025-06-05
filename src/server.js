// Server-side code
const express = require("express");
const { exec, spawn, execAsync } = require("child_process");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

let numLines = 0;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const port = 2727;

const getErrMessage = (stderr) => {
  const originalConsoleLog = console.log;
  const loggedText = []; // Array to store logged text

  console.log = function (message) {
    loggedText.push(message);
    originalConsoleLog.apply(console, arguments);
  };
  console.log({ error: stderr });

  const savedErrorLog = loggedText; // Assign the array to a constant

  console.log = originalConsoleLog;
  return savedErrorLog;
};

app.post("/cl-search", async (req, res) => {
  const repoLink = req?.body?.repoLink;
  const keyWord = req?.body?.keyWord.trim();
  const sshUrl = req?.body?.sshUrl;

  //clone the repo in HOME path
  const home_dir = process.env.HOME;
  const repoFolder = `${repoLink}_git-search`;
  const pathToRepo = path.join(home_dir, repoFolder);

  //check if the repo already exists in cache and remove
  if (fs.existsSync(pathToRepo)) {
    await execAsync(`rm -rf ${pathToRepo}`);
  }
  exec(`git clone ${sshUrl} ${pathToRepo}`, (error, stdout, stderr) => {
    if (error) {
      console.log("error with git clone command", error, stderr);
      const savedErrorLog = getErrMessage(stderr);
      if (fs.existsSync(pathToRepo)) {
        exec(`rm -rf ${pathToRepo}`);
      }
      res.send([{ error: `Error cloning repo ${repoLink} to ${pathToRepo}: ${savedErrorLog}` }]);
      return;
    }

    //perform the search in the cloned repo
    try {
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      });

      const command = `cd ${pathToRepo} && git branch -a | cut -c3- | cut -d' ' -f 1 | xargs -I {} git grep --line-number --ignore-case "${keyWord}" {} -- ':!build' ':!node_modules' ':!.*'`;
      const process = spawn(command, { cwd: pathToRepo, shell: true });

      let terminalMatches = "";
      let errorOuput = "";
      let isStdout = false;

      process.stdout.on("data", (data) => {
        isStdout = true;
        if (!data) {
          res.write("there are no matches");
          process.kill();
          res.end();
        }
        const output = data.toString().split("\n");
        output.forEach((line) => {
          numLines += 1;
          if (!line || line === null) return;

          const parts = line?.split(":");
          if (parts?.length > 4) {
            const data = {
              branch: parts?.shift().replace("remotes/origin/", ""),
              file: parts?.shift(),
              line: parts?.shift(),
              code: parts?.join(":"),
            };
            terminalMatches += JSON.stringify(data) + "\n";
          } else if (parts?.length <= 4) {
            const data = {
              branch: parts[0]?.replace("remotes/origin/", ""),
              file: parts[1],
              line: parts[2],
              code: parts[3],
            };
            terminalMatches += JSON.stringify(data) + "\n";
          }
        });
        if (numLines >= 500) {
          res.write(terminalMatches);
          terminalMatches = "";
          numLines = 0;
        }
      });

      process.stderr.on("data", (data) => {
        errorOuput += data.toString();
      });

      //filter the output
      process.on("close", (code) => {
        if (fs.existsSync(pathToRepo)) {
          exec(`rm -rf ${pathToRepo}`);
        }
        if (errorOuput !== "") {
          const errorMsg = { error: `An error occurred: ${errorOuput}` };
          res.write(JSON.stringify(errorMsg) + "\n");
        }
        if (!isStdout) {
          // sending message that there were no search results
          res.write("there are no matches");
        }
        //send the rest of the matches. Or if we didn't have more than 500 matches, send them all together
        if (terminalMatches) {
          res.write(terminalMatches);
          terminalMatches = "";
          numLines = 0;
        }
        res.end();
      });
    } catch (e) {
      console.log("caught an error\n");
      if (fs.existsSync(pathToRepo)) {
        exec(`rm -rf ${pathToRepo}`);
      }
      const errorMsg = { error: `An error occurred: ${e}` };
      res.write(JSON.stringify(errorMsg) + "\n");
      res.end();
    }
  });
});

app.get("/access-env", (req, res) => {
  var proxyServer =
    process.env.http_proxy ||
    process.env.HTTP_PROXY ||
    process.env.https_proxy ||
    process.env.HTTPS_PROXY ||
    "None";
  var gh_auth = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  res.send({ proxyServer: proxyServer, gh_auth: gh_auth });
});

app.listen(port, () => {
  console.log("Server listening on port ", port);
});

app.use(express.static("public"));
