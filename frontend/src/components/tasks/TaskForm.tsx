import { ArrowRightIcon } from "../icons/Icons";
import { FilePanel } from "../files/FilePanel";
import type { FileSide, TaskDraft, TaskPatch } from "../../types/task";
import "./TaskForm.css";

type TaskFormProps = {
  task: TaskDraft;
  index: number;
  onUpdate: (patch: TaskPatch) => void;
  onAddFiles: (side: FileSide, files: FileList | File[]) => void;
  onRemoveFile: (side: FileSide, fileId: string) => void;
  onSave: () => void;
};

export function TaskForm({
  task,
  index,
  onUpdate,
  onAddFiles,
  onRemoveFile,
  onSave,
}: TaskFormProps) {
  const canSave = Boolean(task.name.trim() && task.inputFiles.length > 0 && task.details.trim());

  return (
    <section className="task-form" aria-labelledby={`task-${task.id}`}>
      <div className="task-form__eyebrow">
        Task {String(index + 1).padStart(2, "0")}
      </div>

      <input
        id={`task-${task.id}`}
        className="task-form__name"
        type="text"
        value={task.name}
        placeholder="Name this task"
        onChange={(event) => onUpdate({ name: event.target.value })}
      />

      <div className="task-form__flow">
        <FilePanel
          label="Input"
          files={task.inputFiles}
          onAdd={(files) => onAddFiles("inputFiles", files)}
          onRemove={(fileId) => onRemoveFile("inputFiles", fileId)}
        />

        <div className="task-form__arrow" aria-hidden="true">
          <ArrowRightIcon />
        </div>

        <FilePanel
          label="Output"
          files={task.outputFiles}
          onAdd={(files) => onAddFiles("outputFiles", files)}
          onRemove={(fileId) => onRemoveFile("outputFiles", fileId)}
        />
      </div>

      <textarea
        className="task-form__details"
        rows={4}
        value={task.details}
        placeholder="Details — describe what should change"
        onChange={(event) => onUpdate({ details: event.target.value })}
      />

      <div className="task-form__footer">
        <span className="task-form__status" aria-live="polite">
          {task.saved ? "Task saved" : ""}
        </span>

        <button
          className="task-form__save"
          type="button"
          disabled={!canSave}
          onClick={onSave}
        >
          Save task
        </button>
      </div>
    </section>
  );
}
