export const dictionaries = {
  "dict-task-status": [
    { label: "待处理", value: "pending", color: "slate" },
    { label: "进行中", value: "in_progress", color: "blue" },
    { label: "已完成", value: "completed", color: "green" },
  ],
  "dict-task-priority": [
    { label: "高", value: "high", color: "red" },
    { label: "中", value: "medium", color: "amber" },
    { label: "低", value: "low", color: "slate" },
  ],
} as const;

export function getDictOptions(dictId: string) {
  return dictionaries[dictId as keyof typeof dictionaries] || [];
}

export function getDictLabel(dictId: string, value: string): string {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.label || value;
}

export function getDictColor(dictId: string, value: string): string | undefined {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.color;
}
