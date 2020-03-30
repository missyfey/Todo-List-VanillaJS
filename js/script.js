
var newTodo = document.querySelector('#newTodo');
var todoUl = document.querySelector('#todoUl');


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
        console.log(editedText,position);
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
            newLi.innerText = item;
            newLi.contentEditable = "true";
            newLi.appendChild(this.createDelteBtn());
            todoUl.appendChild(newLi);
            // newLi.addEventListener('blur',function(e){
            //     console.log(e);
            //     var editedText = e.target.textContent;
            //     var idToedit = e.target.id;
            //     todoList.editTodo(editedText,idToedit);
            // });
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
    }
}





