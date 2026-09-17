import type { TaskFile } from "../types/task";

export function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function getFileKey(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function toTaskFiles(files: FileList | File[]): TaskFile[] {
  return Array.from(files).map((file) => ({
    id: crypto.randomUUID(),
    file,
  }));
}
