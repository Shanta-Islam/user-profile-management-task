import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import CommentsView from "./CommentsView";

const PostDetails = () => {
    const singleTask = useLoaderData();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const url = ` https://taskia-server.vercel.app/tasks-comments?taskId=${singleTask._id}`;
        fetch(url)
            .then((response) => response.json())
            .then((actualData) => {
                setComments(actualData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [singleTask._id, loading]);


    const handleSubmitReview = event => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const email = user?.email || 'unregistered';
        const reviewMsg = form.reviewmsg.value;
        const userphoto = form.userphoto.value;
        console.log(username, reviewMsg, email, userphoto);

        const review = {
            taskId : singleTask._id,
            title: singleTask.title,
            comment: reviewMsg,
            comment_date: new Date().getTime(),
            commenter_info: {
                userID: user?.uid,
                userName: username,
                userEmail: user?.email,
                userPhoto: userphoto
            }
        }

        fetch(' https://taskia-server.vercel.app/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('review receive successfully')
                    form.reset();
                }
            })
            .catch(err => console.error(err));

    }
    return (
        <div className='container mx-auto'>
            <div className="card w-3/4 bg-base-100 shadow-xl mx-auto">
                <div className="card-body">
                    <h2 className="card-title">{singleTask.title}</h2>
                    <p className='text-lg'><span className='font-medium'>About this task:</span> {singleTask.desc}</p>
                    <div className="card-actions justify-end">
                        <button className="btn"  onClick={()=>document.getElementById('my_modal_1').showModal()}>Write your comment</button>
                    </div>
                    <div className={!(singleTask.length <= 0) ? 'hidden' : 'block'}>
                        <p className='text-2xl font-semibold text-gray-500 text-center mt-12 mb-12'>No Comments Yet Added</p>
                    </div>
                    {comments.map(review => <CommentsView key={review._id} review={review} setLoading={setLoading}></CommentsView>)}
                </div>

            </div>
            <>
                <dialog id="my_modal_1" type="checkbox" className="modal modal-bottom sm:modal-middle">
                    <form method="dialog" className="modal-box" onSubmit={handleSubmitReview}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" name="username" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input type="text" placeholder="Email" name="email" className="input input-bordered" defaultValue={user?.email} readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Comment</span>
                            </label>
                            <textarea name="reviewmsg" className="textarea textarea-bordered h-24 w-full" placeholder="Write Your Comment" required></textarea>
                            <input type="text" placeholder="photo" name="userphoto" className="input input-bordered hidden" value={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/X2xMzwL/defultuser.png'} />
                        </div>
                        <div className="modal-action" htmlFor="review_modal">
                            <button className="btn">Submit Comment</button>
                        </div>
                    </form>
                </dialog>
            </>
        </div>
    );
};

export default PostDetails;