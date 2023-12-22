import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


const Header = () => {
    // const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        // logOut()
        //     .then(() => {
        //         // toast.success('Successfully Log Out');
        //     })
        //     .catch()
    }
    const links = <>
        <li><NavLink to="/" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Home</NavLink></li>
        <li><NavLink to="/fqa" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>FQA</NavLink></li>
        <li><NavLink to="/features" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Features</NavLink></li>
        {/* {
            user ?

                <div className="xl:flex">
                    <li><NavLink to="/all-assignments" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Assignments</NavLink></li>
                    <li className="mx-2"><NavLink to="/create-assignments" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Create Assignments</NavLink></li>
                    <li className="mx-3"><NavLink to="/my-assignments" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>My Assignments</NavLink></li>
                    <li className="mx-3"><NavLink to="/submitted-assignments" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Submitted Assignments</NavLink></li>

                </div>
                :
                <li><NavLink to="/all-assignments" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "hover:bg-cyan-600 bg-cyan-600 hover:text-white text-white px-5 py-2 text-md rounded" : "hover:bg-cyan-600 hover:text-white text-white px-5  py-2 mx-2 text-md rounded"}>Assignments</NavLink></li>

        } */}
        
    </>
    const [headerColor, setHeaderColor] = useState("")

    const listenScrollEvent = () => {
        window.scrollY > 10
            ? setHeaderColor('linear-gradient(to right, #4D93F8, #4AA2EE)')
            : setHeaderColor("")
    }
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent)
    })

    // const [theme, setTheme] = useState(
    //     localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    // );
    // const handleToggle = (e) => {
    //     if (e.target.checked) {
    //         setTheme("dark");
    //     } else {
    //         setTheme("light");
    //     }
    // };
    // useEffect(() => {
    //     localStorage.setItem("theme", theme);
    //     const localTheme = localStorage.getItem("theme");
    //     document.querySelector("html").setAttribute("data-theme", localTheme);
    // }, [theme]);

    const [show, setShow] = useState(false);

    const showOverlay = () => {
        setShow(true);
    };

    const hideOverlay = () => {
        setShow(false);
    };

    return (
        <div className="navbar fixed top-0 z-50 bg-gradient-to-r from-blue-400 to-blue-500" style={{ background: headerColor }}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn text-white btn-ghost xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-[#164863] shadow rounded-box w-52">
                        {links}

                    </ul>
                </div>
                <Link to='/'><a className="normal-case flex gap-2 text-xl lg:text-3xl font-medium text-white">Taskia</a></Link>
                {/* {
                theme=== 'light' ?
                <Link to='/'><a className="normal-case flex gap-2 text-xl lg:text-3xl font-medium text-black"><img src="https://i.ibb.co/PYdLcCM/logo-2.png" alt="" className="w-6 lg:w-10" />eShopHub</a></Link>
                : <Link to='/'><a className="normal-case flex gap-2 text-xl lg:text-3xl font-medium text-white"><img src="https://i.ibb.co/Bj9q11D/logo-1.png" alt="" className="w-6 lg:w-10" />eShopHub</a></Link>
            } */}
            </div>
            <div className="navbar-center hidden xl:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end lg:flex items-center">
                {/* <button className="btn btn-square btn-ghost">
                <label className="swap swap-rotate w-6 h-6">
                    <input type="checkbox"
                        onChange={handleToggle}
                        checked={theme === "light" ? false : true} />
                    <HiSun className="w-6 h-6 swap-on"></HiSun>
                    <HiMoon className="w-6 h-6 swap-off"></HiMoon>
                </label>
            </button> */}
                {/* {
                    user ?
                        <ul className="menu-horizontal px-3">
                            <li className="mx-3" onMouseOver={showOverlay}
                                onMouseLeave={hideOverlay}><div className="avatar flex-col" >
                                    <div className="w-8 rounded-full" >
                                        <img src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/X2xMzwL/defultuser.png'} />

                                    </div>
                                    <ul>
                                        <li className="text-white">{show && (
                                            <div>
                                                <p>{user?.displayName ? user?.displayName : "User"}</p>
                                            </div>
                                        )}</li>
                                    </ul>

                                </div></li>
                            <li className="mx-3 cursor-pointer text-white" onClick={handleSignOut}><a>SignOut</a></li>
                        </ul>
                        :
                        <ul className="menu menu-horizontal px-1">
                            <li><NavLink to="/login" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-white hover:text-white focus:text-white bg-transparent underline" : "text-white hover:text-white"}>Login</NavLink></li>
                            <li><NavLink to="/register" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-white hover:text-white focus:text-white bg-transparent underline" : "text-white hover:text-white"}>Register</NavLink></li>
                        </ul>

                } */}
            </div>

        </div>

    );
};

export default Header;