import { compareDesc } from "date-fns";
import { format } from "date-fns";
import { modalDOM } from "./modalDOM";
import { projectManager } from "./projectManager";
import { todoListDOM } from "./todoListDOM";

class ActionDOM {
  constructor() {
    this.addProjectBtn = document.querySelector(".project__add-btn");

    this.addProjectBtn.addEventListener("click", () => {
      modalDOM.openProjectModal();
    });

    this.addTodoBtn = document.querySelector(".button__add");

    this.addTodoBtn.addEventListener("click", () => {
      modalDOM.openAddTodo();
    });

    this.importantMenu = document.querySelector("#menu__important");

    this.importantMenu.addEventListener("click", () => {
      const priorityProject = {
        title: "Important",
        todos: [],
      };

      const projects = projectManager.getProjects();
      projects.forEach((project) => {
        const todos = project.todos.filter((todo) => todo.priority == true);
        todos.forEach((todo) => {
          priorityProject.todos.push(todo);
        });
      });

      todoListDOM.render(priorityProject);
    });

    this.homeMenu = document.querySelector("#menu__home");
    this.homeMenu.addEventListener("click", () => {
      todoListDOM.render(projectManager.getFirstProject());
    });

    this.incomingMenu = document.querySelector("#menu__incoming");
    this.incomingMenu.addEventListener("click", () => {
      //    console.log(format(new Date(), 'yyyy-MM-dd'));
      const incomingTodoProject = {
        title: "Important",
        todos: [],
      };

      const projects = projectManager.getProjects();
      // console.log(projects);
      projects.forEach((project) => {
        const todos = project.todos.filter((todo) => {
          if (
            compareDesc(todo.dueDate, format(new Date(), "yyyy-MM-dd")) == -1 ||
            compareDesc(todo.dueDate, format(new Date(), "yyyy-MM-dd")) == 0
          ) {
            return true;
          }
        });

        todos.forEach((todo) => {
          incomingTodoProject.todos.push(todo);
        });
      });

      todoListDOM.render(incomingTodoProject);
    });
  }
}

export const actionDOM = new ActionDOM();
