import {Octokit} from 'octokit';

const octokit = new Octokit({
    auth: '',
    baseUrl: '',
})

export const searchBranch = (keyWord, globalPath) => {
    return fetch('http://localhost:3001/cl-search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            keyWord,
            globalPath,
        })
    }).then(response => {
        return response.json().then(data => {
            return data
        });
    });
}