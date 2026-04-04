"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYLIST = [
  // Nujabes
  { id: "T7v6m4TvSWk", title: "Feather", artist: "Nujabes ft. Cise Starr", album: "Modal Soul", type: "nujabes" },
  { id: "3aFvHaqY2_o", title: "F.I.L.O.", artist: "Nujabes", album: "Metaphorical Music", type: "nujabes" },
  { id: "g6CgP7KSOUA", title: "Luv(sic) Part 2", artist: "Nujabes ft. Shing02", album: "Modal Soul", type: "nujabes" },
  { id: "Eg0wFGv30dY", title: "Battlecry", artist: "Nujabes ft. Shing02", album: "Samurai Champloo OST", type: "nujabes" },
  { id: "A8CyYr-NKvs", title: "Beat Laments The World", artist: "Nujabes", album: "Metaphorical Music", type: "nujabes" },
  // Bleach OST
  { id: "RhJIeWRN5rU", title: "Number One", artist: "Bleach OST", album: "Bleach Original Soundtrack", type: "bleach" },
  { id: "f0BIEgALBs8", title: "Stand Up Be Strong", artist: "Bleach OST", album: "Bleach Original Soundtrack", type: "bleach" },
  { id: "5LFFFVfYTAM", title: "Invasion", artist: "Bleach OST", album: "Bleach Original Soundtrack", type: "bleach" },
  { id: "NnXTAnJjKDs", title: "Storm Center", artist: "Bleach OST", album: "Bleach Original Soundtrack 2", type: "bleach" },
];

type Track = typeof PLAYLIST[0];

function EqBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-4" style={{ opacity: playing ? 1 : 0.3 }}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="eq-bar"
          style={{
            animationDelay: `${i * 0.12}s`,
            animationPlayState: playing ? "running" : "paused",
            height: `${8 + i * 3}px`,
          }}
        />
      ))}
    </div>
  );
}

export function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [filter, setFilter] = useState<"all" | "nujabes" | "bleach">("all");
  const playerRef = useRef<HTMLIFrameElement>(null);
  const playerReadyRef = useRef(false);

  const track = PLAYLIST[current];

  const postMessage = useCallback((action: string, value?: number) => {
    if (!playerRef.current || !playerRef.current.contentWindow) return;
    try {
      if (action === "play")  playerRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      if (action === "pause") playerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      if (action === "volume" && value !== undefined) {
        playerRef.current.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${value}]}`, '*');
      }
    } catch {}
  }, []);

  const filteredTracks = PLAYLIST.filter(t => filter === "all" || t.type === filter);

  const handleTrackSelect = (idx: number) => {
    // Find real index in PLAYLIST
    const realIdx = PLAYLIST.findIndex(t => t.id === filteredTracks[idx].id);
    setCurrent(realIdx);
    setPlaying(true);
  };

  // Auto-play when track changes
  useEffect(() => {
    if (playing) {
      const timer = setTimeout(() => postMessage("play"), 2000);
      return () => clearTimeout(timer);
    }
  }, [current, playing, postMessage]);

  const handlePlayPause = () => {
    if (playing) {
      postMessage("pause");
      setPlaying(false);
    } else {
      postMessage("play");
      setPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % PLAYLIST.length);
    setPlaying(true);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setPlaying(true);
  };

  return (
    <>
      {/* Hidden YouTube iFrame */}
      <div className="fixed bottom-0 left-0 w-0 h-0 overflow-hidden pointer-events-none" aria-hidden>
        <iframe
          ref={playerRef}
          id="yt-player"
          src={`https://www.youtube.com/embed/${track.id}?enablejsapi=1&autoplay=${playing ? 1 : 0}&controls=0&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
          allow="autoplay"
          title="music-player"
          style={{ width: 1, height: 1 }}
        />
      </div>

      {/* Floating trigger button */}
      <motion.button
        id="music-player-toggle"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 border transition-all duration-300 group"
        style={{ background: "var(--background)", borderColor: "var(--border)", boxShadow: playing ? "0 0 20px rgba(0,212,212,0.3)" : "none" }}
        aria-label="Open music player"
      >
        {/* Vinyl circle */}
        <div
          className="relative w-8 h-8 rounded-full flex-shrink-0"
          style={{
            background: "radial-gradient(circle, #1a1a22 35%, #060608 36%, #22222e 50%, #060608 51%, #22222e 65%, #060608 66%)",
            animation: playing ? "spin-slow 4s linear infinite" : "none",
            boxShadow: playing ? "0 0 12px rgba(0,212,212,0.4)" : "none",
          }}
        >
          <div className="absolute inset-0 m-auto w-2 h-2 rounded-full" style={{ background: playing ? "var(--secondary)" : "var(--muted-foreground)", margin: "auto", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </div>

        <div className="text-left">
          <div className="font-oswald text-xs uppercase tracking-widest text-foreground truncate max-w-[100px]">
            {playing ? track.title : "Nujabes"}
          </div>
          <div className="font-space-mono text-[10px] text-muted-foreground">
            {playing ? track.artist.split(" ft.")[0] : "Music Player"}
          </div>
        </div>

        <EqBars playing={playing} />
      </motion.button>

      {/* Full Player panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Player panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm border-l flex flex-col"
              style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "-4px 0 40px rgba(255,69,0,0.1)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border border-secondary flex items-center justify-center">
                    <span className="font-noto-jp text-secondary text-xs">音</span>
                  </div>
                  <span className="font-oswald uppercase tracking-widest text-xs text-foreground/60">
                    Music / Rhythm
                  </span>
                </div>
                <button
                  id="music-player-close"
                  onClick={() => setOpen(false)}
                  className="font-space-mono text-xs text-muted-foreground hover:text-primary transition-colors p-1"
                >
                  ✕
                </button>
              </div>

              {/* Now playing */}
              <div className="px-5 pt-6 pb-4">
                {/* Big vinyl */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-36 h-36 rounded-full relative"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, #2a2a35 0%, #111118 40%, #1a1a25 45%, #060608 50%, #1a1a25 55%, #111118 65%, #060608 70%)",
                      animation: playing ? "spin-slow 5s linear infinite" : "none",
                      boxShadow: playing
                        ? "0 0 0 1px rgba(0,212,212,0.3), 0 0 30px rgba(0,212,212,0.2), 0 0 60px rgba(255,69,0,0.1)"
                        : "0 0 0 1px var(--border)",
                    }}
                  >
                    {/* Center hole */}
                    <div className="absolute inset-0 m-auto w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: playing ? "var(--secondary)" : "var(--muted)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-background" />
                    </div>
                    {/* Label arc text */}
                    <div
                      className="absolute font-space-mono text-[7px] text-muted-foreground/40 tracking-widest uppercase"
                      style={{ top: "50%", left: "50%", transform: "translate(-50%, -120%)", whiteSpace: "nowrap" }}
                    >
                      {track.type === "nujabes" ? "Nujabes" : "Bleach OST"}
                    </div>
                  </div>
                </div>

                {/* Track info */}
                <div className="text-center mb-5">
                  <h3 className="font-oswald text-xl uppercase text-foreground tracking-wide">
                    {track.title}
                  </h3>
                  <p className="font-space-mono text-xs text-muted-foreground mt-1">{track.artist}</p>
                  <p className="font-space-mono text-[10px] text-muted-foreground/50 mt-0.5 italic">{track.album}</p>
                </div>

                {/* EQ bars */}
                <div className="flex justify-center mb-6 gap-[3px]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="eq-bar"
                      style={{
                        animationDelay: `${i * 0.07}s`,
                        animationPlayState: playing ? "running" : "paused",
                        height: `${6 + Math.sin(i) * 10 + 4}px`,
                        background: i < 4 ? "var(--primary)" : i < 8 ? "var(--secondary)" : "var(--tertiary)",
                      }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    id="player-prev-btn"
                    onClick={handlePrev}
                    className="font-space-mono text-sm text-muted-foreground hover:text-foreground transition-colors p-2"
                  >
                    ⏮
                  </button>
                  <button
                    id="player-play-btn"
                    onClick={handlePlayPause}
                    className="w-12 h-12 flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: playing ? "var(--secondary)" : "var(--primary)",
                      color: playing ? "var(--secondary)" : "var(--primary)",
                      boxShadow: playing ? "0 0 15px rgba(0,212,212,0.3)" : "0 0 15px rgba(255,69,0,0.3)",
                    }}
                  >
                    <span className="text-lg">{playing ? "⏸" : "▶"}</span>
                  </button>
                  <button
                    id="player-next-btn"
                    onClick={handleNext}
                    className="font-space-mono text-sm text-muted-foreground hover:text-foreground transition-colors p-2"
                  >
                    ⏭
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="katana-line mx-5 mt-2 mb-4" />

              {/* Filter tabs */}
              <div className="px-5 flex gap-3 mb-3">
                {(["all", "nujabes", "bleach"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`font-space-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-colors ${
                      filter === f
                        ? "border-secondary text-secondary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {f === "all" ? "All" : f === "nujabes" ? "Nujabes" : "Bleach OST"}
                  </button>
                ))}
              </div>

              {/* Playlist */}
              <div className="flex-1 overflow-y-auto px-5 pb-6">
                {filteredTracks.map((t, i) => {
                  const isActive = t.id === track.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTrackSelect(i)}
                      className={`w-full flex items-center gap-3 py-3 border-b text-left transition-colors ${
                        isActive
                          ? "border-secondary/30"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div
                        className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                        style={{ color: isActive ? "var(--secondary)" : "var(--muted-foreground)" }}
                      >
                        {isActive && playing ? <EqBars playing /> : (
                          <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="font-oswald text-sm uppercase truncate"
                          style={{ color: isActive ? "var(--secondary)" : "var(--foreground)" }}
                        >
                          {t.title}
                        </div>
                        <div className="font-space-mono text-[10px] text-muted-foreground truncate">
                          {t.artist.split(" ft.")[0]}
                        </div>
                      </div>
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                        t.type === "nujabes" ? "bg-gold" : "bg-primary"
                      }`} style={{ background: t.type === "nujabes" ? "var(--gold)" : "var(--primary)" }} />
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-border flex justify-between items-center">
                <div className="font-space-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                  {PLAYLIST.length} tracks
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="font-space-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                    Nujabes × Bleach
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
