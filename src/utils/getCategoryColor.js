export default function getCategoryColor(category) {
  switch (category) {
    case 'deposit':
      return '#2a9d8f'
    case 'withdraw':
      return '#e76f51'
    case 'donation':
      return '#003049'
    default:
      return ''
  }
}
