import { useCallback, useState } from "react";
import type { FileSide, TaskDraft, TaskPatch } from "../types/task";
import { getFileKey, toTaskFiles } from "../utils/files";

function createTask(): TaskDraft {
  return {
    id: crypto.randomUUID(),
    name: "",
    details: "",
    inputFiles: [],
    outputFiles: [],
    extraFiles: [],
    generatedFile: null,
    saved: false,
  };
}

export function useTaskDrafts() {
  const [tasks, setTasks] = useState<TaskDraft[]>([]);

  const addTask = useCallback(() => {
    setTasks((current) => [...current, createTask()]);
  }, []);

  const updateTask = useCallback((taskId: string, patch: TaskPatch) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, ...patch, saved: false } : task,
      ),
    );
  }, []);

  const addFiles = useCallback(
    (taskId: string, side: FileSide, incoming: FileList | File[]) => {
      const newFiles = toTaskFiles(incoming);

      setTasks((current) =>
        current.map((task) => {
          if (task.id !== taskId) return task;

          const existingKeys = new Set(task[side].map(({ file }) => getFileKey(file)));
          const uniqueFiles = newFiles.filter(
            ({ file }) => !existingKeys.has(getFileKey(file)),
          );

          return {
            ...task,
            [side]: [...task[side], ...uniqueFiles],
            ...(side === "extraFiles" ? {} : { generatedFile: null }),
            saved: side === "extraFiles" ? task.saved : false,
          };
        }),
      );
    },
    [],
  );

  const removeFile = useCallback(
    (taskId: string, side: FileSide, fileId: string) => {
      setTasks((current) =>
        current.map((task) => {
          if (task.id !== taskId) return task;

          return {
            ...task,
            [side]: task[side].filter(({ id }) => id !== fileId),
            ...(side === "extraFiles" ? {} : { generatedFile: null }),
            saved: side === "extraFiles" ? task.saved : false,
          };
        }),
      );
    },
    [],
  );

  const saveTask = useCallback((taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, saved: true } : task,
      ),
    );
  }, []);

  const editTask = useCallback((taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, saved: false } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    addFiles,
    removeFile,
    saveTask,
    editTask,
    deleteTask,
  };
}
