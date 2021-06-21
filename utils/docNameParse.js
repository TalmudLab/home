
export function docNameToPath (name) {
  return docNameToTitle(name).replace(/ /g, "_").toLowerCase();
}

export function docNameToTitle(name) {
  const perensIndex = name.indexOf("(");
  if (perensIndex > -1) {
    return name.substring(0, perensIndex).trim();
  }
  return name;
}

export function docNameToAuthor (name) {
  const regex = /\([\w\d\s]*Author:([\w\d\s]+)\)/g;
  const match = regex.exec(name);
  if (!match) {
    return "The Talmud Lab Team"
  }
  const author = match[1]
  return author;
}