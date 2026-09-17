import { useState } from "react";
import { PlusIcon } from "../icons/Icons";
import { TaskForm } from "./TaskForm";
import { TaskCard } from "./TaskCard";
import { DeleteTaskModal } from "./DeleteTaskModal";
import type { FileSide, TaskDraft, TaskPatch } from "../../types/task";
import "./TaskWorkspace.css";

type TaskWorkspaceProps = {
  tasks: TaskDraft[];
  onAddTask: () => void;
  onUpdateTask: (taskId: string, patch: TaskPatch) => void;
  onAddFiles: (taskId: string, side: FileSide, files: FileList | File[]) => void;
  onRemoveFile: (taskId: string, side: FileSide, fileId: string) => void;
  onSaveTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export function TaskWorkspace({
  tasks,
  onAddTask,
  onUpdateTask,
  onAddFiles,
  onRemoveFile,
  onSaveTask,
  onEditTask,
  onDeleteTask,
}: TaskWorkspaceProps) {
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const taskToDelete = tasks.find((task) => task.id === deleteTaskId) ?? null;

  return (
    <>
      <div className="task-workspace">
        {tasks.map((task, index) =>
          task.saved ? (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onUpdate={(patch) => onUpdateTask(task.id, patch)}
              onAddFiles={(side, files) => onAddFiles(task.id, side, files)}
              onRemoveFile={(side, fileId) => onRemoveFile(task.id, side, fileId)}
              onEdit={() => onEditTask(task.id)}
              onDelete={() => setDeleteTaskId(task.id)}
            />
          ) : (
            <TaskForm
              key={task.id}
              task={task}
              index={index}
              onUpdate={(patch) => onUpdateTask(task.id, patch)}
              onAddFiles={(side, files) => onAddFiles(task.id, side, files)}
              onRemoveFile={(side, fileId) => onRemoveFile(task.id, side, fileId)}
              onSave={() => onSaveTask(task.id)}
            />
          ),
        )}

        <button className="add-task" type="button" onClick={onAddTask}>
          <span className="add-task__icon" aria-hidden="true">
            <PlusIcon />
          </span>
          <span>{tasks.length === 0 ? "Add a task" : "Add another task"}</span>
        </button>
      </div>

      {taskToDelete ? (
        <DeleteTaskModal
          taskName={taskToDelete.name}
          onKeep={() => setDeleteTaskId(null)}
          onDelete={() => {
            onDeleteTask(taskToDelete.id);
            setDeleteTaskId(null);
          }}
        />
      ) : null}
    </>
  );
}
