//server-side content
const express = require('express');
const {exec, spawn} = require('child_process');
const bodyParser = require('body-parser')
const cors = require('cors');
const { glob } = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

app.post('/cl-search', (req, res) => {
    const globalPath = req?.body?.globalPath;
    const keyWord = req?.body?.keyWord.trim();
    exec(`cd ${globalPath}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.log('stderr message', stderr?.message);
            const originalConsoleLog = console.log;
            const loggedText = [];
            console.log = function (message) {
                loggedText.push(message);
                originalConsoleLog.apply(console, arguments);
            };
            console.log({'error': stderr})
            const savedErrorLog = loggedText;
            console.log = originalConsoleLog;

            res.send(savedErrorLog);
            return;
        }

        const command = `cd ${globalPath} && git branch -a | cut -c3- | cut -d' ' -f 1 | xargs -I {} git grep --line-number --ignore-case "${keyWord}" {} -- ':!build' ':!node_modules' ':!.*'`;
        const process = spawn(command, {cwd: globalPath, shell: true});
        let output = '';
        let errorOutput = '';
        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        process.on('close', (code) => {
            console.log('here in close')
            if (code === 0) {
                const matches = output.split('\n').map((str) => {
                    if (str === '' || str === null) {
                        return false;
                    }
                    const parts = str.split(':');
                    return (parts.length > 4) ?
                        {'branch': parts.shift(), 'file': parts.shift(), 'line': parts.shift(), 'content': parts.join(':')}
                        : {'branch': parts[0], 'file': parts[1], 'line': parts[2], 'content': parts[3]};
                });
                console.log('matches are here', matches)
                res.send(matches);
                return;
            } 
            if (errorOutput !== '') {
                console.log('here in an error', errorOutput)
                res.send([{'error': errorOutput}]);
                return;
            }
            res.send([]);
            return;
        });
    });
});

app.listen(port, () => {
    console.log('Server listening on port', port);
});

app.use(express.static('public'));