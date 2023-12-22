
const Fqa = () => {
    return (
        <div className="mt-20">
            <div className="collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                    How do i add tasks in this website
                </div>
                <div className="collapse-content">
                    <p>First you have to login then u should able to add tasks in this website</p>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How do i delete tasks in this website
                </div>
                <div className="collapse-content">
                    <p>First you have to login then u should able to delete tasks in this website</p>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                How do i update tasks using kanban in this website
                </div>
                <div className="collapse-content">
                    <p>First you have to login then u should able to delete tasks in this website</p>
                </div>
            </div>
        </div>
    );
};

export default Fqa;