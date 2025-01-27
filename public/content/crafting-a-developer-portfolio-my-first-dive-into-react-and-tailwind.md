First of all, welcome to my website! Though fairly simple, I've spent around 9 hours developing this website, and well, why not explain some of my reasoning, why I did it in the first place, and how it came to what it is!

## Where the idea came from
I've intended to create myself a slick website for a while, I purchased this domain over a year ago with the idea of showcasing information about myself and the projects I’ve worked on. A few days ago, feeling a bit bored, I decided to finally put something on my site. And well, here’s the result!

## What I used
After exploring various frameworks that I felt would fit this project, I decided to go with a basic React app, and, of course, Tailwind for the CSS part, I've got to admit, I am indeed quite lazy.
At the time, I had little to no experience with either of these frameworks, but I decided to dive in and see how far I could get. The internet (and a bit of help from LLMs (Claude 3.5 Sonnet, Github Copilot)) proved to be great helps!

## Development Process

When I finally sat down to build this website, I was armed with enthusiasm, a vague idea, and a lot of Stack Overflow tabs ready to be opened. Here's how the process unfolded:

### Setting up the project

I started by creating a new React project using Create React App. It was as simple as running:

```bash
npx create-react-app portfolio
cd portfolio
npm start
```

And just like that, I had a boilerplate React app running locally. Next, I added Tailwind CSS to the mix:
```bash
npm install -D tailwindcss
npx tailwindcss init
```
After configuring Tailwind in my project, I was ready to start building.

### Key components and their implementation
The first component I tackled was the navigation bar. I wanted something sleek and responsive. Here's a simplified version of what I ended up with:

```jsx
const Navbar = () => {
    return (
      <nav className="sticky top-0 flex items-center justify-between p-6 bg-gray-900">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a
            href="../"
            className="font-semibold text-2xl tracking-widest no-underline hover:text-teal-400 transition duration-300 ease-in-out">
            &lt;/&gt;
          </a>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm xl:flex-grow"></div>
          <div className="flex space-x-4">
            <a
              href="../#about"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              About
            </a>
            <a
              href="../#projects"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Projects
            </a>
            <a
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Blog
            </a>
            <a
              href="../#contact"
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
  ```

  ### Creating the blogging system
  For the blogging system, I decided to use markdown files for content and parse them on the client-side. I installed the ``react-markdown`` package:
  ```bash
  npm install react-markdown
  ```
  Then, I created a component to fetch and render markdown content: ([this isn't all! check my github for the full code](https://github.com/kyan0045/portfolio/blob/main/src/components/BlogPost.js))
  ```jsx
  useEffect(() => {
    fetch("/content/blogs.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedBlog = data.find((b) => b.id === id);
        if (!selectedBlog) {
          throw new Error("Blog post not found");
        }
        setBlog(selectedBlog);
        return fetch(`/content/${id}.md`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog content");
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        const headings = text.match(/^#{1,6}.+$/gm) || [];
        const toc = headings.map((heading) => {
          const level = heading.match(/^#+/)[0].length;
          const text = heading.replace(/^#+\s*/, "");
          return { level, text };
        });
        setTableOfContents(toc);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [id]);
  ```

  This setup allowed me to write my blog posts in markdown and have them beautifully rendered on my website with custom styling.
Throughout this, it definitely wasn't always smooth sailing, but each challenge taught me something new and pushed me to improve my skills.

## Conclusion
Creating this website has been an exciting journey of learning and discovery. From diving into React and Tailwind CSS for the first time to implementing a custom blogging system, each step presented its own challenges and rewards.

Through this process, I've gained a deeper understanding of modern web development practices. I've learned the power of component-based architecture in React, experienced the efficiency of utility-first CSS with Tailwind, and discovered how to integrate markdown for flexible content management.
But beyond the technical skills, this project has taught me valuable lessons in project management and problem-solving. I've learned to break down complex tasks into manageable chunks, to persevere through frustrating bugs, and to celebrate small victories along the way.

While I'm proud of what I've accomplished in just 9 hours, I also recognize that there's always room for improvement. In the future, I plan to enhance the site's accessibility, optimize performance, and potentially add more interactive features.

To anyone considering building their own portfolio website, I wholeheartedly encourage you to take the plunge. It's a fantastic way to showcase your skills, learn new technologies, and create something uniquely yours. Remember, every expert was once a beginner – so don't be afraid to start, make mistakes, and learn from them.

Thank you for taking the time to read about my journey. I hope it has inspired you or provided some useful insights for your own projects. Happy coding!