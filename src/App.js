import React, { useRef } from "react";
import "./App.css";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex items-center justify-between p-6 bg-gray-900">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a
          href="./"
          className="font-semibold text-2xl tracking-widest no-underline hover:text-teal-400 transition duration-300 ease-in-out">
          &lt;/&gt;
        </a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm xl:flex-grow"></div>
        <div className="flex space-x-4">
          <a
            href="#about"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            About
          </a>
          <a
            href="#projects"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Projects
          </a>
          <a
            href="/blog"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Blog
          </a>
          <a
            href="#contact"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Contact
          </a>
          <a
            href="https://github.com/kyan0045"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center space-x-1">
            <span>GitHub</span>
            <FaExternalLinkAlt className="pl-1 mb-1 inline-block" />
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ projectsRef, contactRef }) => {
  const scrollToProjects = () => {
    projectsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContactMe = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-20">
      <div className="lg:w-1/2 mb-10 lg:mb-0">
        <h1 className="text-5xl font-bold mb-4 text-teal-200 fade-in-05s">
          Kyan Bosman
        </h1>
        <h2 className="text-3xl font-semibold mb-6 text-white fade-in-05s">
          Backend Developer
        </h2>
        <p className="text-lg mb-4 text-gray-300 fade-in-05s">
          Backend developer with a passion for building scalable and efficient
          applications. Proficient in NodeJS & C++. Specializing in applications
          like Discord/Telegram (self)bots and APIs.
        </p>
        <div>
          <button
            onClick={scrollToProjects}
            type="button"
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-bold py-2 px-4 rounded mr-2 fade-in-05s">
            View Projects
          </button>
          <button
            onClick={scrollToContactMe}
            type="button"
            className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-bold py-2 px-4 rounded mr-4 fade-in-05s">
            Contact Me
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center fade-in-05s">
        <div className="w-64 h-64 rounded-full shadow-lg bg-gray-700 overflow-hidden">
          <img
            src="/pfp.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="py-20 fade-in-1s">
      <h2 id="about" className="text-4xl font-bold mb-8 text-teal-200">
        About
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Background</h3>
          <p className="text-gray-300">
            Hiya! My name is{" "}
            <span className="font-bold text-teal-200">Kyan Bosman</span>, I'm a
            young developer from the Netherlands. I have over 2 years of
            experience in backend development, working with a variety of
            technologies and frameworks. I am passionate about building scalable
            and efficient applications that solve real-world problems or help
            making people's lives easier. My journey so far has been one with
            many interesting and varying projects and I am always eager to learn
            and grow.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Skills</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" />
              <span className="text-white font-bold mt-2">Node.js</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://skillicons.dev/icons?i=cpp" alt="C++" />
              <span className="text-white font-bold mt-2">C++</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://skillicons.dev/icons?i=tensorflow"
                alt="Tensorflow"
              />
              <span className="text-white font-bold mt-2">Tensorflow</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://skillicons.dev/icons?i=selenium"
                alt="Selenium"
              />
              <span className="text-white font-bold mt-2">Selenium</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://skillicons.dev/icons?i=tailwind"
                alt="Tailwind"
              />
              <span className="text-white font-bold mt-2">Tailwind</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://skillicons.dev/icons?i=html" alt="HTML" />
              <span className="text-white font-bold mt-2">HTML</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://skillicons.dev/icons?i=css" alt="CSS" />
              <span className="text-white font-bold mt-2">CSS</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://skillicons.dev/icons?i=regex" alt="Regex" />
              <span className="text-white font-bold mt-2">Regex</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" />
              <span className="text-white font-bold mt-2">MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="w-full h-48 bg-gray-700 mb-4 rounded overflow-hidden flex items-center justify-center">
        {image}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-teal-200 flex items-center">
        {link ? (
          <>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 flex-grow">
              {title}
            </a>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-teal-200 hover:text-teal-400">
              <FaLink />
            </a>
          </>
        ) : (
          title
        )}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const Projects = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="py-20 fade-in-1s">
      <h2 id="projects" className="text-4xl font-bold mb-8 text-teal-200">
        Projects
      </h2>
      <p className="text-lg mb-12 text-gray-300">
        Check out some of my recent projects.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          title="CatchTwo"
          description="An advanced open-source autocatcher and selfbot for the Discord game Pokétwo, CatchTwo automates the process of catching Pokémon effortlessly. Run multiple accounts simultaneously, easily configure your settings, and catch 'em all without lifting a finger. Whether you're a casual player or a hardcore collector, CatchTwo is your ultimate companion in the world of Pokétwo."
          image={
            <img
              src="/catchtwo-logo.png"
              alt="CatchTwo Logo"
              className="object-contain"
            />
          }
          link="https://github.com/kyan0045/catchtwo" 
        />
        <ProjectCard
          title="Pokehint"
          description="Originally developed as a backend tool to power CatchTwo, Pokehint is an open-source NPM package that provides automated hints and assists with Pokétwo commands. But it doesn’t stop there—Pokehint is available for any project looking to enhance the Pokétwo experience, making it a versatile solution for automating and optimizing gameplay across the board."
          link="https://github.com/kyan0045/pokehint" 
        />
        <ProjectCard
          title="Portfolio"
          description="This very website! My personal portfolio with a few pages. Built with React and TailwindCSS, it serves as a practice project for honing my frontend development skills."
          image={
            <img
              src="/site-logo.png"
              alt="Portfolio Logo"
              className="object-contain"
            />
          }
          link="https://github.com/kyan0045/portfolio" 
        />
      </div>
    </div>
  );
})

const ContactMe = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="py-20 fade-in-1s">
      <h2 id="contact" className="text-4xl font-bold mb-8 text-teal-200">
        Contact
      </h2>
      <p className="text-lg mb-12 text-gray-300">
        Interested in hiring me as a freelancer, working together or just want
        to say hi? Feel free to reach out to me!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Email</h3>
          <p className="text-gray-300">
            <a
              href="mailto:contact@kyan.space"
              className="text-teal-200 hover:text-teal-400">
              contact@kyan.space
            </a>
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Socials</h3>
          <p className="text-gray-300">
            <a
              href="https://github.com/kyan0045"
              className="text-teal-200 hover:text-teal-400">
              GitHub
            </a>
          </p>
          <p className="text-gray-300">
            <a
              href="https://discord.com/users/1101294362505269379"
              className="text-teal-200 hover:text-teal-400">
              Discord
            </a>
          </p>
          <p className="text-gray-300">
            <a
              href="https://www.linkedin.com/in/kyan-bosman-162507281/"
              className="text-teal-200 hover:text-teal-400">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );  
});

const Footer = () => {
  return (
    <footer className="pb-10 text-center text-gray-300">
      <p>
        &copy; {new Date().getFullYear()} Kyan Bosman. All rights
        reserved.
      </p>
    </footer>
  );  
} 

export default function App() {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4">
        <Hero projectsRef={projectsRef} contactRef={contactRef} />
        <About />
        <Projects ref={projectsRef} />
        <ContactMe ref={contactRef}/>
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
