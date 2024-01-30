import { useEffect, useState } from "react";
import axios from "axios";
import { FaComments } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios(` https://taskia-server.vercel.app/tasks`)
            .then(res => {
                setTasks(res.data)

            })
    }, [])
    return (
        <div className="h-screen p-2">
            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5">

                {
                    tasks?.map(task => <div key={task._id} className={`card ${task?.status === "completed" ? 'bg-[#9cbef2]' : ''}  bg-base-100 shadow-xl`}>

                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <h2 className="card-title">{task.title}</h2>

                            </div>
                            <p>Description: {task.desc}</p>
                            <p>Due Date: {task.dateValue}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/dashboard/postComments/${task._id}`}><FaComments className="cursor-pointer"></FaComments></Link>
                            </div>
                        </div>

                    </div>)
                }
            </div>
            <Toaster />
        </div>
    );
};

export default Tasks;