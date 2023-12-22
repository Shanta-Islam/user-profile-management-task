
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import image from '../../assets/images/img.png'
import { AuthContext } from "../../context/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
    const { providerLogin, createUser, updateUserProfile, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters or longer')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Password should be at least one uppercase characters')
            return;
        }
        else if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
            toast.error('Password should be at least one special character')
            return;
        }
        console.log(name);
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                const user = { email };
                fetch('https://eshophub-server-shanta-islam.vercel.app/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',

                    },
                    body: JSON.stringify(user)
                })
                toast.success('Successfully Sign Up')
                handleUpdateUserProfile(name, photo);
                navigate('/login')
            })
            .catch(error => {
                console.error(error)
            })
    }
    const handleUpdateUserProfile = (name, photo) => {
        const profile = {
            displayName: name,
            photoURL: photo
        }
        updateUserProfile(profile)
            .then(() => {
                setLoading(false)
                toast.success('Profile Updated');
            })
            .catch(error => {
                toast.error(error);
            });
    }
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row lg:gap-40">
                <div>
                    <img src={image} alt="" width={700} />
                </div>
                <div className="flex-shrink-0 w-full max-w-lg shadow-xl p-5">
                    <h2 className="text-2xl text-center">Please Register</h2>
                    <form onSubmit={handleRegister} className="mx-auto card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn">Register</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Already have an account ? <Link to="/login">Login</Link></p>
                    {/* <div>
                        <button onClick={handleGoogleSignIn} className='flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 font-semibold text-white p-2 w-2/4 mx-auto rounded-lg mt-5 btn'>
                            <svg className='w-5 mr-2' fill='white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                            <span>Signup with Google</span>
                        </button>
                    </div> */}
                    <Toaster />
                </div>
            </div>
        </div>
    );
};

export default Register;