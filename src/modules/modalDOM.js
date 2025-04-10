import Project from "./project";
import Todo from "./todo";
import { format } from "date-fns";
import { projectListDOM } from "./projectListDOM";
import { todoListDOM } from "./todoListDOM";

class ModalDOM {
  constructor() {
    // this.onAddProject = onAddProject;
    this.projectListUI = null;
    this.todoListUI = null;

    this.projectDialog = document.createElement("dialog");
    this.projectTitleSpan = document.createElement("span");
    this.addProjectForm = document.createElement("form");
    this.projectTitleInput = document.createElement("input");
    this.addProjectBtn = document.createElement("button");
    this.closeModalBtn = document.createElement("button");

    // Add Todo Dialog
    this.todoDialog = document.createElement("dialog");
    this.todoModalTitle = document.createElement("h3");
    this.todoForm = document.createElement("form");
    this.todoTitleLabel = document.createElement("label");
    this.todoTitle = document.createElement("input");
    this.todoDescriptionLabel = document.createElement("label");
    this.todoDueDateLabel = document.createElement("label");
    this.todoDueDate = document.createElement("input");
    this.todoDescription = document.createElement("textarea");
    this.isTodoPriority = document.createElement("input");
    this.isTodoPriorityLabel = document.createElement("label");
    this.addTodoBtn = document.createElement("button");

    this.closeTodoModalBtn = document.createElement("button");

    // Add Todo Dialog
    this.editTodoDialog = document.createElement("dialog");
    this.editTodoModalTitle = document.createElement("h3");
    this.editTodoForm = document.createElement("form");
    this.editTodoTitleLabel = document.createElement("label");
    this.editTodoTitle = document.createElement("input");
    this.editTodoDescriptionLabel = document.createElement("label");
    this.editTodoDueDateLabel = document.createElement("label");
    this.editTodoDueDate = document.createElement("input");
    this.editTodoDescription = document.createElement("textarea");
    this.isEditTodoPriority = document.createElement("input");
    this.isEditTodoPriorityLabel = document.createElement("label");
    this.editTodoBtn = document.createElement("button");
    this.closeEditTodoModalBtn = document.createElement("button");

    this.attachEvents();
    this.initProjectModal();
    this.initTodoModal();
    this.initEditTodoModal();
  }
  attachEvents() {
    this.addTodoBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const newTodo = new Todo(
        this.todoTitle.value,
        this.todoDescription.value,
        this.todoDueDate.value,
        this.isTodoPriority.checked,
      );

      todoListDOM.addTodo(newTodo);
      this.todoForm.reset();
      this.todoDialog.close();
    });
    // this.editTodoBtn = document.createElement("button");
  }

  initProjectModal() {
    this.projectTitleSpan.textContent = "Create new project";
    this.projectTitleInput.type = "text";
    this.projectTitleInput.placeholder = "Enter your project name";
    this.addProjectBtn.textContent = "Create project";
    this.addProjectBtn.type = "button";
    this.closeModalBtn.textContent = "Close";

    this.closeModalBtn.addEventListener("click", () => {
      this.projectDialog.classList.remove("flex", "flex-column", "gap-10");
      this.projectDialog.close();
    });

    this.addProjectBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const newProject = new Project(this.projectTitleInput.value);

      projectListDOM.addProject(newProject);

      this.projectDialog.classList.remove("flex", "flex-column", "gap-10");
      this.addProjectForm.reset();
      this.projectDialog.close();
    });

    this.addProjectForm.append(this.projectTitleInput, this.addProjectBtn);
    this.projectDialog.append(
      this.projectTitleSpan,
      this.addProjectForm,
      this.closeModalBtn,
    );

    document.body.appendChild(this.projectDialog);
  }

  initTodoModal() {
    this.closeTodoModalBtn.classList.add("button__close");

    this.closeTodoModalBtn.addEventListener("click", () => {
      this.todoForm.reset();
      this.todoDialog.close();
    });

    const priorityDiv = document.createElement("div");
    priorityDiv.append(this.isTodoPriorityLabel, this.isTodoPriority);
    this.todoForm.append(
      this.todoTitleLabel,
      this.todoTitle,
      this.todoDescriptionLabel,
      this.todoDescription,
      this.todoDueDateLabel,
      this.todoDueDate,
      priorityDiv,
      this.addTodoBtn,
    );

    this.todoDialog.append(
      this.todoModalTitle,
      this.todoForm,
      this.closeTodoModalBtn,
    );

    document.body.appendChild(this.todoDialog);
  }

  initEditTodoModal() {
    this.closeEditTodoModalBtn.classList.add("button__close");
    this.closeEditTodoModalBtn.textContent = "Close";
    this.closeEditTodoModalBtn.addEventListener("click", () => {
      this.editTodoForm.reset();
      this.editTodoDialog.close();
    });

    const priorityDiv = document.createElement("div");
    priorityDiv.append(this.isEditTodoPriorityLabel, this.isEditTodoPriority);
    this.editTodoForm.append(
      this.editTodoTitleLabel,
      this.editTodoTitle,
      this.editTodoDescriptionLabel,
      this.editTodoDescription,
      this.editTodoDueDateLabel,
      this.editTodoDueDate,
      priorityDiv,
      this.editTodoBtn,
    );

    this.editTodoDialog.append(
      this.editTodoModalTitle,
      this.editTodoForm,
      this.closeEditTodoModalBtn,
    );

    this.editTodoBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // const selectedTodo = projectManager.getSelectedTodoIndex();
      // todo.title = this.editTodoTitle.textContent;
      // todo.description = this.editTodoDescription.textContent;
      // todo.dueDate = this.editTodoDueDate.value;
      // todo.priority = this.isEditTodoPriority.checked
      todoListDOM.editTodo({
        title: this.editTodoTitle.value,
        description: this.editTodoDescription.value,
        dueDate: this.editTodoDueDate.value,
        priority: this.isEditTodoPriority.checked,
      });

      this.editTodoForm.reset();
      this.editTodoDialog.close();
      // console.log(todo);
    });

    document.body.appendChild(this.editTodoDialog);
  }

  openProjectModal() {
    this.projectDialog.classList.add("flex", "flex-column", "gap-10");
    this.projectDialog.showModal();
    // this.projectListUI = projectListUI;
    // form.addEventListener("submit", (event) => { this.handleSubmit });
  }

  openAddTodo(todoListUI) {
    this.todoForm.classList.add("flex", "flex-column", "gap-10");
    this.todoModalTitle.textContent = "Create new Todo";
    this.todoTitleLabel.textContent = "Title";
    this.todoTitle.type = "text";
    this.todoDescriptionLabel.textContent = "Description";
    this.todoDescription.placeholder = "Title";
    this.todoDueDateLabel.textContent = "Due date";
    this.todoDueDate.type = "date";
    this.isTodoPriorityLabel.textContent = "Is Priority?";
    this.isTodoPriority.type = "checkbox";
    this.isTodoPriority.value = "yes";
    this.addTodoBtn.textContent = "Create Todo";
    this.closeTodoModalBtn.textContent = "Close";
    this.todoListUI = todoListUI;
    // this.todoBtn.addEventListener("click", this.addTodo.bind(this, onAddProject));

    this.todoDialog.showModal();
  }

  openEditTodo(todo) {
    // console.log(todo);
    // console.log(format(todo.dueDate, 'yyyy-MM-dd'));
    this.editTodoForm.classList.add("flex", "flex-column", "gap-10");
    this.editTodoModalTitle.textContent = "Edit Todo";
    this.editTodoTitleLabel.textContent = "Title";
    this.editTodoDescriptionLabel.textContent = "Description";
    this.editTodoDueDateLabel.textContent = "Due date";
    this.isEditTodoPriorityLabel.textContent = "Is Priority?";
    this.editTodoBtn.textContent = "Save Todo";
    this.closeTodoModalBtn.textContent = "Close";

    this.editTodoTitle.type = "text";
    this.editTodoDueDate.type = "date";
    this.isEditTodoPriority.type = "checkbox";

    this.editTodoTitle.value = todo.title;
    this.editTodoDescription.textContent = todo.description;
    this.editTodoDueDate.value = format(todo.dueDate, "yyyy-MM-dd");
    this.isEditTodoPriority.checked = todo.priority;

    this.editTodoDialog.showModal();
  }
}

export const modalDOM = new ModalDOM();
