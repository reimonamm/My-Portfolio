import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Music from "./sections/Music.jsx";
import Terms from "./sections/Terms.jsx";
import Privacy from "./sections/Privacy.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <main className="max-w-7xl mx-auto">
                        <Hero />
                        <About />
                        <Projects />
                        <Music />
                        <Contact />
                        <Footer />
                    </main>
                } />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
        </Router>
    );
}

export default App;