
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import image from '../../assets/images/img.png'
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {

    const { signIn, providerLogin } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();
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
                navigate(location?.state ? location.state : '/dashboard');
            })
            .then(error => {
                toast.error(error.message)
            })
    }
    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                console.log(result.user);
                toast.success('Successfully Sign In')
                navigate(location?.state ? location.state : '/dashboard/userhome');
            })
            .catch(error => console.log(error));
    }

    const handleGithubSignIn = () => {
        providerLogin(githubProvider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                SpeechSynthesisUtterance(loggedUser)
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
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn">Login</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Do not have an account ? <Link to="/register">Register</Link></p>
                    <div>
                        <button onClick={handleGoogleSignIn} className='flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 font-semibold text-white p-2 w-2/4 mx-auto rounded-lg mt-5 btn'>
                            <svg className='w-5 mr-2' fill='white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                            <span>Login with Google</span>
                        </button>
                    </div>
                    <div>
                        <button onClick={handleGithubSignIn} className='flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 font-semibold text-white p-2 w-2/4 mx-auto rounded-lg mt-5 btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            <span>Login with Github</span>
                        </button>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default Login;