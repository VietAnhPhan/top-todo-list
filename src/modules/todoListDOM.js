import fillStarButton from "../../assets/icons/star-fill.svg";
import hollowStarButton from "../../assets/icons/star-hollow.svg";
import deleteButton from "../../assets/icons/rubbish-bin.svg";
import ModalDOM, { modalDOM } from "./modalDOM";
import { projectManager } from "./projectManager";

class TodoListDOM {
  constructor(projects) {
    // this.projectName = project.title;

    // this.project = project;
    // this.projects = JSON.parse(localStorage.getItem("projects"));
    this.projects = projects;
    this.projectTitleSpan = document.querySelector(".project__title");
    this.todoListUL = document.querySelector(".todo__list");
    this.addBtn = document.querySelector(".button__add");
    // this.modalUI = new ModalDOM();

    // this.display(this.projects[0]);
    this.attachEvent();

    // console.log(this.projects[0])
  }

  attachEvent() {
    this.addBtn.addEventListener("click", () => {
      // this.modalUI.openAddTodo(this);
    });
  }

  render(project) {
    // console.log(project);
    this.todoListUL.textContent = "";
    this.projectTitleSpan.textContent = project.title;

    for (const todo of project.todos) {
      const li = document.createElement("li");
      const isCompletedcheckbox = document.createElement("input");
      const todoTitleSpan = document.createElement("span");
      const prorityStatusImg = document.createElement("img");
      const deleteTodoBtn = document.createElement("img");

      isCompletedcheckbox.type = "checkbox";

      todoTitleSpan.textContent = todo.title;

      li.classList.add("todo", "flex", "gap-10", "align-center");
      todoTitleSpan.classList.add("todo__title");
      isCompletedcheckbox.classList.add("todo__checkbox");
      prorityStatusImg.classList.add("todo__priority");

      deleteTodoBtn.classList.add("button__action");

      li.setAttribute("data-index", project.todos.indexOf(todo));

      deleteTodoBtn.setAttribute("src", deleteButton);

      if (todo.completed) {
        isCompletedcheckbox.checked = true;
        todoTitleSpan.classList.add("todo__status_done");
      }

      if (todo.priority) {
        prorityStatusImg.setAttribute("src", fillStarButton);
      } else {
        prorityStatusImg.setAttribute("src", hollowStarButton);
      }

      isCompletedcheckbox.addEventListener("click", (event) => {
        event.stopPropagation();
        if (isCompletedcheckbox.checked) {
          todoTitleSpan.classList.add("todo__status_done");
          todo.completed = true;
        } else {
          todoTitleSpan.classList.remove("todo__status_done");
          todo.completed = false;
        }
        console.log(li.getAttribute("data-index"));
        projectManager.setCompleted(li.getAttribute("data-index"));
      });

      if (todo.priority) {
        li.classList.add("todo__priority_bg_clr");
      } else {
        li.classList.remove("todo__priority_bg_clr");
      }

      prorityStatusImg.addEventListener("click", (event) => {
        event.stopPropagation();
        if (prorityStatusImg.getAttribute("src") == fillStarButton) {
          todo.priority = false;
          prorityStatusImg.setAttribute("src", hollowStarButton);
          li.classList.remove("todo__priority_bg_clr");
        } else {
          todo.priority = true;
          prorityStatusImg.setAttribute("src", fillStarButton);
          li.classList.add("todo__priority_bg_clr");
        }
        projectManager.setPriority(
          projectManager.getSelectedProject(),
          li.getAttribute("data-index"),
        );
      });

      li.addEventListener("click", (event) => {
        projectManager.setTodoSelectedIndex(project.todos.indexOf(todo));
        modalDOM.openEditTodo(todo);
        // this.modalUI.openEditTodo({
        //     todo: todo,
        //     el: event.currentTarget,
        //     hollow_star: hollowStarButton,
        //     fill_star: fillStarButton
        // });
      });

      deleteTodoBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        this.deleteTodo(project.todos.indexOf(todo));
        // const updatedProjectIndex=li.getAttribute('data-index');
        // this.project.todos.splice(this.project.todos.indexOf(todo), 1);
        // this.projects = this.projects.map((project,index)=>{
        //     if(index == updatedProjectIndex){
        //         return {
        //             ...project,
        //             todos:  this.project.todos
        //         }
        //     }
        // });

        // localStorage.setItem("projects", JSON.stringify(this.projects));
        // li.remove();
      });

      li.append(
        isCompletedcheckbox,
        todoTitleSpan,
        prorityStatusImg,
        deleteTodoBtn,
      );

      this.todoListUL.appendChild(li);
    }
  }

  add(newTodo) {
    newTodo.project = this.project.title;

    this.project.todos.push(newTodo);
    const projectID = this.projects.indexOf(this.project);

    this.projects = this.projects.map((project) => {
      if (this.projects.indexOf(this.project == projectID)) {
        return {
          ...project,
          todos: this.project.todos,
        };
      }
    });

    // this.projects.push(this.project);
    localStorage.setItem("projects", JSON.stringify(this.projects));
    this.addToListElement(newTodo);
  }

  addToListElement(todo) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");
    const prorityStatus = document.createElement("img");
    const deleteBtn = document.createElement("img");

    checkbox.type = "checkbox";

    title.textContent = todo.title;

    title.classList.add("todo__title");
    checkbox.classList.add("todo__checkbox");
    prorityStatus.classList.add("todo__priority");

    deleteBtn.classList.add("button__action");
    li.classList.add("todo", "flex", "gap-10", "align-center");
    li.setAttribute("data-index", this.project.todos.indexOf(todo));

    deleteBtn.setAttribute("src", deleteButton);

    if (todo.completed) {
      checkbox.checked = true;
      title.classList.add("todo__status_done");
    }

    if (todo.priority) {
      prorityStatus.setAttribute("src", fillStarButton);
    } else {
      prorityStatus.setAttribute("src", hollowStarButton);
    }

    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!title.classList.contains("todo__status_done")) {
        title.classList.add("todo__status_done");
        todo.completed = true;
      } else {
        title.classList.remove("todo__status_done");
        todo.completed = false;
      }
    });

    prorityStatus.addEventListener("click", (event) => {
      event.stopPropagation();
      if (prorityStatus.getAttribute("src") == fillStarButton) {
        todo.priority = false;
        prorityStatus.setAttribute("src", hollowStarButton);
      } else {
        todo.priority = true;
        prorityStatus.setAttribute("src", fillStarButton);
      }
    });

    li.addEventListener("click", (event) => {
      this.modalUI.openEditTodo({
        todo: todo,
        el: event.currentTarget,
        hollow_star: hollowStarButton,
        fill_star: fillStarButton,
      });
    });

    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const updatedProjectIndex = li.getAttribute("data-index");
      this.project.todos.splice(this.project.todos.indexOf(todo), 1);
      this.projects = this.projects.map((project, index) => {
        if (index == updatedProjectIndex) {
          return {
            ...project,
            todos: this.project.todos,
          };
        }
      });

      localStorage.setItem("projects", JSON.stringify(this.projects));
      li.remove();
    });

    li.append(checkbox, title, prorityStatus, deleteBtn);

    this.todoListUL.appendChild(li);
  }

  addTodo(todo) {
    projectManager.addTodo(projectManager.getSelectedProject(), todo);
    this.render(
      projectManager.getProjects()[projectManager.getSelectedProject()],
    );
  }

  deleteTodo(todoIndex) {
    projectManager.deleteTodo(todoIndex);
    this.render(
      projectManager.getProjects()[projectManager.getSelectedProject()],
    );
  }

  editTodo(todo) {
    projectManager.editTodo(todo);
    this.render(
      projectManager.getProjects()[projectManager.getSelectedProject()],
    );
  }
}

export const todoListDOM = new TodoListDOM();
