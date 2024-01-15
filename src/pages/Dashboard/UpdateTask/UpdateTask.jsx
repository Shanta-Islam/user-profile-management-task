
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const task = useLoaderData();
    // console.log(task)
    const { _id, title, desc } = task;
    const handleUpdateTask = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const desc = form.desc.value;
        const dateValue = form.dateValue.value;
        const email = user?.email;

        const newTask = { title, desc, dateValue, email }
        fetch(`http://localhost:5000/update-task/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Task Updated Successfully')
                    navigate("/dashboard/tasks")
                }


            })


    }
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="p-20">
            <h2 className="text-2xl font-bold text-center">Update Task</h2>
            <form onSubmit={handleUpdateTask}>
                {/* form title and desc row */}
                <div className="md:flex mb-8 mt-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" defaultValue={title} name="title" placeholder="Title" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="desc" defaultValue={desc} className="textarea textarea-bordered w-full" placeholder="Description" required></textarea>
                        </label>
                    </div>
                </div>
                {/* form marks and img url row */}
                <div className="md:flex mb-8 mt-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <label className="input-group">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} name="dateValue" className='input input-bordered w-full' required />
                        </label>
                    </div>
                </div>


                <input type="submit" value="Update Task" className="btn btn-block bg-blue-500 text-white" />

            </form>
            <Toaster />
        </div>
    );
};

export default UpdateTask;