
export function dateFormat(date: string) {
  const parsed = new Date(Date.parse(date));
  return parsed.toDateString();
  // return `${parsed.getMonth()} ${parsed.getDate()} ${parsed.getFullYear()}`
}