## Why git-search?
The search tool on GitHub currently only performs a search within the main branch of a repository. While this is helpful, it is very limited for what AMEX developers need.
**git-search** solves this problem by allowing the developer to search a key word in all branches of a git repo. Just provide the **link to the main branc**h of the repo and start searching!

## Environment setup
- A valid GitHub token is required to access the GitHub Rest API.
   - :star:️ see [this page](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) for step by step instructions on creating a GitHub access token.
   - No specific access requirements are needed for this token. Select any access you want. 
   - Make sure this token is set as an environment variable called `GITHUB_PERSONAL_ACCESS_TOKEN` in your system. Add this line to your `bash` or `zsh` profile:
     ```
     export GITHUB_PERSONAL_ACCESS_TOKEN="<your-access-token>"
     ```
  - :exclamation:️NOTE: After you add the env variable, **restart the terminal** so that the latest changes are synched. This step is crucial for the tool to access your GitHub token.

## Get the project running on local
Open the terminal window and execute command `npm run dev` in the project directory.
Go to http://localhost:3000/ to use the search.

In the search bars, type in the code you want to search and the **link to the main branch** of the git repo you want to search in. You should then see the search results pop up! You can filter by branch as well. Please let me know if you find any bugs.

:exclamation:️NOTE: If you have an ssh password set up for GitHub, you will have to input this password in terminal **upon every search** with git-search! You may want to remove your password or add it to your keychain by following [these steps](https://docs.github.com/en/enterprise-server@3.13/authentication/connecting-to-github-with-ssh/working-with-ssh-key-passphrases)

## Application Demo




https://github.com/user-attachments/assets/73596a2f-2884-4d79-9ce8-ab504e80088e






## Contact
Erin Horbacz <erinhorbacz@gmail.com>
