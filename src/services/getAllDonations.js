export default function getItems() {
  return fetch('/api/location/transactions').then((res) => res.json())
}
