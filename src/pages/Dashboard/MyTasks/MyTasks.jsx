import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa6";

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    useEffect(() => {
        axios(` https://taskia-server.vercel.app/task/${user?.email}/?status=${status}`)
            .then(res => {
                setTasks(res.data)
                setLoading(false)
            })
    }, [user?.email, status])
    const handleDelete = (id) => {
        console.log(id)
        fetch(` https://taskia-server.vercel.app/delete-task/${id}?email=${user?.email}`, {
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
    const handleCompleted = (id) => {
        fetch(` https://taskia-server.vercel.app/completed-task/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    toast.success("Completed Task Succesfully")
                }


            })
    }
    return (
        <div className="h-screen p-2">
            <label className="input-group">
                <select className="form-select border rounded-md my-5" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                    <option selected value="">All</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5">

                {
                    tasks?.map(task => <div key={task._id} className={`card ${task?.status === "completed" ? 'bg-[#9cbef2]' : ''}  bg-base-100 shadow-xl`}>

                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <h2 className="card-title">{task.title}</h2>
                                <Link to={`/dashboard/postComments/${task._id}`}> <FaComments className="cursor-pointer"></FaComments></Link>
                            </div>
                            <p>Description: {task.desc}</p>
                            <p>Due Date: {task.dateValue}</p>
                            <div className="card-actions justify-end">
                                {task.status ? <button className="btn btn-sm btn-disabled">Completed</button> : <button className="btn btn-sm" onClick={() => handleCompleted(task._id)}>Completed</button>}
                                <Link to={`/dashboard/updateTask/${task._id}`}><button className="btn btn-sm">Update</button></Link>
                                <button className="btn btn-sm bg-red-400 text-white" onClick={() => handleDelete(task._id)} >Delete</button>
                            </div>
                        </div>

                    </div>)
                }
            </div>
            <Toaster />
        </div>
    );
};

export default MyTasks;