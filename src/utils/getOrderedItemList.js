export default function getOrderedItemList(items) {
  const sortedItems = items?.sort((a, b) => {
    const itemA =
      a.price - a.donations.reduce((pre, cur) => pre + cur.amount, 0)
    const itemB =
      b.price - b.donations.reduce((pre, cur) => pre + cur.amount, 0)
    return itemA - itemB
  })

  const listOfItemsWithDonationFullfiled = []
  const listOfItemsWithDontationNeeded = []

  sortedItems?.forEach((item) => {
    if (
      item.donations.reduce((pre, cur) => pre + cur.amount, 0) === item.price
    ) {
      listOfItemsWithDonationFullfiled.push(item)
    } else {
      listOfItemsWithDontationNeeded.push(item)
    }
  })

  const sortedListOfItemsWithDontationNeeded =
    listOfItemsWithDontationNeeded.sort((a, b) => {
      const itemA =
        a.price - a.donations.reduce((pre, cur) => pre + cur.amount, 0)
      const itemB =
        b.price - b.donations.reduce((pre, cur) => pre + cur.amount, 0)
      return itemA - itemB || a.price - b.price
    })

  return [
    ...sortedListOfItemsWithDontationNeeded,
    ...listOfItemsWithDonationFullfiled,
  ]
}
