import { actionDOM } from "./actionDOM";
import { todoListDOM } from "./todoListDOM";

export default class MainDOM {
  constructor() {
    // localStorage.setItem("projects", JSON.stringify(projects));
    this.projects = JSON.parse(localStorage.getItem("projects"));
    // this.todoListUI = new TodoListDOM(this.projects[0]);
    this.actionDOM = actionDOM;
    this.todoListDOM = todoListDOM;
    this.todoListDOM.render(this.projects[0]);
  }
}
