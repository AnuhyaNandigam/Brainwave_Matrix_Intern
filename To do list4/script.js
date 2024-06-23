document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const allTasksButton = document.getElementById('allTasksButton');
    const activeTasksButton = document.getElementById('activeTasksButton');
    const completedTasksButton = document.getElementById('completedTasksButton');

    let tasks = [];

    addTaskButton.addEventListener('click', addTask);
    allTasksButton.addEventListener('click', () => filterTasks('all'));
    activeTasksButton.addEventListener('click', () => filterTasks('active'));
    completedTasksButton.addEventListener('click', () => filterTasks('completed'));

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDueDate = taskDate.value;
        const taskDueTime = taskTime.value;

        if (taskText === '' || taskDueDate === '' || taskDueTime === '') {
            alert('Please fill out all fields.');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            date: taskDueDate,
            time: taskDueTime,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = '';
        taskDate.value = '';
        taskTime.value = '';
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';

        let filteredTasks = tasks;

        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        filteredTasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.classList.add('task');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <div class="task-info">
                    <span>${task.text}</span>
                    <span class="date-time">${task.date} ${task.time}</span>
                </div>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Unmark' : 'Complete'}</button>
                <button onclick="removeTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(taskElement);
        });
    }

    window.toggleTaskCompletion = function(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
        renderTasks();
    };

    window.removeTask = function(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    };

    function filterTasks(filter) {
        renderTasks(filter);
    }
});
