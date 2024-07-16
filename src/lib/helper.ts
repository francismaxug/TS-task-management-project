import { format } from "date-fns"
import { ITasks } from "./types"

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

export const filterData = (searchText: string) => (filter: ITasks) => {
  const formatDate = format(filter.dueDate, "PPP")
  const isTextMatch =
    filter?.title?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    filter?.assignedTo.name
      ?.toLowerCase()
      ?.includes(searchText?.toLowerCase()) ||
    filter?.priority?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    filter?.description?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    filter?.status?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    formatDate?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    filter?.createdBy.name?.toLowerCase()?.includes(searchText?.toLowerCase())
  return isTextMatch
}

export const handlePrint = (task: ITasks[]) => {
  if (task?.length === 0) {
    window.alert("No data to print")
    return
  }
  // Create a new window for printing
  const printWindow = window.open("", "_blank")

  // Construct the content to be printed
  const printContent = `
  <html>
    <head>
      <title>78765468888888</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        section {
          margin-top: 10px;
        }
        h1 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 10px;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Task (${task.length})</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Created By</th>
            <th>Assinged To</th>
          </tr>
        </thead>
        <tbody>
          ${task
            ?.map(
              (item) => `
            <tr>
              <td>${item?.title}</td>
              <td>${item?.description}</td>
              <td>${item?.status}</td>
              <td>${format(item?.startDate, "PPPP")}</td>
              <td>${format(item?.dueDate, "PPPP")}</td>
              <td>${item.createdBy.name}</td>
              <td>${item.assignedTo.name}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </body>
  </html>
`

  // Write the content to the new window
  printWindow!.document.write(printContent)

  // Close the document after printing
  printWindow!.document.close()

  // Print the window
  printWindow!.print()
}
