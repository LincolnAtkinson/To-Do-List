let lists=[{id:0,name:"Example",todos:[{id:100,text:"test",completed:!1},{id:101,text:"a wee bit of honey",completed:!1}]}];var sel,input=document.getElementById("userInput"),taskInput=document.getElementById("enter"),clear=document.getElementById("clear");let currentListId=0;const currentList={};let b=document.querySelectorAll("button.list"),t=document.querySelectorAll("trash");function showCurrentList(e,s){return currentitem=e[s],currentList.name=currentitem.name,currentList.todos=currentitem.todos,render(),currentList}function render(){let e='<ul class="list-group" id="sort">';lists.forEach(s=>{e+=`<li class="list-group-item" draggable="true"><button id="${s.id}" class="list w-full bg-gray-300 h-14 flex justify-around items-center "><span class="trash"></span>${s.name}<button id="${s.id}" class="trash"><i class="fa-solid fa-trash fa-xs"></i></button><span class="tresh"></span></button></li>`}),e+="</ul>",document.getElementById("mainLists").innerHTML=e,document.getElementById("current-list-name").innerText=currentList.name;let s='<ul class="list-group-flush">';currentList.todos.forEach(e=>{!0===e.completed?s+=`<li class="current-list-todos green" id="${e.id}"><input type="checkbox" class="check" checked><span>${e.text}</span></li>`:!1===e.completed&&(s+=`<li class="current-list-todos red" id="${e.id}"><input type="checkbox" class="check"><span>${e.text}</span><button class="editTodo"><i class="fa-solid fa-pen-to-square"></i></button> <input class="edit hide" type="text"><button class="delete hide">Delete</button></li>`)}),s+="</ul>",document.getElementById("current-list-todos").innerHTML=s,(sel=document.getElementById(currentListId)).classList.add("selected"),sel.classList.remove("list"),addButtons(),addDelete(),editTodo(),DragnDrop(),complete(),save()}function addButtons(){document.querySelectorAll("button.list").forEach(function(e){e.addEventListener("click",function(){currentListId=e.id,sel.classList.add("list"),sel.classList.remove("selected"),(sel=e).classList.add("selected"),sel.classList.remove("list"),showCurrentList(lists,currentListId)})})}function editTodo(){document.querySelectorAll("button.editTodo").forEach(function(e){e.addEventListener("click",function(){var s=e.closest("li"),i=s.querySelector("input.edit"),n=s.querySelector("button.delete"),l=s.querySelector("span");i.classList.toggle("hide"),n.classList.toggle("hide"),i.value=l.textContent,i.addEventListener("keyup",function(e){if("Enter"===e.key){l.textContent=i.value,i.classList.toggle("hide"),n.classList.toggle("hide");var r=s.id,d=lists[currentListId].todos.find(e=>e.id==r);d&&(d.text=i.value,save())}}),n.addEventListener("click",function(){var e=s.id,i=lists[currentListId],n=i.todos.findIndex(s=>s.id==e);if(-1!==n){i.todos.splice(n,1);for(let l=0;l<i.todos.length;l++)i.todos[l].id=100+l;save(),render()}})})})}function complete(){let e=document.querySelectorAll("input.check");e.forEach(function(e){e.addEventListener("click",function(){let s=e.closest("li"),i=s.id-100;!0===lists[currentListId].todos[i].completed?lists[currentListId].todos[i].completed=!1:!1===lists[currentListId].todos[i].completed&&(lists[currentListId].todos[i].completed=!0),save(),render()})})}function addDelete(){document.querySelectorAll("button.trash").forEach(function(e){e.addEventListener("click",function(){deleteItem(e.id)})})}function deleteItem(e){if(0==e&&1==lists.length)showCurrentList(lists=[{id:0,name:"Example",todos:[{id:100,text:"test",completed:!1},{id:101,text:"a wee bit of honey",completed:!1}]}],currentListId=0);else if(e>=0){lists.splice(e,1),currentListId>=lists.length&&(currentListId=Math.max(0,lists.length-1));for(let s=e;s<lists.length;s++)lists[s].id=s;showCurrentList(lists,currentListId)}}function reorder(e,s){let i=parseInt(e.children[0].id),n=parseInt(s.children[0].id),l=lists.find(e=>e.id===i),r=lists.find(e=>e.id===n),d=lists.indexOf(l),o=lists.indexOf(r);lists.splice(d,1),lists.splice(o,0,l);for(let c=0;c<lists.length;c++)lists[c].id=c;save()}function DragnDrop(){let e=document.getElementById("sort"),s=null,i=document.querySelectorAll("li");i.forEach(e=>{e.addEventListener("dragstart",i=>{s=e,i.dataTransfer.setData("text/plain",e.id)})}),e.addEventListener("dragover",i=>{i.preventDefault();let n=i.target.closest("li");if(n&&s!==n){let l=i.clientY-n.getBoundingClientRect().top,r=l<n.clientHeight/2;r?e.insertBefore(s,n):e.insertBefore(s,n.nextSibling)}}),e.addEventListener("dragend",()=>{reorder(s,s.nextSibling),s=null})}function save(){localStorage.setItem("currentListId",JSON.stringify(currentListId)),localStorage.setItem("lists",JSON.stringify(lists))}load(),showCurrentList(lists,currentListId),render(),input.addEventListener("keyup",function(e){if("Enter"===e.key&&""!==input.value.trim()){let s={id:lists.length,name:input.value.trim(),todos:[]};lists.push(s),input.value="",render()}}),taskInput.addEventListener("keyup",function(e){if("Enter"===e.key&&""!==taskInput.value.trim()){let s=lists[currentListId],i={id:s.todos.length+100,text:taskInput.value.trim(),completed:!1};s.todos.push(i),taskInput.value="",render()}}),clear.addEventListener("click",function(){var e=lists[currentListId];for(let s=e.todos.length-1;s>=0;s--)!0===e.todos[s].completed&&e.todos.splice(s,1);for(let i=0;i<e.todos.length;i++)e.todos[i].id=100+i;save(),render()}),DragnDrop();const keyStates={};function checkKeys(){if(keyStates.z&&keyStates.p&&keyStates.g){localStorage.setItem("currentListId",JSON.stringify(0)),localStorage.setItem("lists",JSON.stringify(e));let e=[{id:0,name:"Example",todos:[{id:100,text:"test",completed:!1},{id:101,text:"a wee bit of honey",completed:!1}]}];currentListId=0,showCurrentList(lists=e,currentListId)}}function load(){let e=localStorage.getItem("currentListId"),s=localStorage.getItem("lists");e&&(currentListId=JSON.parse(e)),s&&(lists=JSON.parse(s))}document.addEventListener("keydown",e=>{keyStates[e.key]=!0,checkKeys()}),document.addEventListener("keyup",e=>{keyStates[e.key]=!1});