import React, { useRef } from "react";
import "../App.css";
import "../Landing.css";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 backdrop-blur-md bg-gray-900/75 z-50 transition-all duration-300 border-b border-gray-800">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="./"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 transition duration-300"
            >
              &lt;/&gt;
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["About", "Projects", "Blog", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Blog" ? "/blog" : `#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white px-3 py-2 transition-all duration-300 group"
                >
                  <span>{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <a
                href="https://github.com/kyan0045"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <span>GitHub</span>
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ projectsRef, contactRef }) => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Kyan Bosman
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl text-gray-300 font-medium">
              Backend Developer
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Backend developer with a passion for building scalable and
              efficient applications. Specialized in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-medium">
                NodeJS & C++
              </span>
              . With a focus on automated programs like Discord/Telegram (self)bots,
              APIs and applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  projectsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
              >
                View Projects
              </button>
              <button
                onClick={() =>
                  contactRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:text-white font-medium transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:border-gray-600"
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 blur-2xl opacity-25 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-gray-800 group">
                <img
                  src="/pfp.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-opacity duration-1000 group-hover:opacity-0"
                  style={{ position: "absolute", inset: 0 }}
                />
                <img
                  src="/pfp-dark.jpg"
                  alt="Profile Dark"
                  className="w-full h-full object-cover transition-opacity duration-[2000ms] opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="relative fade-in-1s">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="about" className="text-4xl font-bold mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            About
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Background
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Hiya! My name is{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Kyan Bosman
              </span>
              , I'm a young developer from the Netherlands. I have over 2 years
              of experience in backend development, working with a variety of
              technologies and frameworks. I am passionate about building
              scalable and efficient applications that solve real-world problems
              or help making people's lives easier. My journey in both backend
              and frontend development has been filled with exciting projects,
              and I'm always eager to learn and grow.
            </p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Skills
            </h3>
            <div className="grid grid-cols-3 gap-8">
              {[
                { name: "JavaScript", icon: "js" },
                { name: "NodeJS", icon: "nodejs" },
                { name: "React", icon: "react" },
                { name: "Tensorflow", icon: "tensorflow" },
                { name: "Git", icon: "git" },
                { name: "MySQL", icon: "mysql" },
                { name: "C++", icon: "cpp" },
                { name: "MongoDB", icon: "mongodb" },
                { name: "Tailwind", icon: "tailwind" },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center group"
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${skill.icon}`}
                    alt={skill.name}
                    className="transform transition-transform group-hover:scale-110 w-12 h-12"
                  />
                  <span className="text-gray-300 font-medium mt-2">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
      <div className="w-full h-48 bg-gray-700/50 mb-6 rounded-lg overflow-hidden flex items-center justify-center">
        {image}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 flex items-center">
        {link ? (
          <>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow hover:text-teal-300 flex items-center transition-colors duration-300"
            >
              {title}
              <FaLink className="ml-2" />
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
    <div ref={ref} className="py-20 px-8 fade-in-1s">
      <h2 id="projects" className="text-4xl font-bold mb-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Projects
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <ProjectCard
          title="CatchTwo"
          description="An advanced open-source autocatcher and selfbot for the Discord game Pokétwo, CatchTwo automates the process of catching Pokémon effortlessly. Featuring AI-powered image recognition, CatchTwo identifies Pokémon directly from spawn images, streamlining the catching process. Run multiple accounts simultaneously, easily configure your settings, and catch 'em all without lifting a finger. Whether you're a casual player or a hardcore collector, CatchTwo is your ultimate companion in the world of Pokétwo."
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
        />{" "}
      </div>
      <div className="mt-12 text-center">
        <a
          href="https://github.com/kyan0045?tab=repositories&q=&type=public&language=&sort=stargazers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:text-white font-medium transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:border-gray-600"
        >
          View More Projects
          <FaExternalLinkAlt className="text-sm" />
        </a>
      </div>
    </div>
  );
});

const ContactMe = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="py-5 px-8 fade-in-1s">
      <h2 id="contact" className="text-4xl font-bold mb-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Contact
        </span>
      </h2>
      <p className="text-lg mb-12 text-gray-300">
        Interested in hiring me as a freelancer, working together or just want
        to say hi? Feel free to reach out to me!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Email
          </h3>
          <p className="text-gray-300">
            <a
              href="mailto:contact@kyan.space"
              className="text-teal-400 hover:text-teal-300 transition-colors duration-300"
            >
              contact@kyan.space
            </a>
          </p>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Socials
          </h3>
          {["GitHub", "Discord", "LinkedIn"].map((platform) => (
            <p key={platform} className="text-gray-300 mb-2">
              <a
                href={
                  platform === "GitHub"
                    ? "https://github.com/kyan0045"
                    : platform === "Discord"
                    ? "https://discord.com/users/1101294362505269379"
                    : "https://www.linkedin.com/in/kyan-bosman-162507281/"
                }
                className="text-teal-400 hover:text-teal-300 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
});

const Footer = () => {
  return (
    <footer className="py-10 text-center">
      <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
        &copy; {new Date().getFullYear()} Kyan Bosman. All rights reserved.
      </p>
    </footer>
  );
};

export default function App() {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  React.useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const isDutchUser = userLang.toLowerCase().startsWith('nl');

    // Get the current path to avoid redirecting if already on the Dutch version
    const currentPath = window.location.pathname;

    // Use sessionStorage to ensure redirection happens only once per session,
    // preventing potential redirect loops.
    const hasAttemptedRedirect = sessionStorage.getItem('dutchRedirectAttempted');

    if (isDutchUser && !currentPath.startsWith('/nl') && !hasAttemptedRedirect) {
      sessionStorage.setItem('dutchRedirectAttempted', 'true');
      // Redirect to your Dutch version.
      // This assumes your Dutch page will be accessible at the '/nl' path.
      // You'll need to set up your hosting or routing to serve the Dutch page at this path.
      window.location.href = '/nl';

      // Alternatively, if your Dutch page is a completely separate HTML file,
      // you might redirect like this:
      // window.location.href = '/index_nl.html';
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Hero projectsRef={projectsRef} contactRef={contactRef} />
            <About />
            <Projects ref={projectsRef} />
            <ContactMe ref={contactRef} />
            <Footer />
          </div>
        </div>
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
