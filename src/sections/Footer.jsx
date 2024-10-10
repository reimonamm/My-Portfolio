const Footer = () => {
    return (
        <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>

            <div className="flex gap-3">
                {/* LinkedIn Icon */}
                <a href="https://www.linkedin.com/in/reimo-namm-637b042b4/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin-icon">
                    <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2" />
                </a>

                {/* Facebook Icon */}
                <a href="https://www.facebook.com/reimo.namm/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin-icon">
                    <img src="/assets/facebook.svg" alt="facebook" className="w-1/2 h-1/2" />
                </a>

                {/* Instagram Icon */}
                <a href="https://www.instagram.com/reimonamm/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2" />
                </a>
            </div>

            <p className="text-white-500">© 2024 Reimo Namm. All rights reserved.</p>
        </footer>
    );
};

export default Footer;