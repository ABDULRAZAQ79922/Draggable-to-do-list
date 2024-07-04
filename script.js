document.addEventListener('DOMContentLoaded', (event) => {
    const myNewTaskInput = document.getElementById('new-task');
    const myAddTaskButton = document.getElementById('add-task-button');
    const myTaskList = document.getElementById('task-list');

    myAddTaskButton.addEventListener('click', () => {
        const taskText = myNewTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            myNewTaskInput.value = '';
            myNewTaskInput.focus();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.classList.add('task-item');
        taskItem.setAttribute('draggable', true);
        
        taskItem.addEventListener('dragstart', dragStart);
        taskItem.addEventListener('dragover', dragOver);
        taskItem.addEventListener('drop', drop);
        taskItem.addEventListener('dragend', dragEnd);

        myTaskList.appendChild(taskItem);
    }

    let dragSrcEl = null;

    function dragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        this.classList.add('dragging');
    }

    function dragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function drop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    }

    function dragEnd(e) {
        const items = document.querySelectorAll('.task-item');
        items.forEach(item => item.classList.remove('dragging'));
    }
});
