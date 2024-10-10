import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Music from "./sections/Music.jsx";

const App = () => {
    return (
        <main className="max-w-7xl mx-auto">
         <Navbar></Navbar>
         <Hero></Hero>
            <About></About>
            <Projects></Projects>
            <Music></Music>
            <Contact></Contact>
            <Footer></Footer>
        </main>
    )
}
export default App
