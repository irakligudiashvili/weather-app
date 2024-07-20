export class Todo {
    constructor(title, description, deadline, priority, category) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.category = category;
        this.completed = false;
    }
}