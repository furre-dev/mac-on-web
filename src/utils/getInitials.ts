export function getInitials(str: string) {
  const words = str.trim().split(/\s+/);
  if (words.length < 2) return words[0][0].toUpperCase();

  return words[0][0].toUpperCase() + words[1][0].toUpperCase();
}