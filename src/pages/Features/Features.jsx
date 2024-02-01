import image from '../../assets/images/feature-img.jpg'
const Features = () => {
    const featuresList = [
        {
            id: 1,
            title: 'User Authentication',
            Desc: 'User can register and login through authentication system.'
        },
        {
            id: 2,
            title: 'Task Creation & Management',
            Desc: 'User can create task and update /delete their own task as well.'
        },
        {
            id: 3,
            title: 'Task Collaborationt',
            Desc: 'User can collaborate each other task through by comments.'
        },
    ]
    return (
        <div className="container flex flex-col-reverse mx-auto lg:flex-row p-10">
            <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5">
                {
                    featuresList?.map(f => <div key={f._id} className="flex space-x-2 sm:space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                        <div className="space-y-2">
                            <p className="text-lg font-medium leadi">{f.title}</p>
                            <p className="leadi">{f.Desc}</p>
                        </div>
                    </div>)
                }
            </div>
            <div className="lg:w-1/2 xl:w-3/5">
                <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                    <img src={image} alt="" className="rounded-lg shadow-lg  aspect-video sm:min-h-96" />
                </div>
            </div>
        </div>
    );
};

export default Features;