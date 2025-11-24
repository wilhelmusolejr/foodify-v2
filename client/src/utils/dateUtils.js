export function formatCommentDate(isoDateString) {
  if (!isoDateString) return "";

  const date = new Date(isoDateString);

  // Use the user's locale (optional) and specify formatting options
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
