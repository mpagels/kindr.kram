const OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function convertTime(time) {
  return new Date(Date.parse(time)).toLocaleDateString('de-DE', OPTIONS)
}
