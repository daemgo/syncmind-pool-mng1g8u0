import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Task } from "@/types/task";
import { taskMock } from "@/mock/task";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import { Plus, MoreHorizontal, Pencil, Trash2, CheckCircle, Clock, Circle } from "lucide-react";
import { getDictLabel } from "@/lib/dict";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks/")({
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(taskMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setEditingTask(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSave = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([task, ...tasks]);
    }
  };

  const handleDelete = () => {
    if (deleteTask) {
      setTasks(tasks.filter((t) => t.id !== deleteTask.id));
      setDeleteTask(null);
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: Task["status"]) => {
    const variants: Record<Task["status"], string> = {
      pending: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      completed: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    };
    return (
      <Badge variant="secondary" className={cn("gap-1", variants[status])}>
        {getStatusIcon(status)}
        {getDictLabel("dict-task-status", status)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    const variants: Record<Task["priority"], string> = {
      high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      medium: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
      low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    };
    return (
      <Badge variant="secondary" className={variants[priority]}>
        {getDictLabel("dict-task-priority", priority)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex h-14 items-center justify-between px-6">
          <h1 className="text-lg font-semibold">任务管理</h1>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            新建任务
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">任务</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>截止日期</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{task.title}</span>
                      <span className="text-sm text-muted-foreground truncate max-w-[280px]">
                        {task.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {task.dueDate}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(task)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteTask(task)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    暂无任务，点击「新建任务」开始
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <TaskFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={editingTask}
        onSuccess={handleSave}
      />

      <AlertDialog open={!!deleteTask} onOpenChange={() => setDeleteTask(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除任务「{deleteTask?.title}」吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
