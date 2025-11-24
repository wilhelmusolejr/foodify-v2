const ALL_KEYS_STRING = import.meta.env.VITE_SPOONACULAR_API_KEY;
const API_KEYS = ALL_KEYS_STRING
  ? ALL_KEYS_STRING.split("|")
      .map((key) => key.trim())
      .filter((key) => key.length > 0)
  : [];

export function getRandomApiKey() {
  if (API_KEYS.length === 0) {
    console.error("Error: No API keys configured or the environment variable is empty.");
    return "";
  }

  // Generate a random index based on the array length
  const randomIndex = Math.floor(Math.random() * API_KEYS.length);

  return API_KEYS[randomIndex];
}
