
export function docNameToPath (name) {
  const perensIndex = name.indexOf("(");
  return name.substring(0, perensIndex).trim().replaceAll(" ", "_").toLowerCase();
}

export function docNameToTitle(name) {
  const perensIndex = name.indexOf("(");
  return name.substring(0, perensIndex).trim();
}

export function docNameToAuthor (name) {
  const regex = /\([\w\d\s]*Author:([\w\d\s]+)\)/g;
  const match = regex.exec(name);
  const author = match[1]
  return author;
}