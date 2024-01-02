const addtaskbtn=document.getElementById('addTask');
const btntext=addtaskbtn.innerText;
const task=document.getElementById('task');
const recorddisplay=document.getElementById('records');

let taskarray=[];

let editid=null;

let objstr=localStorage.getItem('users');

if(objstr!=null){
    taskarray=JSON.parse(objstr);
}

display();

addtaskbtn.onclick=()=>{
    const name=task.value;
    if(editid!=null){
        taskarray.splice(editid,1,{"name":name});
        editid=null;
    }
    else{ 
        taskarray.push({"name":name});
    }
    
    save(taskarray);
    task.value='';
    display();
    addtaskbtn.innerText=btntext;
}

function save(taskarray){
    let str=JSON.stringify(taskarray);
    localStorage.setItem('users',str);
}

function display(){
    let statement='';
    taskarray.forEach((user,i) => {
        statement+=`<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='edit(${i})'></i><i class="btn btn-danger fa fa-trash" onclick='deleteinfo(${i})'></i></td>
      </tr>`;
    });
    recorddisplay.innerHTML=statement;
}

function edit(id){
    editid=id;
    task.value=taskarray[id].name;
    addtaskbtn.innerText='Save Changes';
}

function deleteinfo(id){
    taskarray.splice(id,1);
    save(taskarray);
    display();
}
