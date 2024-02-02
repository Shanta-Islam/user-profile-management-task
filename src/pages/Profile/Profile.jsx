
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';


const Profile = () => {
    const { user, updateUserProfile, errorMsgToast, setLoading } = useContext(AuthContext);
    const [image, setImage] = useState(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            console.log(event.target.files[0].mozFullPath);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const fullName = form.fullname.value;
        const photoUrl = form.photourl.value;
        const profile = {
            displayName: `${fullName ? fullName : user?.displayName}`,
            photoURL: `${photoUrl ? photoUrl : user?.photoURL}`
        }
        if (fullName === "" & photoUrl === "") {
            toast.error('Input Field Are Empty')
        }
        else {
            updateUserProfile(profile)
                .then(() => {
                    toast.success('Profile Updated')
                    setLoading(false);
                })
                .catch(error => errorMsgToast(error));
        }
    }
    return (
        <div className='container mx-auto py-20 px-2 md:px-5 md:mt-5 mb-5'>
            <div className='md:flex gap-3'>
                <div className="flex flex-col w-full bg-transparent border-2 rounded-lg border-gray-150 mt-3 md:mt-0 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-wrap items-center justify-between border-b border-gray-200 dark:border-gray-600 sm:flex-no-wrap">
                        <div className="relative p-6">
                            <h3 className="flex text-lg font-medium leading-6 text-gray-200 dark:text-gray-300">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {user?.displayName ? user.displayName : 'Unnamed User'}'s Profile Settings
                            </h3>
                        </div>
                    </div>
                    <div className="uk-card-body">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative flex flex-col px-10 py-8 lg:flex-row">
                                <div className="flex justify-start w-full mb-8 lg:w-3/12 xl:w-1/5 lg:m-b0">
                                    <div className="relative w-32 h-32 cursor-pointer group mt-5">
                                        <div className={image ? 'hidden' : 'block'}>
                                            <img id="preview" src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/3hPGXKY/default.png'} alt='profilepic' className="w-32 h-32 rounded-full " />
                                        </div>
                                        <div className={image ? 'block' : 'hidden'}>
                                            <img id="preview" src={image} alt='profilepic' className="w-32 h-32 rounded-full " />
                                        </div>
                                        <div className="absolute inset-0 w-full h-full">
                                            <input type="file" onChange={onImageChange} id="upload" className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-pointer group" />
                                            <input type="hidden" id="uploadBase64" name="avatar" />
                                            <button className="absolute bottom-0 z-10 flex items-center justify-center w-10 h-10 mb-2 -ml-5 bg-black bg-opacity-75 rounded-full opacity-75 group-hover:opacity-100 left-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-9/12 xl:w-4/5 mt-5">
                                    <div>
                                        <div className="mb-2 mt-1 block text-sm text-gray-200 font-semibold">
                                            <span>Full Name</span>
                                        </div>
                                        <input type="text" name="fullname" placeholder="Enter Full Name" className="input input-bordered w-full" required />
                                    </div>
                                    <div className='mt-3'>
                                        <div className="mb-2 mt-1 block text-sm text-gray-200 font-semibold">
                                            <span>Your Email</span>
                                        </div>
                                        <input type="email" value={user?.email} placeholder={user?.email} disabled className="input input-bordered w-full" required />
                                    </div>
                                    <div className='mt-3'>
                                        <div className="mb-2 mt-1 block text-sm text-gray-200 font-semibold">
                                            <span>Profile Photo (Optional)</span>
                                        </div>
                                        <input type="text" name="photourl" placeholder="Enter Your Profile Photo" className="input input-bordered w-full" />
                                    </div>
                                    <div className="flex justify-end w-full mt-5">
                                        <Link to='/resetPassword'> <button className='mt-5 btn bg-white me-5' >Update Password</button></Link>
                                        <button type="submit" className='mt-5 btn bg-white' >Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;