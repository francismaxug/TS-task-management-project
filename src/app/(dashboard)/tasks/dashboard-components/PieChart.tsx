"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { FaTasks } from "react-icons/fa"
import { ITaskStats } from "@/lib/types"

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-4))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig
export function PieChartt({ data }: { data: ITaskStats }) {
  const chartData = [
    { task: "open", tasks: data?.stats?.open * 10, fill: "var(--color-open)" },
    {
      task: "inProgress",
      tasks: data?.stats?.inProgress * 10,
      fill: "var(--color-inProgress)",
    },
    {
      task: "completed",
      tasks: data?.stats?.completed * 10,
      fill: "var(--color-completed)",
    },
    {
      task: "overdue",
      tasks: data?.stats?.overdue * 10,
      fill: "var(--color-overdue)",
    },
  ]
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0 text-[0.7rem]">
        <CardTitle className=" text-[1rem]">Pie Chart Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="task"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data?.stats?.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          total Task
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" text-center text-sm mt-5 flex items-center justify-center">
        <div className="leading-none text-muted-foreground space-y-1">
          <p> A Pie Chart showing task overview</p>
          <p className=" text-[0.7rem] font-semibold">
            Round-Count: (Task) multiplied by 10
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
