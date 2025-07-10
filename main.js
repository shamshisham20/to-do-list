
    const btnadd=document.getElementById("btnadd")
// console.log(tasktitle,date,tag,btnadd)
        let editIndex = null;

    const tasklist=document.getElementById("taskList")
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
        let tasksdone=JSON.parse(localStorage.getItem("tasksdone")) || [];

function addtask(){
    const tasktitle=document.getElementById("taskTitle").value.trim()
    const date=document.getElementById("taskDate").value
    const tag=document.getElementById("taskTag").value.trim()
     if (tasktitle === "") {
    alert("Please enter a task title.");
    return;
  }
    let task={tasktitle,date,tag, id: crypto.randomUUID() // يولد ID فريد مثل: "91b2a770-2a7b-4f8e-920f-52e6dc59b6b5"
}
    // tasks.push(task)
    
    if (editIndex !== null) {
        const oldTask = tasks[editIndex];
    task = {
      tasktitle,
      date,
      tag,
      id: oldTask.id,
    };

    tasks[editIndex] = task;
     const doneIndex = tasksdone.findIndex(t => t.id === oldTask.id);
        if (doneIndex !== -1) {
            tasksdone[doneIndex] = task;
            localStorage.setItem("tasksdone", JSON.stringify(tasksdone));
        }
    
    editIndex = null;
    btnadd.textContent = "Add Task";
  } else {
    task = {
      tasktitle,
      date,
      tag,
      id: crypto.randomUUID(),
    };
    tasks.push(task);
  }
              localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log("shams")
        displaytask(tasks);

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTag").value = "";

}
function displaytask(tasks){
      tasklist.innerHTML = ""; // تنظيف القائمة قبل العرض
    if (tasks.length === 0) {
 tasklist.innerHTML = "<tr><td colspan='5'>No tasks yet</td></tr>";
        
    return;
        }

    tasks.forEach((task,index) => {
        const isDone = tasksdone.find(t => t.id === task.id); // ✅ تحقق من وجود المهمة في المهام المنجزة
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td><button class="btncomp ">${isDone ? '<i class="fa-solid fa-check"></i>' : ''}</button></td>
        <td>${task.tasktitle}</td>
        <td>${task.date || "No date"}</td>
        <td>${task.tag || "No tag"}</td>
        <td>  <button class="btndelet">Delete</button>
  <button class="btnedit">Edit</button>
</td>
`;
    tasklist.appendChild(tr);
    
    const delet=tr.querySelector(".btndelet")
    // delet.forEach((btn,index)=>{
                    const exiting=tasksdone.find(taskdo => taskdo.id ===task.id)

        delet.addEventListener("click",function delettask(){
        //    const taskremov= tasks.indexof(index)

            if(exiting){

                tasks.splice(index,1)
                 tasksdone= tasksdone.filter(taskdo=>taskdo.id!==task.id)
                           localStorage.setItem("tasksdone", JSON.stringify(tasksdone));
                    localStorage.setItem("tasks", JSON.stringify(tasks));
            }
            else{
                                tasks.splice(index,1)
                                        localStorage.setItem("tasks", JSON.stringify(tasks));

            }
        
                    displaytask(tasks); // إعادة عرض القائمة

        })
        const edit=tr.querySelector(".btnedit")
        edit.addEventListener("click",function edittask(){

                    editIndex = index


  // نملأ البيانات في الفورم
  document.getElementById("taskTitle").value = task.tasktitle;
  document.getElementById("taskDate").value = task.date;
  document.getElementById("taskTag").value = task.tag;

  // نغير النص على زرار الإضافة مؤقتًا
  btnadd.textContent = "Save Task";
                    //   localStorage.setItem("tasks", JSON.stringify(tasks));
                    //             displaytask(tasks); // إعادة عرض القائمة
        });

        const btncomp=tr.querySelector(".btncomp")
        btncomp.addEventListener("click",function done(){
                        const taskdone=tasks[index]

            // const taskdone=tasks[index]
                const id = taskdone.id;

                        btncomp.innerHTML = "";
                        const exite=tasksdone.find(task => task.id === id)
                        if(!exite){
                                        tasksdone.push(taskdone)
                    localStorage.setItem("tasksdone", JSON.stringify(tasksdone));

                            const icon= document.createElement("i")
                icon.setAttribute("class","fa-solid fa-check")
                btncomp.appendChild(icon)

                        }
                        else{

                            tasksdone= tasksdone.filter(task=>task.id!==id)
                            localStorage.setItem("tasksdone", JSON.stringify(tasksdone));

        // إزالة العلامة من الزر
        btncomp.innerHTML = "";
                            // btncomp.removeAttribute(icon)
                        }
                        

                        

        })

    });
    

    };
// }




btnadd.addEventListener("click",addtask);
window.addEventListener("DOMContentLoaded", ()=>{
      displaytask(tasks);

});

const searchInput=document.getElementById("searchInput")

// console.log(searchInput)
function search(){

    const searchval=document.getElementById("searchInput").value.toLowerCase().trim()
     const filteredTasks = tasks.filter(task => 
        task.tasktitle.toLowerCase().startsWith(searchval)||
                task.tag.toLowerCase().startsWith(searchval)
     
    );
    
        displaytask(filteredTasks); // 👈 عرض المهام المطابقة
}

searchInput.addEventListener("blur",search)
const sortSelect=document.getElementById("sortSelect")
function sort(){
const sortSelectval=document.getElementById("sortSelect").value
    if(sortSelectval==="completed")
    {
        tasksdone.forEach(taskdone=>taskdone)
        displaytask(tasksdone)
    }
else if (sortSelectval === "date") {
        const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));
        displaytask(sortedTasks); // ✅ عرض المهام المرتبة بالتاريخ
    } else {
        displaytask(tasks); // ✅ أي خيار آخر يعرض كل المهام الأصلية
    }
}

sortSelect.addEventListener("change",sort)
// localStorage.clear();



