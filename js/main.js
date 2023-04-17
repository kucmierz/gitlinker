// const Git = require("nodegit");//Node.js
const git = require('git.js');

let projects = [
    {
        id: 1,
        name: 'Example project 1',
        link: 'https://gitlab.com/example-project-1'
    },
    {
        id: 2,
        name: 'Example project 2',
        link: 'https://gitlab.com/example-project-2'
    },
    {
        id: 3,
        name: 'Example project 3',
        link: 'https://gitlab.com/example-project-3'
    }
]

const projectList = document.querySelector('#project-list');
const addProject = document.querySelector('#add-project');
const projectName = document.querySelector('#project-name');
const projectLink = document.querySelector('#project-link');
const gitMethod = document.querySelector('#git-method');
const credentials = document.querySelector('#credentials');

const addNewProjectToHTMLElem = (projectID, projectName, htmlElem) => {
    htmlElem.innerHTML += `
        <li>
            <strong>${projectName}</strong>
            <span id="${projectID}">Remove</span>
        </li>
    `;
}

const loadProjectToHTMLElem = (array, htmlElem) => {
    htmlElem.innerHTML = '';
    for (const project of array) {
        addNewProjectToHTMLElem(project.id, project.name, htmlElem);
    }
}

loadProjectToHTMLElem(projects, projectList);


const getNewProjectID = () => {
    let projectID = 1;
    if (projects.length > 0) {
        projectID = projects[projects.length - 1].id + 1;
    }
    return projectID;
}

const handleAddProject = (ev) => {
    // validation - adding no empty values
    if (projectName.value === '' || projectLink.value === '') {
        return 0;
    }
    ev.preventDefault();
    // getting the next id
    const projectID = getNewProjectID();
    // creating the new project
    const newProject = {
        id: projectID,
        name: projectName.value,
        link: projectLink.value
    };
    // add project to projects list
    projects.push(newProject);
    // load project to projects list on the page
    loadProjectToHTMLElem(projects, projectList);
    // reset inputs
    projectName.value = '';
    projectLink.value = '';
}

const handleProjectList = (ev) => {
    if (ev.target.id) {
        // console.log(ev.target.id);
        // remove element from project list
        projects = projects.filter(project => project.id != ev.target.id);
        // remove project from the page
        ev.target.parentElement.remove();
    }
}

const gitClone = () => {
    // const repoUrl = "https://github.com/ROGAL12321/alx-zaawansowany-apps-2023.git";
    // const localPath = "/Users/marekkucmierz/Desktop/temp_gitlinker/";


    // git().clone(repoUrl, localPath).then(function (repo) {
    //     console.log("Repository cloned successfully!");
    // }).catch(function (error) {
    //     console.log("Error cloning repository:", error);
    // });

    // Node.js code
    // Git.Clone(repoUrl, localPath)
    //     .then(function (repository) {
    //         console.log("Repository cloned successfully!");
    //     })
    //     .catch(function (error) {
    //         console.log("Error cloning repository:", error);
    //     });
}

const handleGitExecution = (ev) => {
    ev.preventDefault();

    if (ev.target.id === 'git-clone') {
        console.log('clone execution');
    }
    if (ev.target.id === 'git-pull') {
        console.log('pull execution');
    }
}

const handleGitMethod = (ev) => {
    if (ev.target.id === 'git-pull') {
        credentials.classList.remove('credentials-off');
    }
    if (ev.target.id === 'git-clone') {
        credentials.classList.add('credentials-off');
    }
}

projectList.addEventListener('click', handleProjectList);
addProject.addEventListener('submit', handleAddProject);
gitMethod.addEventListener('submit', handleGitExecution);
gitMethod.addEventListener('click', handleGitMethod);