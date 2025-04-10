import deleteIcon from "../../assets/icons/rubbish-bin.svg";
import Project from "./project";
import { projectManager } from "./projectManager";
import { todoListDOM } from "./todoListDOM";

class ProjectListDOM {
  constructor() {
    const projectsStorage = localStorage.getItem("projects");
    this.projects = projectsStorage ? JSON.parse(projectsStorage) : [];
    this.projects = this.projects.map(
      (project) => new Project(project.title, project.todos),
    );

    this.projectListUL = document.querySelector(".project__list");

    this.deleteIcon = deleteIcon;

    this.init();
    this.render();
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
        projectManager.deleteProject(project);
        li.remove();

        event.stopPropagation();
      });

      li.addEventListener("click", () => {
        console.log("bubbling");
        projectManager.setprojectSelected(li.getAttribute("data-index"));
        todoListDOM.render(project, projects.indexOf(project));
      });

      this.projectListUL.appendChild(li);
    }
  }

  addProject(newProject) {
    projectManager.addProject(newProject);
    this.render();
  }
}

export const projectListDOM = new ProjectListDOM();
