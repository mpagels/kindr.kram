export default function getSumOfDonation(donationList) {
  const sumOfDonation = donationList.reduce((pre, cur) => pre + cur.amount, 0)
  const donationCount = donationList.length

  return [sumOfDonation, donationCount]
}
