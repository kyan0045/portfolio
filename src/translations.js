import { useLanguage } from "./contexts/LanguageContext";

export const translations = {
  nl: {
    // Navigation
    nav: {
      home: "over mij",
      music: "muziek",
      library: "bibliotheek",
      photos: "foto's",
      portfolio: "portfolio",
    },

    // Home/About page
    about: {
      title: "Over Mij",
      content: "Hoi! Ik ben Kyan Bosman en ik ben ",
      ageText: " jaar oud.",
      restOfContent:
        "Als je dit leest heb je mijn website bereikt, hoe je hier gekomen bent? Dat is mij een raadsel... Maar goed, als je wat over mij wilt weten, dan is dit natuurlijk een goed begin! Op deze site staan wat dingen over de muziek die ik luister en de (digitale) content die ik opslok (tenminste, mits ik deze heb toegevoegd...): series, films, boeken, maar ook poëzie :D",
    },

    // Music page
    music: {
      title: "Muziek",
      loading: "Muziek laden...",
      error: "Fout bij het laden van muziek",
      currentlyPlaying: "Momenteel aan het Luisteren",
      lastListened: "Laatst Geluisterd",
      notListening: "Momenteel niets via Spotify geluisterd",
      loadingTrack: "Huidig nummer laden...",
      errorLoading: "Fout bij Laden",
      topArtists: "Top Artiesten",
      topTracks: "Top Nummers",
      totalStats: "Totale Statistieken",
      totalStreams: "Totale Streams",
      totalListeningTime: "Totale Luistertijd",
      discoverOnSpotify: "Ontdek op Spotify",
      listenOnSpotify: "Luister op Spotify",
      showMore: "Toon meer",
      showAll: "Toon alles",
      showLess: "Toon minder",
      loadingArtists: "Top artiesten aan het laden...",
      loadingTracks: "Top nummers aan het laden...",
      noActivity: "Geen luisteractiviteit gevonden.",
      noArtistsFound: "Geen artiesten gevonden voor deze periode.",
      noTracksFound: "Geen nummers gevonden voor deze periode.",
      listenedOn: "Geluisterd op:",
      streams: "streams",
      listened: "geluisterd",
      unknownGenre: "Genre onbekend",
      unknownArtist: "Artiest onbekend",
      album: "Album:",
      timePeriods: {
        days: "Vandaag",
        week: "Deze Week",
        weeks: "Afgelopen Maand",
        years: "Dit Jaar",
        lifetime: "Altijd",
      },
    }, // Library page
    library: {
      title: "Bibliotheek",
      tabs: {
        series: "Series & Films",
        books: "Boeken",
        poetry: "Poëzie",
      },
      sort: {
        recent: "Recent",
        watched: "Gezien",
        read: "Gelezen",
        rating: "Mijn Beoordeling",
        title: "Titel (A-Z)",
      },
      finished: {
        series: "Afgerond op",
        film: "Gezien op",
        book: "Gelezen op",
      },
    },

    // Photos page
    photos: {
      title: "Foto's",
      loading: "Foto's laden...",
      error: "Fout bij het laden van foto's",
      close: "Sluiten",
    },

    // Portfolio page
    portfolio: {
      title: "Portfolio",
      subtitle:
        "Een overzicht van mijn creatieve projecten - van websites en code tot gedichten en designs.",
      categories: {
        all: "Alles",
        websites: "Websites",
        code: "Code",
        poems: "Gedichten",
        design: "Design",
      },
      projects: {
        portfolioWebsite: {
          title: "Portfolio Website",
          description: "Deze website! - gebouwd met React en Tailwind CSS",
        },
        githubProfile: {
          title: "GitHub Profiel",
          description: "Mijn projecten en community-bijdragen",
        },
        catchTwo: {
          title: "CatchTwo",
          description:
            "Een innovatieve oplossing voor de automatisering van taken betreffende de Pokétwo bot op Discord",
        },
      },
      viewProject: "Bekijk project",
      emptyState: "Geen creaties gevonden in deze categorie.",
      emptyStateSubtext:
        "Probeer een andere categorie of kom later terug voor nieuwe projecten.",
      comingSoon: "Meer komt eraan...",
      comingSoonText:
        "Ik werk altijd aan nieuwe projecten. Check regelmatig terug voor updates!",
    },

    // Common
    common: {
      loading: "Laden...",
      error: "Er is een fout opgetreden",
      close: "Sluiten",
      viewMore: "Meer bekijken",
    },

    // Footer
    footer: {
      copyright: "Alle rechten voorbehouden.",
      imageCopyright:
        "De auteursrechtelijke rechten betreffende gebruikte foto's liggen bij de respectieve eigenaren.",
    },
  },

  en: {
    // Navigation
    nav: {
      home: "about me",
      music: "music",
      library: "library",
      photos: "photos",
      portfolio: "portfolio",
    },

    // Home/About page
    about: {
      title: "About Me",
      content: "Hi! I am Kyan Bosman and I am ",
      ageText: " years old.",
      restOfContent:
        "If you're reading this, you've reached my website. How you got here? That's a mystery to me... But anyway, if you want to know something about me, this is naturally a good start! On this site you'll find things about the music I listen to and the (digital) content I consume: series, films, books, but also poetry :D",
    },

    // Music page
    music: {
      title: "Music",
      loading: "Loading music...",
      error: "Error loading music",
      currentlyPlaying: "Currently Listening",
      lastListened: "Last Listened",
      notListening: "Currently not listening via Spotify",
      loadingTrack: "Loading current track...",
      errorLoading: "Error Loading",
      topArtists: "Top Artists",
      topTracks: "Top Tracks",
      totalStats: "Total Statistics",
      totalStreams: "Total Streams",
      totalListeningTime: "Total Listening Time",
      discoverOnSpotify: "Discover on Spotify",
      listenOnSpotify: "Listen on Spotify",
      showMore: "Show more",
      showAll: "Show all",
      showLess: "Show less",
      loadingArtists: "Loading top artists...",
      loadingTracks: "Loading top tracks...",
      noActivity: "No listening activity found.",
      noArtistsFound: "No artists found for this period.",
      noTracksFound: "No tracks found for this period.",
      listenedOn: "Listened on:",
      streams: "streams",
      listened: "listened",
      unknownGenre: "Unknown genre",
      unknownArtist: "Unknown artist",
      album: "Album:",
      timePeriods: {
        days: "Today",
        week: "This Week",
        weeks: "Past Month",
        years: "This Year",
        lifetime: "All Time",
      },
    },

    // Library page
    library: {
      title: "Library",
      tabs: {
        series: "Series & Films",
        books: "Books",
        poetry: "Poetry",
      },
      sort: {
        recent: "Recently",
        watched: "Watched",
        read: "Read",
        rating: "My Rating",
        title: "Title (A-Z)",
      },
      finished: {
        series: "Finished on",
        film: "Watched on",
        book: "Read on",
      },
    },

    // Photos page
    photos: {
      title: "Photos",
      loading: "Loading photos...",
      error: "Error loading photos",
      close: "Close",
    },

    // Portfolio page
    portfolio: {
      title: "Portfolio",
      subtitle:
        "An overview of my creative projects - from websites and code to poems and designs.",
      categories: {
        all: "All",
        websites: "Websites",
        code: "Code",
        poems: "Poems",
        design: "Design",
      },
      projects: {
        portfolioWebsite: {
          title: "Portfolio Website",
          description: "This website! - built with React and Tailwind CSS",
        },
        githubProfile: {
          title: "GitHub Profile",
          description: "My projects and community contributions",
        },
        catchTwo: {
          title: "CatchTwo",
          description:
            "An innovative solution for automating tasks related to the Pokétwo bot on Discord",
        },
      },
      viewProject: "View project",
      emptyState: "No creations found in this category.",
      emptyStateSubtext:
        "Try a different category or come back later for new projects.",
      comingSoon: "More coming soon...",
      comingSoonText:
        "I'm always working on new projects. Check back regularly for updates!",
    },

    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred",
      close: "Close",
      viewMore: "View more",
    },

    // Footer
    footer: {
      copyright: "All rights reserved.",
      imageCopyright:
        "The copyright regarding used photos belongs to the respective owners.",
    },
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t };
};
