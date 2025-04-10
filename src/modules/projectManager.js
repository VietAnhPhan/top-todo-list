class ProjectManager {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    this.selectedProjectIndex = 0;
    this.selectedTodoIndex = 0;
  }

  getProjects() {
    return this.projects;
  }

  addProject(project) {
    this.projects.push(project);
    this.save();
  }

  deleteProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
    this.save();
  }

  setCompleted(todoIndex) {
    this.projects[this.selectedProjectIndex].todos[todoIndex].completed =
      !this.projects[this.selectedProjectIndex].todos[todoIndex].completed;
    this.save();
  }

  setPriority(projectIndex, todoIndex) {
    this.projects[projectIndex].todos[todoIndex].priority =
      !this.projects[projectIndex].todos[todoIndex].priority;
    this.save();
  }
  // setPriority

  save() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  addTodo(projectIndex, todo) {
    this.projects[projectIndex].todos.push(todo);
    this.save();
  }

  setprojectSelected(index) {
    this.selectedProjectIndex = index;
  }

  getSelectedProject() {
    return this.selectedProjectIndex;
  }

  setTodoSelectedIndex(index) {
    this.selectedTodoIndex = index;
  }

  getSelectedTodoIndex() {
    return this.selectedTodoIndex;
  }

  getSelectedTodo() {
    return this.projects[this.getSelectedProject()].todos[
      this.getSelectedTodoIndex()
    ];
  }

  editTodo(todo) {
    console.log(todo);
    const selectedTodo = this.getSelectedTodo();
    selectedTodo.title = todo.title;
    selectedTodo.description = todo.description;
    selectedTodo.dueDate = todo.dueDate;
    selectedTodo.priority = todo.priority;
    this.save();
  }

  deleteTodo(todoIndex) {
    const deletedTodoProjects = this.projects[
      this.selectedProjectIndex
    ].todos.splice(todoIndex, 1);
    console.log(deletedTodoProjects);
    this.save();
  }

  // editTodo(todo){

  // }

  getFirstProject() {
    return this.projects[0];
  }
}

export const projectManager = new ProjectManager();
