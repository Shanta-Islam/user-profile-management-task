

const CommentsView = ({ review}) => {
    return (
        <div className='mt-5'>
            <article className='border-2 p-5 rounded'>
                <div className="flex items-center mb-3 space-x-4">
                    <img className="w-10 h-10 rounded-full" src={review.commenter_info.userPhoto} alt="" />
                    <div className="space-y-1 font-medium ">
                        <p className='text-2xl'>{review.commenter_info.userName} <span className="block text-sm">{review.commenter_info.userEmail}</span></p>
                    </div>
                </div>
                <div className="flex items-center mb-1"> 
                    
                </div>
                <footer className="mb-3 text-sm"><p>Reviewed on <time>{new Date(parseInt(review.comment_date)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time></p></footer>
                <p className="font-light mb-3">{review.comment}</p>
            </article>
        </div>
    );
};

export default CommentsView;