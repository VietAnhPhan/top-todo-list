import Project from "./project";
// import ModalDOM from "./ModalDOM";
import TodoListDOM from "./todoListDOM";
// import ProjectListDOM from "./projectListDOM";
import { actionDOM } from "./actionDOM";
import { projectListDOM } from "./projectListDOM";
import { todoListDOM } from "./todoListDOM";

export default class MainDOM {
  constructor(projects) {
    // localStorage.setItem("projects", JSON.stringify(projects));
    this.projects = JSON.parse(localStorage.getItem("projects"));
    this.projectListDOM = projectListDOM;
    // this.todoListUI = new TodoListDOM(this.projects[0]);
    this.actionDOM = actionDOM;
    this.todoListDOM = todoListDOM;
    this.todoListDOM.render(this.projects[0]);
  }

  // handleSubmit() {
  //     event.preventDefault();

  //     // const li = document.createElement("li");
  //     // li.textContent = projectName;
  //     // this.projects.appendChild(li);

  //     // dialog.close();
  // }
}
