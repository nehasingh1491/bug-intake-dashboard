export const statusOptions = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "resolved", label: "Resolved" },
];

export const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const areaOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "auth", label: "Auth" },
  { value: "notifications", label: "Notifications" },
  { value: "search", label: "Search" },
  { value: "performance", label: "Performance" },
  { value: "other", label: "Other" },
];

export const getOptionLabel = (options, value) => {
  return options.find((option) => option.value === value)?.label || value;
};
