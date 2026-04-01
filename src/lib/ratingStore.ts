const STORAGE_KEY = "emoji-ratings";

function loadCounts(): Record<number, number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
}

function saveCounts(counts: Record<number, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
}

export const ratingCounts: Record<number, number> = loadCounts();

export const recordRating = (index: number) => {
  ratingCounts[index] = (ratingCounts[index] || 0) + 1;
  saveCounts(ratingCounts);
};

export const getTotalRatings = () =>
  Object.values(ratingCounts).reduce((a, b) => a + b, 0);

export const resetRatings = () => {
  for (let i = 0; i < 5; i++) ratingCounts[i] = 0;
  saveCounts(ratingCounts);
};
