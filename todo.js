function Todo(name, state) {
  this.name = name;
  this.state = state;
}

var todos = [];
var states = ["active", "inactive", "done"];
var count = [0,0,0];
var tabs = ["all"].concat(states);
var currentTab = "all";

var form = document.getElementById("new-todo-form");
var input = document.getElementById("new-todo-title");


form.onsubmit = function(event) {
  event.preventDefault();
  if (input.value && input.value.length) {
    todos.push(new Todo(input.value, "active"));
    input.value = "";
    count[0] = count[0]+1;
    renderTodos();
    
    
  }
};

var buttons = [
  { action: "done", icon: "ok" },
  { action: "active", icon: "plus" },
  { action: "inactive", icon: "minus" },
  { action: "remove", icon: "trash" },
  { action:"move up", icon:"arrow-up"},
  { action:"move down", icon:"arrow-down" }
];
function renderTodos() {
  var todoList = document.getElementById("todo-list");
  document.getElementById('all').innerHTML = count[0]+count[1]+count[2];
  document.getElementById('active').innerHTML= count[0];
  document.getElementById('inactive').innerHTML = count[1];
  document.getElementById('done').innerHTML = count[2];

  todoList.innerHTML = "";
  todos
    .filter(function(todo) {
      return todo.state === currentTab || currentTab === "all";
    })
    .forEach(function(todo) {
      var div1 = document.createElement("div");
      div1.className = "row";

      var div2 = document.createElement("div");
      div2.innerHTML =
        '<a class="list-group-item" href="#">' + todo.name + "</a>";
      div2.className = "col-xs-6 col-sm-9 col-md-10";

      var div3 = document.createElement("div");
      div3.className = "col-xs-6 col-sm-3 col-md-2 btn-group text-right";
      buttons.forEach(function(button) {
        var btn = document.createElement("button");
        btn.className = "btn btn-default btn-xs";
        btn.innerHTML =
          '<i class="glyphicon glyphicon-' + button.icon + '"></i>';
        div3.appendChild(btn);

        if (button.action === todo.state) {
          btn.disabled = true;
        }

        if (button.action === "remove") {
          btn.title = "Remove";
          btn.onclick = function() {
            if (
              confirm(
                "Are you sure you want to delete the item titled " + todo.name
              )
            ) {
              if(todo.state === "active")
                count[0]--;
              else if(todo.state === "inactive")
                count[1]--;
              else
                count[2]--;
              todos.splice(todos.indexOf(todo), 1);
              renderTodos();
            }
          };
        } 
        else if(button.action === "move up")
        {
          btn.title = "Move up";
          btn.onclick = function(){
            var index = todos.findIndex(x=>x.name == todo.name);
            if(index != 0)
            {
              var temp = todos[index-1];
              todos[index-1] = todo;
              todos[index] = temp;
            }
            renderTodos();
              
          }
        }
        else if(button.action === "move down")
        {
          btn.title = "Move down";
          var length = todos.length;
          btn.onclick = function(){
            var index = todos.findIndex(x=>x.name==todo.name);
            if(index != length-1)
            {
              var temp = todos[index+1];
              todos[index+1] = todo;
              todos[index] = temp;
            }
            renderTodos();
          }
          


        }
        
        else {
          btn.title = "Mark as " + button.action;
          btn.onclick = function() {
          if(button.action === "active")
          {
            if(todo.state === "inactive")
            {
              count[1]--;
              count[0]++;
            }
            else if(todo.state === "done")
            {
              count[2]--;
              count[0]++;
            }
            todo.state =button.action
          }
          else if(button.action === "inactive")
          {
            if(todo.state === "active")
            {
              count[0]--;
              count[1]++;
            }
            else if(todo.state === "done")
            {
              count[2]--;
              count[1]++;
            }
            todo.state = button.action
            
          }
          else if(button.action === "done")
          {
            if(todo.state === "active")
            {
              count[0]--;
              count[2]++;
            }
            else if(todo.state === "inactive")
            {
              count[1]--;
              count[2]++;
            }
            todo.state = button.action
          }
          
           
            renderTodos();
          };
        }
      });

      div1.appendChild(div2);
      div1.appendChild(div3);

      todoList.appendChild(div1);
    });
}

renderTodos();

function selectTab(element) {
  var tabName = element.attributes["data-tab-name"].value;
  currentTab = tabName;
  var todoTabs = document.getElementsByClassName("todo-tab");
  for (var i = 0; i < todoTabs.length; i++) {
    todoTabs[i].classList.remove("active");
  }
  element.classList.add("active");
  renderTodos();
}

