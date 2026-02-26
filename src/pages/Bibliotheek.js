import React, { useState, useEffect } from "react";
import { useTranslation } from "../translations";

// Helper function to parse dd-mm-yyyy format
const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Star rating component with half-star support
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const full = index + 1 <= Math.floor(rating);
        const half = !full && index + 0.5 <= rating;
        if (full) {
          return (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
          );
        } else if (half) {
          return (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <defs>
                <linearGradient id={`half-gradient-${index}`}>
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="50%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"
                fill={`url(#half-gradient-${index})`}
              />
            </svg>
          );
        } else {
          return (
            <svg
              key={index}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

const Bibliotheek = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortType, setSortType] = useState("finishedDate");
  const [activeTab, setActiveTab] = useState("series");

  useEffect(() => {
    fetch("/content/bibliotheek.json")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);

        const fetchedTypes = [...new Set(data.map((item) => item.type))];
        const hasSeries = fetchedTypes.includes("Series") || fetchedTypes.includes("Film");
        
        if (!hasSeries && fetchedTypes.length > 0) {
          if (fetchedTypes.includes("Book")) setActiveTab("boeken");
          else if (fetchedTypes.includes("Poetry")) setActiveTab("poezie");
          else if (fetchedTypes.includes("Article")) setActiveTab("artikelen");
        }
      })
      .catch((error) =>
        console.error("Error fetching bibliotheek data:", error)
      );
  }, []);

  // Determine which tabs to show based on available data
  const types = [...new Set(items.map((item) => item.type))];
  const availableTabs = [];

  if (types.includes("Series") || types.includes("Film")) {
    availableTabs.push({ key: "series", label: t("library.tabs.series") });
  }
  if (types.includes("Book")) {
    availableTabs.push({ key: "boeken", label: t("library.tabs.books") });
  }
  if (types.includes("Poetry")) {
    availableTabs.push({ key: "poezie", label: t("library.tabs.poetry") });
  }
  if (types.includes("Article")) {
    availableTabs.push({ key: "artikelen", label: t("library.tabs.articles") });
  }

  // First filter by active tab, then split into dated and undated, then sort
  const getFilteredItems = () => {
    let filtered = items;

    if (activeTab === "series") {
      filtered = items.filter(
        (item) => item.type === "Series" || item.type === "Film"
      );
    } else if (activeTab === "boeken") {
      filtered = items.filter((item) => item.type === "Book");
    } else if (activeTab === "poezie") {
      filtered = items.filter((item) => item.type === "Poetry");
    } else if (activeTab === "artikelen") {
      filtered = items.filter((item) => item.type === "Article");
    }
    return filtered;
  };

  const filteredItems = getFilteredItems();

  // Only split if sorting by date
  const shouldSplit = sortType === "finishedDate";

  const datedItems = shouldSplit
    ? filteredItems.filter((item) => item.finishedDate)
    : filteredItems;
  const undatedItems = shouldSplit
    ? filteredItems.filter((item) => !item.finishedDate)
    : [];

  const sortItems = (itemsToSort, isUndated = false) => {
    return [...itemsToSort].sort((a, b) => {
      if (sortType === "finishedDate") {
        if (isUndated) return a.title.localeCompare(b.title);
        // Handle case where finishedDate might be missing if we are in the "shouldSplit=false" path but somehow got here?
        // Actually if sortType is finishedDate, we ARE splitting.
        // But just to be safe in logic:
        const dateA = parseDate(a.finishedDate);
        const dateB = parseDate(b.finishedDate);
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateB - dateA;
      }
      if (sortType === "rating") {
        return b.rating - a.rating;
      }
      if (sortType === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const mainItems = sortItems(datedItems);
  const archiveItems = sortItems(undatedItems, true);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
        activeTab === tab
          ? "bg-black text-white shadow-md"
          : "text-neutral-700 hover:text-black"
      }`}
    >
      {label}
    </button>
  );

  const renderArticles = (articlesToRender) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {articlesToRender.map((article) => (
        <a
          key={article.title}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 h-64"
        >
          {article.coverUrl ? (
            <img
              src={article.coverUrl}
              alt={`Cover for ${article.title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800"></div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
              {article.publication}
            </p>
            <h3 className="text-xl font-bold mb-2 leading-snug line-clamp-3">
              {article.title}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-neutral-300">
                {article.author}
              </span>
              
              <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  const renderGrid = (itemsToRender) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {itemsToRender.map((item) => (
        <div
          key={item.title}
          className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
          onClick={() => openModal(item)}
        >
          <img
            src={item.coverUrl}
            alt={`Cover for ${item.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-md truncate">{item.title}</h3>
              <p className="text-sm text-neutral-300 truncate">{item.author}</p>
              <div className="mt-2">
                <StarRating rating={item.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="bibliotheek" className="pt-32 pb-16 md:py-16 fade-in-1s">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-black font-dancing-script">
          {t("library.title")}
        </h1>

        <div className="flex justify-center bg-neutral-100 rounded-lg p-1 border border-neutral-200 mb-12">
          {availableTabs.map((tab) => (
            <TabButton key={tab.key} tab={tab.key} label={tab.label} />
          ))}
        </div>

        {activeTab !== "artikelen" && (
          <div className="flex justify-end mb-8">
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="bg-white border border-neutral-300 rounded-md py-2 px-4 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
            >
              <option value="finishedDate">
                {t("library.sort.recent")}{" "}
                {activeTab === "series"
                  ? t("library.sort.watched")
                  : t("library.sort.read")}
              </option>
              <option value="rating">{t("library.sort.rating")}</option>
              <option value="title">{t("library.sort.title")}</option>
            </select>
          </div>
        )}

        {activeTab === "artikelen" && (
          <p className="text-sm text-neutral-500 text-center mb-8">
            {t("library.articlesIntro")}
          </p>
        )}

        {activeTab === "artikelen"
          ? renderArticles(filteredItems)
          : renderGrid(mainItems)}

        {activeTab !== "artikelen" && archiveItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black font-dancing-script">
              {t("library.archive") || "Archief"}
            </h2>
            {renderGrid(archiveItems)}
          </div>
        )}

        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 p-4"
            onClick={closeModal}
          >
            {selectedItem.review && selectedItem.review.trim() ? (
              // Modal with review - traditional white background
              <div
                className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`flex ${selectedItem.type === "Book" || selectedItem.type === "Poetry" ? "flex-col md:flex-row" : "flex-col lg:flex-row"}`}
                >
                  {/* Image container with proper sizing for different content types */}
                  <div
                    className={`flex-shrink-0 ${
                      selectedItem.type === "Book" ||
                      selectedItem.type === "Poetry"
                        ? "w-full md:w-64 h-80 md:h-auto"
                        : "w-full lg:w-80 h-96 lg:h-auto"
                    } ${
                      selectedItem.type === "Book" ||
                      selectedItem.type === "Poetry"
                        ? "md:rounded-l-lg"
                        : "lg:rounded-l-lg"
                    } rounded-t-lg overflow-hidden bg-transparent`}
                  >
                    <img
                      src={selectedItem.coverUrl}
                      alt={`Cover for ${selectedItem.title}`}
                      className={`w-full h-full ${
                        selectedItem.type === "Book" ||
                        selectedItem.type === "Poetry"
                          ? "object-contain md:object-cover"
                          : "object-cover"
                      }`}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {selectedItem.title}
                    </h2>
                    <p className="text-lg text-neutral-600 mb-4">
                      {selectedItem.author}
                    </p>
                    <div className="flex items-center justify-center mb-4">
                      <StarRating rating={selectedItem.rating} />
                      <span className="ml-3 text-neutral-500 text-sm">
                        ({selectedItem.rating} / 5)
                      </span>
                    </div>
                    <p className="text-neutral-500 text-sm mb-4 text-center">
                      {selectedItem.finishedDate ? (
                        <>
                          {selectedItem.type === "Series"
                            ? t("library.finished.series")
                            : selectedItem.type === "Film"
                              ? t("library.finished.film")
                              : t("library.finished.book")}
                          :{" "}
                          {new Date(
                            parseDate(selectedItem.finishedDate)
                          ).toLocaleDateString("nl-NL", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </>
                      ) : (
                        t("library.finished.unknown") || "Datum onbekend"
                      )}
                    </p>
                    <p className="text-neutral-700 leading-relaxed flex-grow">
                      {selectedItem.review}
                    </p>
                  </div>
                </div>

                {/* Close button for review modal */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-lg hover:scale-110 transition-transform z-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              // Modal without review - cover background with overlay
              <div
                className="relative rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
                style={{
                  backgroundImage: `url(${selectedItem.coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                {/* Content */}
                <div className="relative z-10 p-8 text-center text-white">
                  {/* Cover image with dynamic sizing */}
                  <div className="flex justify-center mb-6">
                    <div className="rounded-lg overflow-hidden shadow-xl">
                      <img
                        src={selectedItem.coverUrl}
                        alt={`Cover for ${selectedItem.title}`}
                        className="max-w-48 max-h-64 min-w-32 min-h-40 w-auto h-auto object-contain"
                        style={{
                          aspectRatio: "auto",
                        }}
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                    {selectedItem.title}
                  </h2>
                  <p className="text-lg mb-4 text-neutral-200 drop-shadow">
                    {selectedItem.author}
                  </p>

                  <div className="flex items-center justify-center mb-4">
                    <StarRating rating={selectedItem.rating} />
                    <span className="ml-3 text-neutral-300 text-sm drop-shadow">
                      ({selectedItem.rating} / 5)
                    </span>
                  </div>

                  <p className="text-neutral-300 text-sm drop-shadow">
                    {selectedItem.finishedDate ? (
                      <>
                        {selectedItem.type === "Series"
                          ? t("library.finished.series")
                          : selectedItem.type === "Film"
                            ? t("library.finished.film")
                            : t("library.finished.book")}
                        :{" "}
                        {new Date(
                          parseDate(selectedItem.finishedDate)
                        ).toLocaleDateString("nl-NL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </>
                    ) : (
                      t("library.finished.unknown") || "Datum onbekend"
                    )}
                  </p>
                </div>

                {/* Close button for modal without review */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-lg hover:scale-110 transition-transform z-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bibliotheek;
