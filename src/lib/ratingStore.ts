// In-memory rating store — resets on page refresh
export const ratingCounts: Record<number, number> = {
  0: 0, // ΠΟΛΥ ΚΑΚΟ
  1: 0, // ΚΑΚΟ
  2: 0, // ΜΕΤΡΙΟ
  3: 0, // ΚΑΛΟ
  4: 0, // ΑΡΙΣΤΟ
};

export const recordRating = (index: number) => {
  ratingCounts[index] = (ratingCounts[index] || 0) + 1;
};

export const getTotalRatings = () =>
  Object.values(ratingCounts).reduce((a, b) => a + b, 0);
