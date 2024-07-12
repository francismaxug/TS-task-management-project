export function formatDateTime(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  // const year = date.getFullYear()

  // Get hours and minutes?
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "PM" : "AM"

  // Convert hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // Handle midnight (0 hours)

  // Format time string
  const time = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`

  return ` ${month} ${day} , ${time}`
}
