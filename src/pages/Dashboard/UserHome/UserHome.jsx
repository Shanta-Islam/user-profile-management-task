import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import wave from '../../../assets/images/wave.gif';
import axios from "axios";



const UserHome = () => {
    const { user } = useContext(AuthContext);
    const status = 'completed';
    const [tasks, setTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    useEffect(() => {
        axios(` https://taskia-server.vercel.app/tasks`)
            .then(res => {
                setTasks(res.data)

            })
    }, [])
    
    useEffect(() => {
        axios(` https://taskia-server.vercel.app/task/${user?.email}`)
            .then(res => {
                setMyTasks(res.data)

            })
    }, [user?.email]);
   
    useEffect(() => {
        axios.get(` https://taskia-server.vercel.app/activeTasks/${status}/${user?.email}`)
            .then(data => setActiveTasks(data.data))
    }, [status, user?.email])
    const allTasks = tasks.length;
    const allMyTasks = myTasks.length;
    const userTaskInfo = [
        {
            id: 1,
            title: 'Total Task',
            total: allTasks
        },
        {
            id: 2,
            title: 'Your Task',
            total: allMyTasks
        }

    ]
    return (
        <div className="p-6 grid grid-cols-[4fr,1fr] gap-4">
            <div>
                <div className="card w-full shadow-md rounded-md mb-4 bg-blue-700 bg-opacity-60 overflow-hidden">
                    <div className="absolute w-20 h-20 -top-2 -left-4 bg-blue-600 rounded-full "></div>
                    <div className="absolute w-20 h-20 -bottom-2 -right-4 bg-blue-600 rounded-full "></div>
                    <div className="card-body m-5">
                        <h2 className="card-title text-white">Hi, <strong>{user?.displayName}</strong><img src={wave} alt="" className="w-10 h-10" /></h2>
                        <p className="text-white">You have already finished {activeTasks.length} tasks on time. Your progress is very good.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {
                        userTaskInfo?.map(info => <div key={info.id} className="card  bg-base-100 shadow-md rounded-md">
                            <div className="card-body">
                                <h2 className="card-title">{info.title}</h2>
                                <p>{info.total}</p>
                            </div>
                        </div>)
                    }

                </div>
            </div>
            <div className="min-h-fit">
                <div className="card w-96 bg-base-100 shadow-md rounded-md">
                    <div className="card-body">
                        <h2 className="card-title">Your Recent Task</h2>
                        {myTasks?.map(t=> <h3 key={t._id}>Name: {t.title}</h3>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;