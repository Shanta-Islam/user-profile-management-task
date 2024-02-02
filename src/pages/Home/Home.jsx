import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";


const Home = () => {
    const { user } = useContext(AuthContext);
    return (
            <div className=" dark:bg-slate-800 py-20 mx-auto flex justify-center">
                <div className="card w-96 text-primary-content text-center">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Hello, {user?.displayName ? user?.displayName : "User"}</h2>
                        <p>Want to manage your information? Go to</p>
                        <Link to='/profile'><button className="btn">Profile</button></Link>
                    </div>
                </div>

            </div>
            );
};

            export default Home;