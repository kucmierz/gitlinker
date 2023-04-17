const projects = [
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

// const handleProjectList = (ev) => {
//     console.log('list elem was clicked');
// }

const getNewProjectID = () => {
    let projectID = 1;
    if (projects.length > 0) {
        projectID = projects[projects.length - 1].id + 1;
    }
    return projectID;
}

const handleAddProject = (ev) => {
    if (projectName.value === '' || projectLink.value === '') {
        return 0;
    }
    ev.preventDefault();
    const projectID = getNewProjectID();
    const newProject = {
        id: projectID,
        name: projectName.value,
        link: projectLink.value
    };
    projects.push(newProject);
    loadProjectToHTMLElem(projects, projectList);
}

const handleProjectList = (ev) => {
    if (ev.target.id) {
        console.log(ev.target.id);
        // usun element o danym id z listy projektow
        // ev.target.parentElement.remove();
    }
}

projectList.addEventListener('click', handleProjectList);
addProject.addEventListener('submit', handleAddProject);