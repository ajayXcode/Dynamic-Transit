
import { useState, useRef, useEffect } from "react";
import { NODES } from "../data/mumbaiGraph";
import { useStore } from "../store/useStore";

const ALL_STATIONS = Object.values(NODES);

interface Props {
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
  isMarathi: boolean;
}

export function StationSearch({ value, onChange, placeholder, isMarathi }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = NODES[value];
  const displayValue = selected ? (isMarathi ? selected.marathi : selected.name) : "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = query.length > 0
    ? ALL_STATIONS.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.marathi.includes(query) ||
        s.landmark.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        className="w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 text-sm font-medium"
        placeholder={placeholder}
        value={open ? query : displayValue}
        onFocus={() => { setOpen(true); setQuery(""); }}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
      />
      {value && !open && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          {NODES[value]?.zone}
        </span>
      )}
      {open && filtered.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-2xl overflow-hidden">
          {filtered.map(station => (
            <button
              key={station.id}
              className="w-full text-left px-3 py-2.5 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-0"
              onClick={() => {
                onChange(station.id);
                setOpen(false);
                setQuery("");
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-medium">
                    {isMarathi ? station.marathi : station.name}
                  </div>
                  <div className="text-slate-400 text-xs">{station.landmark}</div>
                </div>
                <div className="flex gap-1">
                  {station.modes.slice(0, 2).map(mode => (
                    <span key={mode} className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
