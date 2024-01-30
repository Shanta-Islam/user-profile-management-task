

const Footer = () => {
    return (
        <footer className="footer p-10 bg-[#e2fcfc] text-base-content">
            <aside>
                <p className="text-2xl font-bold">Taskia</p>
                <p>Taskia is a task management website</p>
            </aside>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
            </nav>
        </footer>
    );
};

export default Footer;