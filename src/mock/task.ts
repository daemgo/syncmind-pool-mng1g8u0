import { Task } from "@/types/task";

export const taskMock: Task[] = [
  {
    id: "1",
    title: "完成项目方案设计",
    description: "根据客户需求，完成整体技术方案和架构设计文档",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-04-15",
    createdAt: "2026-03-28",
  },
  {
    id: "2",
    title: "准备产品演示材料",
    description: "制作 PPT 和 Demo 演示系统，用于下周客户汇报",
    status: "pending",
    priority: "medium",
    dueDate: "2026-04-10",
    createdAt: "2026-03-30",
  },
  {
    id: "3",
    title: "竞品分析报告",
    description: "整理主要竞品的功能对比和价格策略分析",
    status: "completed",
    priority: "low",
    dueDate: "2026-04-05",
    createdAt: "2026-03-25",
  },
  {
    id: "4",
    title: "客户需求确认会议",
    description: "与客户技术团队确认数据对接接口和集成方案",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-04-08",
    createdAt: "2026-04-01",
  },
  {
    id: "5",
    title: "合同条款审核",
    description: "法务团队审核采购合同条款，重点关注 SLA 和数据安全",
    status: "pending",
    priority: "medium",
    dueDate: "2026-04-20",
    createdAt: "2026-04-02",
  },
];
