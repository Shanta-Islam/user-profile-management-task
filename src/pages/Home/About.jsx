import aboutImage from '../../assets/images/about-img.png';
const About = () => {
    return (
        <div className=' px-10' >
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto lg:mt-0 lg:col-span-7 lg:flex hidden relative lg:visible">
                    <img src={aboutImage} alt="about img" className="w-3/4 " />
                    <div className='absolute left-72 top-2 bg-blue-200 p-1 rounded-md'>
                        <p className='text-black font-medium'>#Deadlines</p>
                    </div>
                    <div className='absolute top-10 -left-5 bg-pink-200 p-10 rounded-md'>
                        <p className='text-black font-medium text-xl '>130</p>
                        <p className='text-black'>Today</p>
                    </div>
                </div>
                <div className="place-self-center lg:col-span-5">
                    <h2 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-3xl ">Focus your energy on the right things.</h2>
                    <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl ">Taskia surfaces the right tasks at the right times so you can always know what to focus on next.</p>
                    <button>Get More Info</button>
                </div>
            </div>
        </div >
    );
};

export default About;