import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero-img.jpg'

const Banner = () => {
    return (
        <div className="hero min-h-screen px-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={heroImage} className="rounded-lg" />
                <div>
                    <h1 className="text-4xl font-bold">Organize your life with taskia</h1>
                    <p className="py-6">Taskia is a personal task management website that helps you acheive your goals.So signup and connect with taskia.</p>
                    <Link to='/login'><button className="btn bg-[#405FF7] text-white">Get Started</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;