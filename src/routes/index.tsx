import { createFileRoute } from "@tanstack/react-router";
import { CheckSquare, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { taskMock } from "@/mock/task";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const totalTasks = taskMock.length;
  const completedTasks = taskMock.filter((t) => t.status === "completed").length;
  const inProgressTasks = taskMock.filter((t) => t.status === "in_progress").length;
  const pendingTasks = taskMock.filter((t) => t.status === "pending").length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      title: "总任务数",
      value: totalTasks,
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "已完成",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "进行中",
      value: inProgressTasks,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900",
    },
    {
      title: "完成率",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-violet-600",
      bgColor: "bg-violet-100 dark:bg-violet-900",
    },
  ];

  const recentTasks = taskMock.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">仪表盘</h1>
        <p className="text-muted-foreground mt-1">任务概览与最近动态</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最近任务</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : task.status === "in_progress"
                        ? "bg-blue-500"
                        : "bg-slate-400"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      截止日期: {task.dueDate}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }
                >
                  {task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
