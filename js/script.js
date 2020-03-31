var newTodo = document.querySelector('#newTodo');
var todoUl = document.querySelector('#todoUl');
//control active class for filter buttons
var filterBtns = document.querySelectorAll('.filterBtn');
filterBtns.forEach(item => {
    item.addEventListener('click', function(e){
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    })
})
//show how many toddos left
var leftItems = document.querySelector('#leftTodos');

//add items after pressing ENTER key
newTodo.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        todoList.addTodo();
    }
})
//todos is an array, each item is object [{todoText : 'text' , completed : boolean}]
var todoList = {
    todos : [],
    filteredList :[],
    filtered: 0,
    activeItemsNumber:0,
    addTodo : function(){
        if(newTodo.value != ''){
            this.todos.push({todoText : newTodo.value , completed : false});
            newTodo.value = '';
        }
        this.displayTodos();
    },
    editTodo : function(editedText,position){
        this.todos[position].todoText = editedText;
        this.displayTodos();
    },
    deleteTodo : function(position){
        this.todos.splice(position , 1);
        this.displayTodos();
    },
    toggleTodo : function(position){
        this.todos[position].completed = !this.todos[position].completed;
        this.displayTodos();
    },
    toggleAll : function(){  
        //check if all are checked should uncheck all todos, toggleShouldGet=False
        var completedList = [];
        for(let j=0; j<this.todos.length ; j++){
            completedList.push(this.todos[j].completed)
        }
        //function to check if all items of an array is TRUE
        const isTrue = (item) =>item === true;

        var toggleShoulGet = !completedList.every(isTrue);    
        if(toggleShoulGet){
            for(let i=0 ; i<this.todos.length ; i++){
                this.todos[i].completed = true;
            }
        }else{
            for(let i=0 ; i<this.todos.length ; i++){
                this.todos[i].completed = false;
            }
        }
        this.displayTodos();
        
    },
    clearCompleted : function(){
        var uncompletedTodos = this.todos.filter(item => {
            return item.completed === false;
        })
        this.todos = uncompletedTodos;
        this.displayTodos();
    },
    showActive : function(){
        this.filtered = 1;
        this.displayTodos();
    },
    showCompleted : function(){
        this.filtered = -1;
        this.displayTodos();
    },
    showAll : function(){
        this.filtered = 0;
        this.displayTodos();
    },
    displayTodos : function(){
        todoUl.innerHTML ='';

        switch(this.filtered){
            case 1:
                this.filteredList = this.todos.filter(item => {
                    return item.completed === false;
                })
                break;
            case -1:
                this.filteredList = this.todos.filter(item => {
                    return item.completed === true;
                })
                break;
            case 0:
                this.filteredList = this.todos;
                break;
            default :
                this.filteredList = this.todos;
                break;
        }

            //figure how many items are not completed
            this.activeItemsNumber = 0;
            this.todos.map(item => {
                debugger;
                if(!item.completed){
                    this.activeItemsNumber = this.activeItemsNumber +1;
                }
                return this.activeItemsNumber;
            })
            leftItems.innerText = this.activeItemsNumber + " Items left";

            
            this.filteredList.forEach(item => {
            var newLi = document.createElement('li');
            newLi.id = this.filteredList.indexOf(item);
            newLi.appendChild(this.createToggleBtn(item.completed));

            var newSpan = document.createElement('span');
            newSpan.innerText = item.todoText;
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
    createToggleBtn : function(completed){
        var toggleBtn = document.createElement('input');
        toggleBtn.type = 'checkbox';
        toggleBtn.checked = completed;
        toggleBtn.addEventListener('click',function(e){
            var idToToggle = e.target.parentNode.id;
            console.log(idToToggle);
            todoList.toggleTodo(idToToggle);
        })
        return (toggleBtn);
    }
}





