
import { useContext, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from '../../assets/images/img.png'
import { AuthContext } from "../../context/AuthProvider";


const Login = () => {

    const { signIn, passwordReset } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        signIn(email, password)
            .then(result => {
                if (email !== result.user?.email) {
                    toast.error("email does't match")
                }
                else if (password !== result.user?.password) {
                    toast.error("password doesn't match");
                }
                toast.success('Successfully Sign In')
                navigate(location?.state ? location.state : '/');
            })
            .then(error => {
                toast.error(error.message)
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('pelase provide an email', emailRef.current.value)
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('please write a valid email')
            return;
        }

        // send validation email
        passwordReset(email)
            .then(() => {
                alert('please check your email')
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row lg:gap-40">
                <div>
                    <img src={image} alt="" width={700} />
                </div>
                <div className="flex-shrink-0 w-full max-w-lg shadow-xl p-5">
                    <h2 className="text-2xl text-center">Please Login</h2>
                    <form onSubmit={handleLogin} className="mx-auto card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn">Login</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Do not have an account ? <Link to="/register">Register</Link></p>
                    <Link to='/'><p className="text-3xl text-center">Logo</p></Link>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default Login;