import { NextResponse, NextRequest } from "next/server"
import ConnectDB from "@/app/config/db"

import Task from "@/app/model/tasksModel"
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const today = new Date()
    await ConnectDB()

    //-------------------

    const statistics = await Task.aggregate([
      {
        $facet: {
          statusCounts: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
          overdueTasks: [
            {
              $match: {
                dueDate: { $lt: today },
                status: { $ne: "Completed" },
              },
            },
            {
              $count: "overdue",
            },
          ],
          totalTasks: [
            {
              $count: "total",
            },
          ],
        },
      },
      {
        $project: {
          statusCounts: {
            $arrayToObject: {
              $map: {
                input: "$statusCounts",
                as: "status",
                in: ["$$status._id", "$$status.count"],
              },
            },
          },
          overdueTasks: { $arrayElemAt: ["$overdueTasks.overdue", 0] },
          totalTasks: { $arrayElemAt: ["$totalTasks.total", 0] },
        },
      },
      {
        $project: {
          completed: { $ifNull: ["$statusCounts.Completed", 0] },
          open: { $ifNull: ["$statusCounts.Open", 0] },
          inProgress: { $ifNull: ["$statusCounts.In Progress", 0] },
          overdue: { $ifNull: ["$overdueTasks", 0] },
          total: { $ifNull: ["$totalTasks", 0] },
        },
      },
    ])

    console.log(statistics)
    console.log(statistics[0])
    const stats = statistics[0]

    return new NextResponse(
      JSON.stringify({
        status: "success",
        stats,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: "something went wrong",
      }),
      {
        status: 500,
      }
    )
  }
}
