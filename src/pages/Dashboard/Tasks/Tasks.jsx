import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        axios(`https://taskia-server.vercel.app/task/${user?.email}`)
            .then(res => setTasks(res.data))
    }, [user?.email])
    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://taskia-server.vercel.app/delete-task/${id}?email=${user?.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    toast.error('You Are Not Able to Delete')
                }
                else {

                    // remove the user from the UI

                    const remainingUsers = assignments && assignments.filter(item => (item._id !== id));
                    setAssignments(remainingUsers);
                    toast.success('Deleted Successfully');

                }

            })
    }
    return (
        <div className="h-screen p-2">
            <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-5">
                <div className="bg-white rounded px-2 py-2">
                    <div className="flex flex-row justify-between items-center mb-2 mx-1">
                        <div className="flex items-center">
                            <h2 className="bg-red-100 text-sm w-max px-1 rounded mr-2 text-gray-700">To-do</h2>
                            <p className="text-gray-400 text-sm">{tasks.length}</p>
                        </div>
                    </div>

                    <div className="grid grid-rows-2 gap-2">
                        {
                            tasks?.map(task => <div key={task._id} className="p-2 rounded shadow-sm border-gray-100 border-2">
                                <h3 className="text-sm mb-3 text-gray-700">{task.title}</h3>
                                <p className="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">To-do</p>
                                <div className="flex flex-row items-center mt-2">
                                    <div className="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
                                    <a href="#" className="text-xs text-gray-500">{task.desc}</a>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <p className="text-xs text-gray-500 mt-2">Deadline: {task.deadline}</p>
                                    <p className="text-xs text-gray-500 mt-2">Priority Level: {task.pLevel}</p>
                                </div>
                                <button className="btn" onClick={()=>handleDelete(task._id)}>Delete</button>
                            </div>)
                        }

                    </div>
                </div>


                <div className="bg-white rounded px-2 py-2">

                    <div className="flex flex-row justify-between items-center mb-2 mx-1">
                        <div className="flex items-center">
                            <h2 className="bg-yellow-100 text-sm w-max px-1 rounded mr-2 text-gray-700">Ongoing</h2>
                            
                        </div>
                    </div>

                    
                </div>
                <div className="bg-white rounded px-2 py-2">

                    <div className="flex flex-row justify-between items-center mb-2 mx-1">
                        <div className="flex items-center">
                            <h2 className="bg-yellow-100 text-sm w-max px-1 rounded mr-2 text-gray-700">Complete</h2>
                           
                        </div>
                    </div>

                  
                </div>





            </div>
        </div>
    );
};

export default Tasks;