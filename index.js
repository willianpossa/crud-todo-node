const express = require('express');

const server = express();

server.use(express.json());

let projects = [];
let numberOfRequests = 0;

function checkIfIDExist(req, res, next) {
    const { id } = req.params;

    const project = projects.find(project => project.id == id);

    if(!project) {
        return res.status(404).json({
            error: "Project Not Found"
        })
    }

    req.id = req.params.id;

    return next();
};

function logRequests(req, res, next) {
    numberOfRequests++;

    console.log(`Número de requisições feitas até agora: ${ numberOfRequests }`);

    return next();
}

server.use(logRequests);

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    projects.push({
        ...req.body,
        tasks: []
    });

    return res.send();
});

server.put('/projects/:id', checkIfIDExist, (req, res) => {
    const { title } = req.body;

    projects = projects.map(project => {
        if(project.id == req.id) {
            project = {
                ...project,
                title
            }
        }

        return project;
    });

    return res.send();
});

server.delete('/projects/:id', checkIfIDExist, (req, res) => {
    projects = projects.filter(project => project.id !== req.id);

    return res.send();
});

server.post('/projects/:id/tasks', checkIfIDExist, (req, res) => {
    const { title } = req.body;

    projects = projects.map(project => {
        if(project.id == req.id) {
            project = {
                ...project,
                tasks: project.tasks.concat([title])
            }
        }

        return project;
    });

    return res.send();
});

server.use((req, res, next) => {
    requests.push(Date.now());

    return next();
});

server.listen('5000');