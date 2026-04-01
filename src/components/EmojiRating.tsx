import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { recordRating } from "@/lib/ratingStore";

// Drop your custom images in src/assets/emojis/ and update filenames here
const ratings = [
  { image: "/emojis/very-bad.png", label: "ΠΟΛΥ ΚΑΚΟ" },
  { image: "/emojis/bad.png", label: "ΚΑΚΟ" },
  { image: "/emojis/average.png", label: "ΜΕΤΡΙΟ" },
  { image: "/emojis/good.png", label: "ΚΑΛΟ" },
  { image: "/emojis/excellent.png", label: "ΑΡΙΣΤΟ" },
];
const EmojiRating = () => {
  const [phase, setPhase] = useState<"question" | "success">("question");
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      setPhase("success");
      setTimeout(() => {
        setPhase("question");
        setSelected(null);
      }, 2500);
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AnimatePresence mode="wait">
        {phase === "question" ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-10 md:gap-14 w-full max-w-2xl px-4"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center tracking-tight">
              Πως σας φάνηκε το γεύμα;
            </h1>

            <div className="flex items-start justify-center gap-4 md:gap-8 lg:gap-10 w-full">
              {ratings.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="flex flex-col items-center gap-3 md:gap-4 group focus:outline-none"
                >
                  <motion.img
                    src={r.image}
                    alt={r.label}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 cursor-pointer transition-all duration-200 object-contain ${
                      selected === i ? "scale-110" : ""
                    }`}
                  />
                  <span className="text-[10px] md:text-sm lg:text-base font-semibold text-muted-foreground uppercase tracking-wide text-center leading-tight">
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              className="text-6xl md:text-8xl"
            >
              ✅
            </motion.span>
            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground text-center">
              Ευχαριστούμε!
            </p>
            <p className="text-sm md:text-lg text-muted-foreground text-center">
              Η απάντησή σας καταχωρήθηκε.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiRating;
