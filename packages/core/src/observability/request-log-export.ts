import type { RequestLogEntry } from "@ccr/core/contracts/app";

const csvColumns: Array<{ header: string; value: (entry: RequestLogEntry) => string | number }> = [
  { header: "id", value: (entry) => entry.id },
  { header: "createdAt", value: (entry) => entry.createdAt },
  { header: "completedAt", value: (entry) => entry.completedAt ?? "" },
  { header: "client", value: (entry) => entry.client },
  { header: "method", value: (entry) => entry.method },
  { header: "path", value: (entry) => entry.path },
  { header: "provider", value: (entry) => entry.provider },
  { header: "model", value: (entry) => entry.model },
  { header: "statusCode", value: (entry) => entry.statusCode },
  { header: "ok", value: (entry) => entry.ok ? "true" : "false" },
  { header: "isStream", value: (entry) => entry.isStream ? "true" : "false" },
  { header: "durationMs", value: (entry) => entry.durationMs },
  { header: "inputTokens", value: (entry) => entry.inputTokens },
  { header: "outputTokens", value: (entry) => entry.outputTokens },
  { header: "reasoningTokens", value: (entry) => entry.reasoningTokens },
  { header: "cacheReadTokens", value: (entry) => entry.cacheReadTokens },
  { header: "cacheWriteTokens", value: (entry) => entry.cacheWriteTokens },
  { header: "totalTokens", value: (entry) => entry.totalTokens },
  { header: "costUsd", value: (entry) => entry.costUsd ?? "" },
  { header: "credentialId", value: (entry) => entry.credentialId ?? "" },
  { header: "credentialChain", value: (entry) => entry.credentialChain.join(" > ") },
  { header: "requestId", value: (entry) => entry.requestId },
  { header: "error", value: (entry) => entry.error ?? "" }
];

export function formatRequestLogEntriesAsCsv(entries: RequestLogEntry[]): string {
  const header = csvColumns.map((column) => csvCell(column.header)).join(",");
  const rows = entries.map((entry) => csvColumns.map((column) => csvCell(column.value(entry))).join(","));
  return [header, ...rows].join("\r\n");
}

export function formatRequestLogEntriesAsJson(entries: RequestLogEntry[]): string {
  return JSON.stringify(entries, null, 2);
}

function csvCell(value: string | number): string {
  const text = String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}
