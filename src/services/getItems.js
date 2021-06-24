export default function getItems() {
  return fetch('/api/item').then((res) => res.json())
}
