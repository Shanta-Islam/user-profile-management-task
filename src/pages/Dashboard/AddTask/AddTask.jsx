import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleAddTask = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const desc = form.desc.value;
        const pLevel = form.pLevel.value;
        const deadline = form.deadline.value;
        const email = user?.email;

        const newAssignment = { title, desc, pLevel, deadline, email }
        // console.log(newAssignment);
        fetch(`https://taskia-server.vercel.app/task`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAssignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success('Task Added Successfully')
                    navigate("/dashboard/tasks")
                }
                form.reset();
            })

    }
    return (
        <div className="p-20">
            <h2 className="text-2xl font-bold text-center">Add Task</h2>
            <form onSubmit={handleAddTask}>
                {/* form title and desc row */}
                <div className="md:flex mb-8 mt-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="title" placeholder="Title" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="desc" className="textarea textarea-bordered w-full" placeholder="Description" required></textarea>
                        </label>
                    </div>
                </div>
                {/* form marks and img url row */}
                <div className="md:flex mb-8 mt-5">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Deadlines</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name="deadline" placeholder="Deadline" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Priority Level</span>
                        </label>
                        <label className="input-group">
                            <select className="select select-bordered w-full" name='pLevel' required>
                                <option value="Low">Low</option>
                                <option value="Moderate">Moderate</option>
                                <option value="High">High</option>
                            </select>
                        </label>
                    </div>
                </div>


                <input type="submit" value="Add Task" className="btn btn-block bg-blue-500 text-white" />

            </form>
            <Toaster />
        </div>
    );
};

export default AddTask;