import React, { useState, useEffect, useRef } from "react";
import "../NL.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "../translations";

const MusicNL = () => {
  const { t } = useTranslation();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loadingTopArtists, setLoadingTopArtists] = useState(true);
  const [errorTopArtists, setErrorTopArtists] = useState(null);
  const [displayCount, setDisplayCount] = useState(3); // 3 for initial, 9 for medium, 50 for all
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("weeks");
  const [viewType, setViewType] = useState("artists"); // 'artists' or 'tracks'

  const [currentTrack, setCurrentTrack] = useState(null);
  const [loadingCurrentTrack, setLoadingCurrentTrack] = useState(true);
  const [errorCurrentTrack, setErrorCurrentTrack] = useState(null);
  const [displayProgressMs, setDisplayProgressMs] = useState(0);

  const songEndTimeoutRef = useRef(null);
  const periodicFetchIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const timePeriods = [
    {
      value: "days",
      label: t("music.timePeriods.days"),
      displayLabel: t("music.timePeriods.days"),
    },
    {
      value: "week",
      label: t("music.timePeriods.week"),
      displayLabel: t("music.timePeriods.week"),
    },
    {
      value: "weeks",
      label: t("music.timePeriods.weeks"),
      displayLabel: t("music.timePeriods.weeks"),
    },
    {
      value: "years",
      label: t("music.timePeriods.years"),
      displayLabel: t("music.timePeriods.years"),
    },
    {
      value: "lifetime",
      label: t("music.timePeriods.lifetime"),
      displayLabel: t("music.timePeriods.lifetime"),
    },
  ];

  const getApiUrlForTimePeriod = (type, period) => {
    const baseUrl = `https://api.stats.fm/api/v1/users/rk714ki8lrrqb4a5f6ck35f52`;

    const endpoint =
      type === "stats"
        ? "streams/stats"
        : type === "artists"
          ? "top/artists"
          : "top/tracks";
    const limitParam =
      type === "artists" || type === "tracks" ? "&limit=50" : "";
    const now = new Date();
    const timeZone = "Europe/Amsterdam";

    switch (period) {
      case "days": {
        // Today - start of today to end of today
        const startOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const endOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59,
          999
        );
        return `${baseUrl}/${endpoint}?after=${startOfDay.getTime()}&before=${endOfDay.getTime()}&timeZone=${timeZone}${limitParam}`;
      }
      case "week": {
        // This week - start of Monday to end of Sunday
        const dayOfWeek = now.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday = 0, so offset -6; Monday = 1, so offset 0
        const startOfWeek = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + mondayOffset
        );
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return `${baseUrl}/${endpoint}?after=${startOfWeek.getTime()}&before=${endOfWeek.getTime()}&timeZone=${timeZone}${limitParam}`;
      }
      case "weeks": {
        // Last 4 weeks (last month)
        return `${baseUrl}/${endpoint}?range=weeks${limitParam}`;
      }
      case "years": {
        // This year - January 1st to December 31st
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        return `${baseUrl}/${endpoint}?after=${startOfYear.getTime()}&before=${endOfYear.getTime()}&timeZone=${timeZone}${limitParam}`;
      }
      case "lifetime": {
        // All time
        return `${baseUrl}/${endpoint}?range=lifetime${limitParam}`;
      }
      default:
        return `${baseUrl}/${endpoint}?range=weeks${limitParam}`;
    }
  };

  // Cache management functions
  const getCacheKey = (type, period) => `musicData_${type}_${period}`;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const getCachedData = (type, period) => {
    try {
      const cacheKey = getCacheKey(type, period);
      const cached = sessionStorage.getItem(cacheKey);
      if (!cached) return null;

      const parsedCache = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - parsedCache.timestamp > CACHE_DURATION) {
        sessionStorage.removeItem(cacheKey);
        return null;
      }

      return parsedCache.data;
    } catch (error) {
      console.warn("Error reading from cache:", error);
      return null;
    }
  };
  const setCachedData = (type, period, data) => {
    try {
      const cacheKey = getCacheKey(type, period);
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn("Error writing to cache:", error);
    }
  };

  const formatDuration = (ms) => {
    if (typeof ms !== "number" || ms < 0) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const formatPlayedTime = (ms) => {
    if (typeof ms !== "number" || ms < 0) return "0 min";
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}u ${minutes}m`;
    }
    return `${minutes} min`;
  };

  const formatTotalPlayedTime = (ms) => {
    if (typeof ms !== "number" || ms < 0) return "0 minuten";
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = totalMinutes % 60;

    const parts = [];
    if (days > 0) parts.push(`${days} dag${days !== 1 ? "en" : ""}`);
    if (remainingHours > 0) parts.push(`${remainingHours} uur`);
    if (remainingMinutes > 0 || parts.length === 0)
      parts.push(`${remainingMinutes} min`);

    return parts.join(", ");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTopArtists(true);
        setErrorTopArtists(null);

        // Check cache first for both stats and main data
        const cachedStats = getCachedData("stats", selectedTimePeriod);
        const cachedMainData = getCachedData(viewType, selectedTimePeriod);

        // If we have both cached, use them
        if (cachedStats && cachedMainData) {
          setStatsData(cachedStats);
          if (viewType === "artists") {
            setTopArtists(cachedMainData);
            setTopTracks([]);
          } else {
            setTopTracks(cachedMainData);
            setTopArtists([]);
          }
          setLoadingTopArtists(false);
          return;
        }
        // Fetch stats for total statistics with proper time period parameters
        let statsResult = cachedStats;
        if (!cachedStats) {
          const statsUrl = getApiUrlForTimePeriod("stats", selectedTimePeriod);
          try {
            const statsResponse = await fetch(statsUrl);
            if (statsResponse.ok) {
              const statsData = await statsResponse.json();
              statsResult = statsData.items || statsData || null;
              setCachedData("stats", selectedTimePeriod, statsResult);
            } else {
              console.warn("Stats endpoint failed:", statsResponse.status);
              statsResult = null;
            }
          } catch (statsError) {
            console.warn("Failed to fetch stats:", statsError);
            statsResult = null;
          }
        }
        setStatsData(statsResult);

        // Fetch top artists or tracks based on viewType
        let mainData = cachedMainData;
        if (!cachedMainData) {
          const apiUrl = getApiUrlForTimePeriod(viewType, selectedTimePeriod);
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          mainData = data.items || [];
          setCachedData(viewType, selectedTimePeriod, mainData);
        }

        if (viewType === "artists") {
          setTopArtists(mainData);
          setTopTracks([]); // Clear tracks when viewing artists
        } else {
          setTopTracks(mainData);
          setTopArtists([]); // Clear artists when viewing tracks
        }
      } catch (e) {
        console.error("Failed to fetch data:", e);
        setErrorTopArtists(e.message);
      } finally {
        setLoadingTopArtists(false);
      }
    };

    fetchData();
    // Reset display count when filters change
    setDisplayCount(3);
  }, [selectedTimePeriod, viewType]);

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
            const timeRemaining =
              currentData.item.track.durationMs - currentData.item.progressMs;
            if (timeRemaining > 0) {
              songEndTimeoutRef.current = setTimeout(
                () => fetchTrackData(true),
                timeRemaining + 1000
              );
            }
            if (wasInitialLoad) setLoadingCurrentTrack(false);
            return;
          }
        } else if (currentResponse.status !== 204) {
          console.warn(
            `Current track API non-OK status: ${currentResponse.status}`
          );
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
          console.warn(
            `Recent track API non-OK status: ${recentResponse.status}`
          );
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
    periodicFetchIntervalRef.current = setInterval(
      () => fetchTrackData(true),
      30000
    );

    return () => {
      if (periodicFetchIntervalRef.current)
        clearInterval(periodicFetchIntervalRef.current);
      if (songEndTimeoutRef.current) clearTimeout(songEndTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (
      currentTrack &&
      !currentTrack.isRecent &&
      currentTrack.isPlaying &&
      currentTrack.track &&
      currentTrack.track.durationMs > 0
    ) {
      progressIntervalRef.current = setInterval(() => {
        setDisplayProgressMs((prevProgress) => {
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
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [currentTrack]);

  const currentData = viewType === "artists" ? topArtists : topTracks;
  const displayedItems = currentData.slice(0, displayCount);

  let trackStatusTitle = t("music.title");
  if (loadingCurrentTrack) {
    trackStatusTitle = t("music.loadingTrack");
  } else if (currentTrack) {
    if (!currentTrack.isRecent && currentTrack.isPlaying) {
      trackStatusTitle = t("music.currentlyPlaying");
    } else if (currentTrack.isRecent) {
      trackStatusTitle = t("music.lastListened");
    }
  } else if (!errorCurrentTrack) {
    trackStatusTitle = t("music.notListening");
  }

  return (
    <section id="muziek" className="pt-32 pb-16 md:py-16 fade-in-1s">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-black font-dancing-script">
          {t("music.title")}
        </h1>
        {/* Currently Playing Section */}
        <div className="mb-16 p-6 border border-neutral-300 rounded-lg shadow-lg bg-neutral-50 min-h-[200px]">
          {" "}
          {/* Adjusted min-height for time display */}
          <h3 className="text-2xl font-semibold text-black mb-4 font-handwriting-artist">
            {errorCurrentTrack ? t("music.errorLoading") : trackStatusTitle}
          </h3>
          {loadingCurrentTrack && !currentTrack && (
            <p className="text-neutral-600">{t("music.loadingTrack")}</p>
          )}{" "}
          {/* Show only if truly loading initially */}
          {errorCurrentTrack && (
            <p className="text-red-500">{errorCurrentTrack}</p>
          )}
          {!loadingCurrentTrack &&
            !errorCurrentTrack &&
            currentTrack &&
            currentTrack.track && (
              <div className="text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {currentTrack.track.albums &&
                    currentTrack.track.albums[0] &&
                    currentTrack.track.albums[0].image && (
                      <img
                        src={currentTrack.track.albums[0].image}
                        alt={currentTrack.track.albums[0].name || "Album art"}
                        className="w-24 h-24 rounded-md shadow-md object-cover flex-shrink-0"
                      />
                    )}
                  <div className="flex-grow w-full overflow-hidden">
                    <p
                      className="text-xl font-bold text-black truncate"
                      title={currentTrack.track.name}
                    >
                      {currentTrack.track.name}
                    </p>
                    <p
                      className="text-md text-neutral-700 truncate"
                      title={currentTrack.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    >
                      {currentTrack.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                    {currentTrack.track.albums &&
                      currentTrack.track.albums[0] && (
                        <p
                          className="text-sm text-neutral-500 truncate"
                          title={currentTrack.track.albums[0].name}
                        >
                          {t("music.album")} {currentTrack.track.albums[0].name}
                        </p>
                      )}
                    {currentTrack.isRecent && currentTrack.endTime && (
                      <p className="text-xs text-neutral-500 mt-1">
                        {t("music.listenedOn")}{" "}
                        {new Date(currentTrack.endTime).toLocaleDateString(
                          "nl-NL",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    )}
                  </div>
                </div>
                {/* Progress Bar and Time - only for currently playing tracks */}
                {currentTrack &&
                  !currentTrack.isRecent &&
                  currentTrack.isPlaying && (
                    <>
                      <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
                        <div
                          className="bg-black h-2 rounded-full transition-width duration-1000 ease-linear"
                          style={{
                            width: `${
                              (displayProgressMs /
                                currentTrack.track.durationMs) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 flex justify-between">
                        <span>{formatDuration(displayProgressMs)}</span>
                        <span>
                          {formatDuration(currentTrack.track.durationMs)}
                        </span>
                      </div>
                    </>
                  )}
              </div>
            )}
          {!loadingCurrentTrack && !errorCurrentTrack && !currentTrack && (
            <p className="text-neutral-500 pt-4">{t("music.noActivity")}</p>
          )}
        </div>{" "}
        {/* Top Artists/Tracks Title with Toggle and Time Period Selector */}
        <div className="mb-10 flex flex-col items-center gap-6">
          {/* View Type Toggle */}
          <div className="flex bg-neutral-100 rounded-lg p-1 border border-neutral-200">
            <button
              onClick={() => setViewType("artists")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                viewType === "artists"
                  ? "bg-black text-white shadow-md"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              {t("music.topArtists")}
            </button>
            <button
              onClick={() => setViewType("tracks")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                viewType === "tracks"
                  ? "bg-black text-white shadow-md"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              {t("music.topTracks")}
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-black font-dancing-script">
              {viewType === "artists"
                ? t("music.topArtists")
                : t("music.topTracks")}{" "}
              (
              {
                timePeriods.find((tp) => tp.value === selectedTimePeriod)
                  ?.displayLabel
              }
              )
            </h3>
          </div>

          {/* Time Period Selector */}
          <div className="flex flex-wrap justify-center gap-2">
            {timePeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedTimePeriod(period.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  selectedTimePeriod === period.value
                    ? "bg-black text-white shadow-md"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>{" "}
        {/* Total Statistics */}
        {!loadingTopArtists && !errorTopArtists && currentData.length > 0 && (
          <div className="mb-10 p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 border border-neutral-200 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-black mb-4 text-center">
              {t("music.totalStats")}
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-100">
                <p className="text-2xl font-bold text-black mb-1">
                  {(
                    statsData?.count || statsData?.items?.count
                  )?.toLocaleString("nl-NL") || "0"}
                </p>
                <p className="text-sm text-neutral-600">
                  {t("music.totalStreams")}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-100">
                <p className="text-2xl font-bold text-black mb-1">
                  {formatTotalPlayedTime(
                    statsData?.playedMs?.sum ||
                      statsData?.items?.playedMs?.sum ||
                      0
                  )}
                </p>
                <p className="text-sm text-neutral-600">
                  {t("music.totalListeningTime")}
                </p>
              </div>
            </div>
          </div>
        )}
        {loadingTopArtists && (
          <p className="text-neutral-600">
            {viewType === "artists"
              ? t("music.loadingArtists")
              : t("music.loadingTracks")}
          </p>
        )}
        {errorTopArtists && (
          <p className="text-red-500">
            Fout bij laden {viewType === "artists" ? "artiesten" : "nummers"}:{" "}
            {errorTopArtists}
          </p>
        )}{" "}
        {/* Content Grid */}
        {!loadingTopArtists && !errorTopArtists && currentData.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-8 text-left">
              {displayedItems.map((item, index) => (
                <div
                  key={
                    viewType === "artists"
                      ? item.artist?.id || index
                      : item.track?.id || index
                  }
                  className="music-artist-card flex flex-col items-center p-6 border border-neutral-200 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Rank */}
                  <div className="absolute top-3 left-3 text-xs font-semibold text-neutral-500 bg-white bg-opacity-75 px-0.5 py-0.5 rounded">
                    #{index + 1}
                  </div>

                  {viewType === "artists" ? (
                    // Artist Card Content
                    <>
                      {item.artist?.image && (
                        <img
                          src={item.artist.image}
                          alt={item.artist.name}
                          className="w-24 h-24 rounded-full mb-4 shadow-md object-cover"
                        />
                      )}
                      <h3 className="text-2xl font-semibold text-black mb-2 font-handwriting-artist text-center">
                        {item.artist?.name}
                      </h3>
                      <p className="text-sm text-neutral-700 mb-2 text-center">
                        {item.artist?.genres && item.artist.genres.length > 0
                          ? item.artist.genres.join(", ")
                          : t("music.unknownGenre")}
                      </p>

                      {/* Streams and Time Listened */}
                      <div className="text-xs text-neutral-600 mb-4 text-center space-y-1">
                        {item.streams && (
                          <p>
                            {item.streams.toLocaleString("nl-NL")}{" "}
                            {t("music.streams")}
                          </p>
                        )}
                        {item.playedMs && (
                          <p>
                            {formatPlayedTime(item.playedMs)}{" "}
                            {t("music.listened")}
                          </p>
                        )}
                      </div>

                      {item.artist?.externalIds?.spotify?.[0] && (
                        <a
                          href={`https://open.spotify.com/artist/${item.artist.externalIds.spotify[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto text-sm text-black hover:text-neutral-600 font-medium transition-colors duration-300 inline-flex items-center gap-1.5 group"
                        >
                          {t("music.discoverOnSpotify")}
                          <FaExternalLinkAlt className="text-xs group-hover:text-neutral-900 transition-colors" />
                        </a>
                      )}
                    </>
                  ) : (
                    // Track Card Content
                    <>
                      {item.track?.albums?.[0]?.image && (
                        <img
                          src={item.track.albums[0].image}
                          alt={item.track.albums[0].name}
                          className="w-24 h-24 rounded-md mb-4 shadow-md object-cover"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-black mb-2 font-handwriting-artist text-center">
                        {item.track?.name}
                      </h3>
                      <p className="text-sm text-neutral-700 mb-2 text-center">
                        {item.track?.artists
                          ?.map((artist) => artist.name)
                          .join(", ") || t("music.unknownArtist")}
                      </p>

                      {/* Streams and Time Listened */}
                      <div className="text-xs text-neutral-600 mb-4 text-center space-y-1">
                        {item.streams && (
                          <p>
                            {item.streams.toLocaleString("nl-NL")}{" "}
                            {t("music.streams")}
                          </p>
                        )}
                        {item.playedMs && (
                          <p>
                            {formatPlayedTime(item.playedMs)}{" "}
                            {t("music.listened")}
                          </p>
                        )}
                      </div>

                      {item.track?.externalIds?.spotify?.[0] && (
                        <a
                          href={`https://open.spotify.com/track/${item.track.externalIds.spotify[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto text-sm text-black hover:text-neutral-600 font-medium transition-colors duration-300 inline-flex items-center gap-1.5 group"
                        >
                          {t("music.listenOnSpotify")}
                          <FaExternalLinkAlt className="text-xs group-hover:text-neutral-900 transition-colors" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Show More/Less Button Logic */}
            {currentData.length > 3 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                {displayCount < currentData.length && displayCount < 50 && (
                  <button
                    onClick={() => setDisplayCount(displayCount === 3 ? 9 : 50)}
                    className="px-6 py-2.5 border border-neutral-400 text-neutral-700 font-medium hover:border-black hover:text-black transition-all duration-300 shadow-sm text-sm rounded-md"
                  >
                    {displayCount === 3
                      ? `${t("music.showMore")} (9)`
                      : `${t("music.showAll")} (${Math.min(
                          currentData.length,
                          50
                        )})`}
                  </button>
                )}
                {displayCount > 3 && (
                  <button
                    onClick={() => setDisplayCount(3)}
                    className="px-6 py-2.5 border border-neutral-400 text-neutral-700 font-medium hover:border-black hover:text-black transition-all duration-300 shadow-sm text-sm rounded-md"
                  >
                    {t("music.showLess")}
                  </button>
                )}
              </div>
            )}
          </>
        )}
        {!loadingTopArtists && !errorTopArtists && currentData.length === 0 && (
          <p className="text-neutral-600">
            {viewType === "artists"
              ? t("music.noArtistsFound")
              : t("music.noTracksFound")}
          </p>
        )}
      </div>
    </section>
  );
};

export default function NLPage() {
  return <MusicNL />;
}
