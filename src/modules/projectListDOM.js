import ModalDOM from "./modalDOM";
import TodoListDOM from "./todoListDOM";
import deleteIcon from "../../assets/icons/rubbish-bin.svg";
import Project from "./project";
import { projectManager } from "./projectManager";
import { todoListDOM } from "./todoListDOM";

class ProjectListDOM {
  constructor(projects) {
    const projectsStorage = localStorage.getItem("projects");
    this.projects = projectsStorage ? JSON.parse(projectsStorage) : [];
    this.projects = this.projects.map(
      (project) => new Project(project.title, project.todos),
    );
    // console.log(this.projects);
    // localStorage.setItem("projects", JSON.stringify(this.projects));
    this.projectListUL = document.querySelector(".project__list");

    this.deleteIcon = deleteIcon;
    // this.ModalDOM = new ModalDOM();
    // this.todoListUI = new TodoListDOM(this.projects);

    this.init();
    this.render();
  }

  init() {
    // this.addProjectBtn.addEventListener("click", () => this.ModalDOM.openProjectModal(
    //        this
    // ));
  }

  render() {
    const projects = projectManager.getProjects();
    this.projectListUL.textContent = "";

    for (let project of projects) {
      const li = document.createElement("li");
      const projectTitleSpan = document.createElement("span");
      const deleteProjectIcon = document.createElement("img");

      deleteProjectIcon.setAttribute("src", deleteIcon);
      li.setAttribute("data-index", projects.indexOf(project));

      li.classList.add("project__list-item");
      deleteProjectIcon.classList.add("button__action");

      projectTitleSpan.textContent = project.title;

      li.append(projectTitleSpan, deleteProjectIcon);

      deleteProjectIcon.addEventListener("click", (event) => {
        // projects.splice(projects.indexOf(project), 1);
        // console.log( projects);
        projectManager.deleteProject(project);
        li.remove();
        // localStorage.setItem("projects", JSON.stringify(projects));
        event.stopPropagation();
      });

      li.addEventListener("click", () => {
        console.log("bubbling");
        projectManager.setprojectSelected(li.getAttribute("data-index"));
        todoListDOM.render(project, projects.indexOf(project));
        // const todoListUI = new TodoListDOM(project);
      });

      this.projectListUL.appendChild(li);
    }
  }

  addProject(newProject) {
    projectManager.addProject(newProject);
    this.render();
    // this.projects.push(newProject);
    // localStorage.setItem("projects", JSON.stringify(this.projects));

    // const li = document.createElement("li");
    //     const title = document.createElement("span");
    //     const deleteBtn = document.createElement("img");

    //     deleteBtn.setAttribute("src", deleteIcon);
    //     li.classList.add("project__list-item")
    //     deleteBtn.classList.add("button__action");
    //     title.textContent = newProject.title;

    //     li.append(title, deleteBtn);

    //     deleteBtn.addEventListener("click", (event) => {

    //         this.projects.splice(this.projects.indexOf(newProject), 1);
    //         console.log( this.projects);
    //         li.remove();
    //         event.stopPropagation();

    //     });

    //     li.addEventListener("click", () => {
    //         console.log("bubbling")
    //         // const todoListUI = new TodoListDOM(newProject);
    //         // this.todoListUI.display(newproject);
    //     });

    //     this.projectListUL.appendChild(li);
  }
}

export const projectListDOM = new ProjectListDOM();
