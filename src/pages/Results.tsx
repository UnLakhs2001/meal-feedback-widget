import { ratingCounts, getTotalRatings } from "@/lib/ratingStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const labels = ["ΠΟΛΥ ΚΑΚΟ", "ΚΑΚΟ", "ΜΕΤΡΙΟ", "ΚΑΛΟ", "ΑΡΙΣΤΟ"];
const barColors = [
  "bg-destructive",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-emerald-400",
  "bg-emerald-600",
];

const Results = () => {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  const total = getTotalRatings();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground text-center tracking-tight">
          Αποτελέσματα
        </h1>

        {total === 0 ? (
          <p className="text-muted-foreground text-base md:text-lg">
            Δεν υπάρχουν απαντήσεις ακόμα.
          </p>
        ) : (
          <div className="w-full flex flex-col gap-4 md:gap-6">
            {labels.map((label, i) => {
              const count = ratingCounts[i] || 0;
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <span className="w-28 md:w-36 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide text-right shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 h-8 md:h-10 bg-muted rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`h-full ${barColors[i]} rounded-lg`}
                    />
                  </div>
                  <span className="w-16 md:w-20 text-sm md:text-base font-bold text-foreground text-right tabular-nums">
                    {count} <span className="text-muted-foreground font-normal text-xs">({pct.toFixed(0)}%)</span>
                  </span>
                </div>
              );
            })}
            <p className="text-center text-muted-foreground text-sm md:text-base mt-2">
              Σύνολο: <span className="font-bold text-foreground">{total}</span> απαντήσεις
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={refresh}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
          >
            Ανανέωση
          </button>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
          >
            Πίσω
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
