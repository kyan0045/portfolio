import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import "../NL.css"; 
import { FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";


const NavbarNL = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Muziek", id: "music" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (sectionId) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="w-full mb-16 md:mb-24 relative"> {/* Added relative for mobile menu positioning */}
      <div className="mx-auto flex items-center justify-between h-16 px-0">
        <div className="flex-shrink-0">
          <a
            href="/nl"
            className="text-3xl font-bold text-black hover:text-neutral-700 transition duration-300 font-dancing-script"
            onClick={(e) => { e.preventDefault(); handleMobileLinkClick("hero-nl"); }}
          >
            Kyan.space{" "}
            {/* Consider a more artistic font or SVG for "Kym" if desired */}
          </a>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-6">
            {" "}
            {/* Reduced space-x slightly */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="relative text-black hover:text-neutral-600 px-1 py-2 transition-all duration-300 group text-sm"
              >
                <span className="text-xl">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
        {/* Basic Mobile Menu Toggle (Functionality would need to be added) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none p-2">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> 
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg> 
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-2 z-40">
          <div className="flex flex-col items-center space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleMobileLinkClick(item.id); }}
                className="block text-black hover:text-neutral-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroNL = ({ onNavigate }) => {
  const [displayedAge, setDisplayedAge] = useState(0);
  const birthDate = useMemo(() => new Date(2008, 0, 10), []);
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const calculateAge = () => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const actualAge = calculateAge();
    let currentAge = 0;

    if (actualAge > 0) {
      const intervalSpeed = 170;
      const increment = 1;
      const interval = setInterval(() => {
        currentAge += increment;
        if (currentAge >= actualAge) {
          setDisplayedAge(actualAge);
          clearInterval(interval);
        } else {
          setDisplayedAge(currentAge);
        }
      }, intervalSpeed);
      return () => clearInterval(interval);
    } else {
      setDisplayedAge(actualAge);
    }
  }, [birthDate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 20) { 
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []); 

  return (
    <section
      id="hero-nl"
      className="min-h-[calc(80vh)] flex flex-col items-center justify-center text-center py-10 relative"
    >
      <div className="max-w-2xl">
        <img
          src="/logo.gif"
          alt="Kyan Bosman"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-8 shadow-lg border-2 border-black filter grayscale"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
          Kyan Bosman
        </h1>
        <p className="text-xl text-neutral-700 mb-8">{displayedAge} jaar</p>
      </div>

      {/* Scroll down arrow - conditionally rendered */}
      {showScrollArrow && (
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer transition-opacity duration-300"
          onClick={() => onNavigate('music')}
          aria-label="Scroll to music section"
        >
          <FaChevronDown className="text-black text-3xl sm:text-4xl hover:text-neutral-600 transition-colors duration-300 animate-bounce" />
        </div>
      )}
    </section>
  );
};

const SectionNL = ({ id, title, children }) => {
  return (
    <section id={id} className="fade-in-1s">
      <div className="mx-auto max-w-3xl">
        {" "}
        {/* Max-width for readability */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-black">
          {" "}
          {/* Increased bottom margin, Added font-dancing-script */}
          {title}
        </h2>
        <div className="space-y-6 text-md text-neutral-800 leading-relaxed text-left md:text-justify">
          {" "}
          {/* Slightly smaller text, darker gray, justify option */}
          {children}
        </div>
      </div>
    </section>
  );
};

const ContactNL = ({ id }) => {
  return (
    <section id={id} className="py-10">
      {" "}
      {/* Padding for spacing from footer */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-black">
          Neem Contact Op
        </h2>
        <p className="text-md text-neutral-700 mb-10 leading-relaxed">
          Heb je een vraag, een interessant idee, of wil je gewoon hallo zeggen?
          Ik hoor graag van je!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a
            href="mailto:contact@kyan.space"
            className="px-7 py-2.5 border border-black text-black font-medium transform hover:bg-black hover:text-white transition-all duration-300 shadow-sm text-md"
          >
            Stuur een E-mail
          </a>
          <a
            href="https://www.linkedin.com/in/kyan-bosman-162507281/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-2.5 border border-black text-black font-medium transform hover:bg-black hover:text-white transition-all duration-300 shadow-sm text-md inline-flex items-center gap-2"
          >
            LinkedIn <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
};

const FooterNL = () => {
  return (
    <footer className="py-12 text-center">
      <p className="text-neutral-500 hover:text-black transition-colors duration-300 text-xs">
        © {new Date().getFullYear()} Kyan Bosman. Alle rechten voorbehouden.
      </p>
    </footer>
  );
};

const MusicNL = ({ id }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [loadingTopArtists, setLoadingTopArtists] = useState(true);
  const [errorTopArtists, setErrorTopArtists] = useState(null);
  const [showAllArtists, setShowAllArtists] = useState(false);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [loadingCurrentTrack, setLoadingCurrentTrack] = useState(true);
  const [errorCurrentTrack, setErrorCurrentTrack] = useState(null);
  const [displayProgressMs, setDisplayProgressMs] = useState(0);

  const songEndTimeoutRef = useRef(null);
  const periodicFetchIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null); 

  const formatDuration = (ms) => {
    if (typeof ms !== 'number' || ms < 0) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        setLoadingTopArtists(true);
        const response = await fetch("https://api.stats.fm/api/v1/users/rk714ki8lrrqb4a5f6ck35f52/top/artists?range=weeks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTopArtists(data.items ? data.items.slice(0, 9) : []);
      } catch (e) {
        console.error("Failed to fetch top artists:", e);
        setErrorTopArtists(e.message);
      } finally {
        setLoadingTopArtists(false);
      }
    };

    fetchTopArtists();
  }, []); 

  useEffect(() => {
    const fetchTrackData = async (isBackgroundRefresh = false) => {
      let wasInitialLoad = false;
      if (!isBackgroundRefresh && !currentTrack) {
        setLoadingCurrentTrack(true);
        wasInitialLoad = true;
      }
      setErrorCurrentTrack(null);

      if (songEndTimeoutRef.current) clearTimeout(songEndTimeoutRef.current);

      try {
        const userId = "rk714ki8lrrqb4a5f6ck35f52";
        const currentApiUrl = `https://api.stats.fm/api/v1/users/${userId}/streams/current`;
        const currentResponse = await fetch(currentApiUrl);

        if (currentResponse.ok) {
          const currentData = await currentResponse.json();
          if (currentData && currentData.item && currentData.item.isPlaying) {
            setCurrentTrack({ ...currentData.item, isRecent: false });
            setDisplayProgressMs(currentData.item.progressMs);
            const timeRemaining = currentData.item.track.durationMs - currentData.item.progressMs;
            if (timeRemaining > 0) {
              songEndTimeoutRef.current = setTimeout(() => fetchTrackData(true), timeRemaining + 1000);
            }
            if (wasInitialLoad) setLoadingCurrentTrack(false);
            return;
          }
        } else if (currentResponse.status !== 204) {
          console.warn(`Current track API non-OK status: ${currentResponse.status}`);
        }

        const recentApiUrl = `https://api.stats.fm/api/v1/users/${userId}/streams/recent`;
        const recentResponse = await fetch(recentApiUrl);
        if (recentResponse.ok) {
          const recentData = await recentResponse.json();
          if (recentData && recentData.items && recentData.items.length > 0) {
            const recentStream = recentData.items[0];
            setCurrentTrack({
              track: recentStream.track,
              isRecent: true,
              endTime: recentStream.endTime, 
            });
            setDisplayProgressMs(0); 
          } else {
            setCurrentTrack(null); 
          }
        } else {
          console.warn(`Recent track API non-OK status: ${recentResponse.status}`);
          setCurrentTrack(null); 
        }
      } catch (e) {
        console.error("Failed to fetch track data:", e);
        setErrorCurrentTrack(e.message);
        setCurrentTrack(null);
      } finally {
        if (wasInitialLoad) {
          setLoadingCurrentTrack(false);
        }
      }
    };

    fetchTrackData();
    periodicFetchIntervalRef.current = setInterval(() => fetchTrackData(true), 30000);

    return () => {
      if (periodicFetchIntervalRef.current) clearInterval(periodicFetchIntervalRef.current);
      if (songEndTimeoutRef.current) clearTimeout(songEndTimeoutRef.current);
    };
  }, []); 

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current); 
    }

    if (currentTrack && !currentTrack.isRecent && currentTrack.isPlaying && currentTrack.track && currentTrack.track.durationMs > 0) {
      progressIntervalRef.current = setInterval(() => {
        setDisplayProgressMs(prevProgress => {
          const newProgress = prevProgress + 1000;
          if (newProgress >= currentTrack.track.durationMs) {
            clearInterval(progressIntervalRef.current);
            return currentTrack.track.durationMs;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentTrack]); 

  const displayedArtists = showAllArtists ? topArtists : topArtists.slice(0, 3);

  let trackStatusTitle = "Muziek"; 
  if (loadingCurrentTrack) {
    trackStatusTitle = "Huidig nummer laden...";
  } else if (currentTrack) {
    if (!currentTrack.isRecent && currentTrack.isPlaying) {
      trackStatusTitle = "Momenteel aan het Luisteren";
    } else if (currentTrack.isRecent) {
      trackStatusTitle = "Laatst Geluisterd";
    }
  } else if (!errorCurrentTrack) {
      trackStatusTitle = "Momenteel niets via Spotify geluisterd";
  }

  return (
    <section id={id} className="py-16 fade-in-1s">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-black font-dancing-script">
          Muziek
        </h2>
        
        {/* Currently Playing Section */}
        <div className="mb-16 p-6 border border-neutral-300 rounded-lg shadow-lg bg-neutral-50 min-h-[200px]"> {/* Adjusted min-height for time display */}
          <h3 className="text-2xl font-semibold text-black mb-4 font-handwriting-artist">
            {errorCurrentTrack ? "Fout bij Laden" : trackStatusTitle}
          </h3>

          {loadingCurrentTrack && !currentTrack && <p className="text-neutral-600">Huidig nummer laden...</p>} {/* Show only if truly loading initially */}
          {errorCurrentTrack && <p className="text-red-500">{errorCurrentTrack}</p>}
          
          {!loadingCurrentTrack && !errorCurrentTrack && currentTrack && currentTrack.track && (
            <div className="text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {currentTrack.track.albums && currentTrack.track.albums[0] && currentTrack.track.albums[0].image && (
                  <img src={currentTrack.track.albums[0].image} alt={currentTrack.track.albums[0].name || 'Album art'} className="w-24 h-24 rounded-md shadow-md object-cover flex-shrink-0"/>
                )}
                <div className="flex-grow w-full overflow-hidden">
                  <p className="text-xl font-bold text-black truncate" title={currentTrack.track.name}>{currentTrack.track.name}</p>
                  <p className="text-md text-neutral-700 truncate" title={currentTrack.track.artists.map(artist => artist.name).join(', ')}>
                    {currentTrack.track.artists.map(artist => artist.name).join(', ')}
                  </p>
                  {currentTrack.track.albums && currentTrack.track.albums[0] && (
                    <p className="text-sm text-neutral-500 truncate" title={currentTrack.track.albums[0].name}>Album: {currentTrack.track.albums[0].name}</p>
                  )}
                  {currentTrack.isRecent && currentTrack.endTime && (
                     <p className="text-xs text-neutral-500 mt-1">Geluisterd op: {new Date(currentTrack.endTime).toLocaleDateString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</p>
                  )}
                </div>
              </div>
              {/* Progress Bar and Time - only for currently playing tracks */}
              {currentTrack && !currentTrack.isRecent && currentTrack.isPlaying && (
                <>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-black h-2 rounded-full transition-width duration-1000 ease-linear"
                      style={{ width: `${(displayProgressMs / currentTrack.track.durationMs) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1 flex justify-between">
                    <span>{formatDuration(displayProgressMs)}</span>
                    <span>{formatDuration(currentTrack.track.durationMs)}</span>
                  </div>
                </>
              )}
            </div>
          )}
          {!loadingCurrentTrack && !errorCurrentTrack && !currentTrack && (
            <p className="text-neutral-500 pt-4">Geen luisteractiviteit gevonden.</p> 
          )}
        </div>

        {/* Top Artists Title */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-black font-dancing-script">
          Top Artiesten (Afgelopen Maand)
        </h3>
        {loadingTopArtists && <p className="text-neutral-600">Top artiesten aan het laden...</p>}
        {errorTopArtists && <p className="text-red-500">Fout bij laden artiesten: {errorTopArtists}</p>}

        {/* Artists Grid */}
        {!loadingTopArtists && !errorTopArtists && topArtists.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-8 text-left"> {/* Reduced mb for button */}
              {displayedArtists.map((item, index) => (
                <div key={item.artist.id || index} className="music-artist-card flex flex-col items-center p-6 border border-neutral-200 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                  {/* Artist Rank */}
                  <div className="absolute top-3 left-3 text-xs font-semibold text-neutral-500 bg-white bg-opacity-75 px-0.5 py-0.5 rounded">
                    #{index + 1}
                  </div>
                  {item.artist.image && (
                    <img src={item.artist.image} alt={item.artist.name} className="w-24 h-24 rounded-full mb-4 shadow-md object-cover" />
                  )}
                  <h3 className="text-2xl font-semibold text-black mb-2 font-handwriting-artist text-center">
                    {item.artist.name}
                  </h3>
                  <p className="text-sm text-neutral-700 mb-4 text-center">
                    {item.artist.genres && item.artist.genres.length > 0 ? item.artist.genres.join(', ') : 'Genre onbekend'}
                  </p>
                  {item.artist.externalIds && item.artist.externalIds.spotify && item.artist.externalIds.spotify[0] && (
                    <a 
                      href={`https://open.spotify.com/artist/${item.artist.externalIds.spotify[0]}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-auto text-sm text-black hover:text-neutral-600 font-medium transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    >
                      Ontdek op Spotify 
                      <FaExternalLinkAlt className="text-xs group-hover:text-neutral-900 transition-colors" />
                    </a>
                  )}
                </div>
              ))}
            </div>
            {/* Show More/Less Button for Artists */}
            {topArtists.length > 3 && (
              <button
                onClick={() => setShowAllArtists(!showAllArtists)}
                className="mt-4 px-6 py-2.5 border border-neutral-400 text-neutral-700 font-medium hover:border-black hover:text-black transition-all duration-300 shadow-sm text-sm rounded-md"
              >
                {showAllArtists ? 'Toon minder' : `Toon meer (${topArtists.length - 3} extra)`}
              </button>
            )}
          </>
        )}
        {!loadingTopArtists && !errorTopArtists && topArtists.length === 0 && (
          <p className="text-neutral-600">Geen top artiesten gevonden voor deze periode.</p>
        )}
      </div>
    </section>
  );
};

// --- Hoofd Pagina Component ---
export default function NLPage() {
  const sectionRefs = {
    "hero-nl": useRef(null),
    "wie-ben-ik": useRef(null),
    studie: useRef(null),
    toekomst: useRef(null),
    music: useRef(null), 
    contact: useRef(null),
  };

  const handleNavigation = (sectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    // Main wrapper for the entire page content
    <div className="min-h-screen bg-white text-black font-sans relative">
      {/* New L-shape Frame Corners */}
      <div className="frame-corner top-left"></div>
      <div className="frame-corner top-right"></div>
      <div class="frame-corner bottom-left"></div>
      <div class="frame-corner bottom-right"></div>
      {/* Content wrapper with padding to avoid overlap with frame corners */}
      {/* Apply the main-content-wrapper class for mobile padding adjustment */}
      <div className="main-content-wrapper container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-10 md:py-16">
        <NavbarNL onNavigate={handleNavigation} />

        <main>
          <div ref={sectionRefs["hero-nl"]}>
            <HeroNL onNavigate={handleNavigation} />
          </div>

          {/* Placeholder for Wie ben ik section - assuming you'll add it similarly */}
          {/* <div ref={sectionRefs["wie-ben-ik"]}> */}
          {/*   <SectionNL id="wie-ben-ik" title="Wie Ben Ik?"> */}
          {/*     <p>Content about who you are...</p> */}
          {/*   </SectionNL> */}
          {/* </div> */}

          {/* Placeholder for Studie section */}
          {/* <div ref={sectionRefs["studie"]}> */}
          {/*  <SectionNL id="studie" title="Studie & Ontwikkeling"> */}
          {/*    <p>Content about your studies...</p> */}
          {/*  </SectionNL> */}
          {/* </div> */}

          {/* Placeholder for Toekomst section */}
          {/* <div ref={sectionRefs["toekomst"]}> */}
          {/*  <SectionNL id="toekomst" title="Visie voor de Toekomst"> */}
          {/*    <p>Content about your future vision...</p> */}
          {/*  </SectionNL> */}
          {/* </div> */}

          <div ref={sectionRefs["music"]}>
            <MusicNL id="music" />
          </div>
        </main>

        <FooterNL />
      </div>{" "}
      {/* End of main-content-wrapper */}
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
