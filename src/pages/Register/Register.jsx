
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import image from '../../assets/images/img.png'
import { AuthContext } from "../../context/AuthProvider";

const Register = () => {
    const { createUser, updateUserProfile, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
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
                    <Link to='/'><p className="text-3xl text-center">Logo</p></Link>
                    <Toaster />
                </div>
            </div>
        </div>
    );
};

export default Register;