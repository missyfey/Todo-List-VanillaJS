var newTodo = document.querySelector('#newTodo');
var todoUl = document.querySelector('#todoUl');

newTodo.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        todoList.addTodo();
    }
})

var todoList = {
    todos : [],

    addTodo : function(){
        if(newTodo.value != '' && this.todos.indexOf(newTodo.value) === -1){
            this.todos.push(newTodo.value);
            newTodo.value = '';
        }
        else if(this.todos.indexOf(newTodo.value) !== -1){
            alert('Item is already in the list')
        }
        this.displayTodos();
    },
    editTodo : function(editedText,position){
        this.todos[position] = editedText;
        this.displayTodos();
    },
    deleteTodo : function(position){
        this.todos.splice(position , 1);
        this.displayTodos();
    },
    clearList : function(){
        this.todos = [];
        this.displayTodos();
    },
    displayTodos : function(){
        todoUl.innerHTML ='';

        this.todos.forEach(item => {
            var newLi = document.createElement('li');
            newLi.id = this.todos.indexOf(item);
            newLi.appendChild(this.createToggleBtn());

            var newSpan = document.createElement('span');
            newSpan.innerText = item;
            newSpan.contentEditable = "true";
            newLi.appendChild(newSpan);
            
            newSpan.addEventListener('blur',function(e){
                var editedText = e.target.innerText;
                var idToedit = e.target.parentNode.id;
                todoList.editTodo(editedText,idToedit);
            });

            newLi.appendChild(this.createDelteBtn());
            todoUl.appendChild(newLi);
            
        })
    },
    createDelteBtn : function(){
        var delBtn = document.createElement('button');
        delBtn.innerText = 'X';
        delBtn.classList.add('delBtn');

        delBtn.addEventListener('click', function(e){
            var idToDelete = e.target.parentNode.id;
            todoList.deleteTodo(idToDelete);
           })
        return(delBtn)
    },
    createToggleBtn : function(){
        var toggleBtn = document.createElement('input');
        toggleBtn.type = 'checkbox'
        return (toggleBtn);
    }
}





