import React, { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {

  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(()=>{
    fetchTasks();
  },[]);

  const createTask = async () => {

    if(!title){
      alert("Title required");
      return;
    }

    await API.post("/tasks",{
      title,
      description,
      status:"pending"
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">

      <h2>Dashboard</h2>

      <div className="task-form">

        <input
          placeholder="Task title"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button onClick={createTask}>Create Task</button>

      </div>

      <div className="task-list">

        {tasks.length === 0 && <p>No tasks</p>}

        {tasks.map((task)=>(
          <div key={task._id} className="task-card">

            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>

            <button onClick={()=>deleteTask(task._id)}>
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;