import { Link } from "react-router-dom";


const About = () => {
    return (
        <div>
            <div>
                <div className="container mx-auto px-6 text-center py-20">
                    <h2 className="mb-6 text-4xl font-bold text-center ">Developers can use this website</h2>
                    <h3 className="my-4 text-2xl ">Know More Details</h3>
                    <Link to='/fqa'><button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider hover:border-red hover:text-white hover:bg-blue-500">Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default About;