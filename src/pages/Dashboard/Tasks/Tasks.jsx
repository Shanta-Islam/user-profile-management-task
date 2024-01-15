import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios(`http://localhost:5000/tasks`)
            .then(res => setTasks(res.data))
    }, [])
    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/delete-task/${id}?email=${user?.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    toast.error('You Are Not Create This Task ,So You Are Not Able to Delete')
                }
                else {

                    // remove the user from the UI

                    const remainingUsers = tasks && tasks.filter(item => (item._id !== id));
                    setTasks(remainingUsers);
                    toast.success('Deleted Successfully');

                }

            })
    }
    return (
        <div className="h-screen p-2">
            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5">

                {
                    tasks?.map(task => <div key={task._id} className="card bg-base-100 shadow-xl">
                        <Link to={`/dashboard/updateTask/${task._id}`}>
                            <div className="card-body">
                                <h2 className="card-title">{task.name}</h2>
                                <p>{task.desc}</p>
                                <p>Due Date: {task.dateValue}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm">Completed</button>
                                    <button className="btn btn-sm bg-red-400 text-white" onClick={() => handleDelete(task._id)} >Delete</button>
                                </div>
                            </div>
                        </Link>

                    </div>)
                }
            </div>
            <Toaster />
        </div>
    );
};

export default Tasks;