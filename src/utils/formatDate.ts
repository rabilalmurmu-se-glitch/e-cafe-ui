export const formatDate = (isoDate?: string) => {
  if (!isoDate) return "Unknown";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
