import React, { useState } from "react";

const Creations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const creations = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "This very website you're browsing - built with React and Tailwind CSS",
      category: "websites",
      type: "Website",
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      link: "https://github.com/kyan0045/portfolio",
      image: "/logo.gif",
    },
    {
      id: 2,
      title: "GitHub Profile",
      description: "My coding projects and contributions",
      category: "code",
      type: "GitHub",
      technologies: ["Various"],
      link: "https://github.com/kyan0045",
      image: "https://github.com/kyan0045.png",
    },
    // Add more items as needed
  ];

  const categories = [
    { key: "all", label: "Alles", icon: "🎨" },
    { key: "websites", label: "Websites", icon: "💻" },
    { key: "code", label: "Code", icon: "⚡" },
    { key: "poems", label: "Gedichten", icon: "📝" },
    { key: "design", label: "Design", icon: "🎭" },
  ];

  const filteredCreations =
    selectedCategory === "all"
      ? creations
      : creations.filter((item) => item.category === selectedCategory);

  const CategoryButton = ({ category }) => (
    <button
      onClick={() => setSelectedCategory(category.key)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        selectedCategory === category.key
          ? "bg-black text-white shadow-md"
          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      <span>{category.icon}</span>
      {category.label}
    </button>
  );

  const CreationCard = ({ creation }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-neutral-100">
      {creation.image && (
        <div className="aspect-video w-full overflow-hidden bg-neutral-100">
          <img
            src={creation.image}
            alt={creation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-black group-hover:text-neutral-700 transition-colors">
            {creation.title}
          </h3>
          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
            {creation.type}
          </span>
        </div>

        <p className="text-neutral-600 mb-4 leading-relaxed">
          {creation.description}
        </p>

        {creation.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {creation.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-50 text-neutral-700 text-xs rounded border"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {creation.link && (
          <a
            href={creation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black hover:text-neutral-600 font-medium transition-colors group"
          >
            Bekijk project
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-16 fade-in-1s">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-black font-dancing-script">
            Portfolio
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Een overzicht van mijn creatieve projecten - van websites en code
            tot gedichten en designs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <CategoryButton key={category.key} category={category} />
          ))}
        </div>

        {/* Creations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCreations.length > 0 ? (
            filteredCreations.map((creation) => (
              <CreationCard key={creation.id} creation={creation} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500 text-lg">
                Geen creaties gevonden in deze categorie.
              </p>
              <p className="text-neutral-400 text-sm mt-2">
                Probeer een andere categorie of kom later terug voor nieuwe
                projecten.
              </p>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl p-8">
            <h3 className="text-xl font-bold text-black mb-3">
              Meer komt eraan...
            </h3>
            <p className="text-neutral-600">
              Ik werk altijd aan nieuwe projecten. Check regelmatig terug voor
              updates!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creations;
