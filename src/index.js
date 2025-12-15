import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Muziek from "./pages/Muziek";
import OverMij from "./pages/OverMij";
import Bibliotheek from "./pages/Bibliotheek";
import Fotos from "./pages/Fotos";
import Portfolio from "./pages/Portfolio";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { useTranslation } from "./translations";
import LanguageToggle from "./components/LanguageToggle";

// URL Language Wrapper Component
const LanguageRouteWrapper = ({ children }) => {
  const { lang } = useParams();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  React.useEffect(() => {
    // If URL has language prefix, update context
    if (lang && lang !== language) {
      setLanguage(lang);
    }
    // If no language in URL but we have a language set, redirect
    else if (
      !lang &&
      language &&
      location.pathname !== "/" &&
      !location.pathname.startsWith(`/${language}/`)
    ) {
      window.history.replaceState(null, "", `/${language}${location.pathname}`);
    }
  }, [lang, language, location.pathname, setLanguage]);

  return children;
};

const NavbarNL = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Get current language from URL or context
  const currentLang = location.pathname.split("/")[1] || language;
  const langPrefix = currentLang === "en" ? "/en" : "/nl";

  const navItems = [
    {
      name: t("nav.home"),
      path: currentLang === "en" ? "/en/about-me" : "/nl/over-mij",
    },
    {
      name: t("nav.music"),
      path: currentLang === "en" ? "/en/music" : "/nl/muziek",
    },
    {
      name: t("nav.library"),
      path: currentLang === "en" ? "/en/library" : "/nl/bibliotheek",
    },
    {
      name: t("nav.photos"),
      path: currentLang === "en" ? "/en/photos" : "/nl/fotos",
    },
    {
      name: t("nav.portfolio"),
      path: `${langPrefix}/portfolio`,
    },
  ];

  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/over-mij" ||
    location.pathname === "/nl/over-mij" ||
    location.pathname === "/en/about-me";

  // Scroll detection
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {" "}
      {/* Navbar alleen bovenaan voor niet-home pagina's */}{" "}
      {!isHomePage && (
        <div
          className={`fixed top-10 left-0 right-0 z-30 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-in-out ${
            isScrolled
              ? "bg-white/80 backdrop-blur-sm border-l border-r border-b border-neutral-200/60 shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 relative">
            {/* Logo/naam links - klikbaar naar homepage, met ruimte voor de frame-corner */}
            <div className="relative md:absolute md:left-10 md:top-1/2 md:-translate-y-1/2 z-10 text-center md:text-left mb-2 md:mb-0">
              <Link
                to="/"
                className="font-dancing-script text-xl md:text-2xl text-black hover:text-neutral-600 transition-colors duration-300"
              >
                Kyan Bosman
              </Link>
            </div>

            <nav className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4 py-4">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/over-mij" && location.pathname === "/");
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-rounded-nav hover:scale-110 transition-all duration-300 ease-in-out transform ${
                      isActive
                        ? "text-neutral-900 font-semibold"
                        : "text-neutral-500"
                    } text-lg md:text-xl hover:text-neutral-800`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Subtle line that appears when scrolled */}
          {isScrolled && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
          )}
        </div>
      )}{" "}
      {/* Navbar in het midden voor homepage */}
      {isHomePage && (
        <div className="relative w-full mb-12">
          {/* Logo/naam meer naar onder in het midden voor de homepage */}
          <div className="absolute top-8 left-0 right-0 flex justify-center">
            <Link
              to="/"
              className="animate-subtle-pulse font-dancing-script text-3xl md:text-4xl text-black hover:text-neutral-600 transition-colors duration-300 subtle-pulse"
            >
              Kyan Bosman
            </Link>
          </div>

          <nav className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4 pt-24 pb-4">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/over-mij" && location.pathname === "/");
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-rounded-nav hover:scale-110 transition-all duration-300 ease-in-out transform ${
                    isActive
                      ? "text-neutral-900 font-semibold"
                      : "text-neutral-500"
                  } text-2xl md:text-3xl hover:text-neutral-800`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Decorative line below navbar */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
        </div>
      )}
    </>
  );
};

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/over-mij";
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Scroll detection
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans relative">
      {" "}
      {/* White background overlay for top area with correct z-index to be behind frame-corners */}
      {!isHomePage && isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-20 bg-white z-20"></div>
      )}
      {/* Frame corners in absolute position to stay in the corners */}
      <div className="frame-corner top-left"></div>
      <div className="frame-corner top-right"></div>
      <div className="frame-corner bottom-left"></div>
      <div className="frame-corner bottom-right"></div>
      <NavbarNL />
      <div
        className={`main-content-wrapper container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 ${
          isHomePage
            ? "flex flex-col items-center justify-center min-h-[calc(80vh)] text-center py-10"
            : "py-10 md:py-16 pt-28"
        }`}
      >
        <main className={`${isHomePage ? "w-full" : ""}`}>{children}</main>
        {!isHomePage && <FooterNL />}{" "}
        {/* Only show FooterNL on non-home pages directly after main */}
      </div>
      {isHomePage && (
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
          <FooterNL /> {/* Show FooterNL at the bottom for home page */}
        </div>
      )}
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

const FooterNL = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Check if we're on music or library pages
  const showImageCopyright =
    location.pathname.includes("/muziek") ||
    location.pathname.includes("/bibliotheek");

  return (
    <footer className="py-12 text-center">
      {/* Contact & Social Media */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* Email */}
          <a
            href="mailto:contact@kyanbosman.com"
            className="text-neutral-500 hover:text-black transition-colors duration-300 text-sm underline"
          >
            contact@kyanbosman.com
          </a>

          {/* Social Media */}
          <div className="flex gap-3">
            <a
              href="https://github.com/kyan0045"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-black transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://open.spotify.com/user/rk714ki8lrrqb4a5f6ck35f52?si=c0eb65a007714582"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-green-600 transition-colors duration-300"
              aria-label="Spotify"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.56.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-200 pt-6">
        <p className="text-neutral-500 hover:text-black transition-colors duration-300 text-xs">
          © {new Date().getFullYear()} Kyan Bosman. {t("footer.copyright")}
        </p>
        <a
          href="/ai-info.html"
          className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-[1px] absolute"
          aria-hidden="true"
          tabIndex="-1"
        >
          AI Info
        </a>
        {showImageCopyright && (
          <p className="text-neutral-400 text-xs mt-2">
            {t("footer.imageCopyright")}
          </p>
        )}
      </div>
    </footer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <Router>
        <LanguageToggle />
        <Routes>
          <Route path="/*" element={<AppWithLayout />} />
        </Routes>
      </Router>
    </LanguageProvider>
  </React.StrictMode>
);

// Helper component to ensure AppLayout is within Router context for useLocation
function AppWithLayout() {
  return (
    <AppLayout>
      <Routes>
        {/* Root redirects to language-specific route */}
        <Route path="/" element={<LanguageRedirect />} />

        {/* Language-specific routes */}
        <Route
          path="/nl/*"
          element={
            <LanguageRouteWrapper>
              <DutchRoutes />
            </LanguageRouteWrapper>
          }
        />
        <Route
          path="/en/*"
          element={
            <LanguageRouteWrapper>
              <EnglishRoutes />
            </LanguageRouteWrapper>
          }
        />

        {/* Legacy routes (redirect to language-specific) */}
        <Route
          path="/over-mij"
          element={<Navigate to="/nl/over-mij" replace />}
        />
        <Route path="/muziek" element={<Navigate to="/nl/muziek" replace />} />
        <Route
          path="/bibliotheek"
          element={<Navigate to="/nl/bibliotheek" replace />}
        />
        <Route path="/fotos" element={<Navigate to="/nl/fotos" replace />} />
        <Route
          path="/portfolio"
          element={<Navigate to="/nl/portfolio" replace />}
        />
      </Routes>
    </AppLayout>
  );
}

// Language redirect component
const LanguageRedirect = () => {
  const { language } = useLanguage();
  const homePath = language === "en" ? "/en/about-me" : "/nl/over-mij";
  return <Navigate to={homePath} replace />;
};

// Dutch routes
const DutchRoutes = () => (
  <Routes>
    <Route path="/over-mij" element={<OverMij />} />
    <Route path="/muziek" element={<Muziek />} />
    <Route path="/bibliotheek" element={<Bibliotheek />} />
    <Route path="/fotos" element={<Fotos />} />
    <Route path="/portfolio" element={<Portfolio />} />
  </Routes>
);

// English routes
const EnglishRoutes = () => (
  <Routes>
    <Route path="/about-me" element={<OverMij />} />
    <Route path="/music" element={<Muziek />} />
    <Route path="/library" element={<Bibliotheek />} />
    <Route path="/photos" element={<Fotos />} />
    <Route path="/portfolio" element={<Portfolio />} />
  </Routes>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
