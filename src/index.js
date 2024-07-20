import './style.css';
import { Todo } from './todo.js';
import { Category } from './category.js';

const categories = [];
const tasks = [];

const taskFormBtn = document.getElementById('taskFormBtn');
const categoryFormBtn = document.getElementById('categoryFormBtn');

taskFormBtn.addEventListener('click', () => {
    addTask();
})

categoryFormBtn.addEventListener('click', () => {
    addCategory();
})

function addTask(){
    console.log('task form btn');
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;

    if(title == '' || description == '' || deadline == '' || priority == '' || category == ''){
        return;
    }

    const task = new Todo(title,description,deadline,priority,category);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('deadline').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('category').value = '';

    tasks.push(task);
    console.log(tasks);
    displayTasks();
}

function addCategory(){
    console.log('category form btn');
    const title = document.getElementById('new-category').value;

    if(!title){
        return;
    }

    if (categories.some(category => category.name.toLowerCase() === title.toLowerCase())) {
        window.alert('Category exists');
        return;
    }

    const category = new Category(title);

    document.getElementById('new-category').value = '';

    categories.push(category);
    console.log(categories);
    displayCategories();
}

function displayTasks(category = 'All') {
    if (!tasks) {
        return;
    }

    const todoContainer = document.getElementById('all-content');
    todoContainer.innerHTML = '';

    const filteredTasks = category === 'All' ? tasks : tasks.filter(task => {
        if (category === 'Uncategorized') {
            return task.category === 'none';
        }
        return task.category === category;
    });

    filteredTasks.forEach((task, index) => {
        const taskWrapper = document.createElement('div');
        taskWrapper.className = 'task-wrapper';

        taskWrapper.innerHTML = `
            <div class="task-container ${task.completed ? 'completed' : ''}">
                <p class="todo-title">${task.title}</p>
                <div class="todo-subdiv">
                    <div class="priority-subdiv">
                        <p>Priority: </p>
                        <div class="todo-priority red ${task.priority}"></div>
                    </div>
                    <div class="deadline-subdiv">
                        <p>Deadline: </p>
                        <p class="todo-deadline">${task.deadline}</p>
                    </div>

                    <div class="actions-subdiv">
                        <svg class="checkmark" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>

                        <svg class="delete-task" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor" /><path d="M9 9H11V17H9V9Z" fill="currentColor" /><path d="M13 9H15V17H13V9Z" fill="currentColor" /></svg>
                    </div>
                </div>
            </div>
            <div class="description-container hidden">
                <p class="description-text">${task.description}</p>
            </div>
        `;

        todoContainer.appendChild(taskWrapper);

        const deleteTask = taskWrapper.querySelector('.delete-task');

        deleteTask.addEventListener('click', (e) => {
            tasks.splice(index, 1);
            displayTasks(category);
        });

        const completeTask = taskWrapper.querySelector('.checkmark');

        completeTask.addEventListener('click', (e) => {
            tasks[index].completed = !tasks[index].completed;
            displayTasks(category);
        });

        const todoTitle = taskWrapper.querySelector('.todo-title');
        const descriptionContainer = taskWrapper.querySelector('.description-container');

        todoTitle.addEventListener('click', () => {
            descriptionContainer.classList.toggle('hidden');
        });
    });
}


function displayCategories() {
    if (!categories) {
        return;
    }

    const listDiv = document.getElementById('category-list');
    const categorySelect = document.getElementById('category');
    listDiv.innerHTML = '';
    categorySelect.innerHTML = `
        <option value="" disabled selected>Choose category...</option>
        <option value="none">None</option>
    `;

    const categoryFilters = document.getElementById('category-filters');

    categoryFilters.innerHTML = `
        <div class="category-div" id="all">
            <p>All</p>
        </div>
        <div class="category-div" id="none">
            <p>Uncategorized</p>
        </div>
    `;

    categories.forEach((category, index) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-list-subdiv';

        categoryDiv.innerHTML = `
            <p class="category-title">${category.name}</p>
            <button class="category-delete">Delete</button>
        `;
        listDiv.appendChild(categoryDiv);

        const categoryOption = document.createElement('option');
        categoryOption.value = category.name;
        categoryOption.textContent = category.name;
        categorySelect.appendChild(categoryOption);

        const deleteBtn = categoryDiv.querySelector('.category-delete');
        deleteBtn.addEventListener('click', () => {
            categories.splice(index, 1);
            displayCategories();
        });

        const categoryFilterDiv = document.createElement('div');
        categoryFilterDiv.className = 'category-div';
        categoryFilterDiv.id = category.name;

        categoryFilterDiv.innerHTML = `
            <p>${category.name}</p>
        `;
        categoryFilters.appendChild(categoryFilterDiv);
    });

    const allFilter = document.getElementById('all');
    allFilter.addEventListener('click', () => {
        displayTasks('All');
    });

    const uncategorizedFilter = document.getElementById('none');
    uncategorizedFilter.addEventListener('click', () => {
        displayTasks('Uncategorized');
    });

    categories.forEach(category => {
        const categoryFilter = document.getElementById(category.name);
        categoryFilter.addEventListener('click', () => {
            displayTasks(category.name);
        });
    });
}


displayTasks();
displayCategories();