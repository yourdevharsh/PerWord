import { useMemo, useState } from "react";
import { FilePanel } from "../files/FilePanel";
import { ArrowRightIcon, DownloadIcon, EditIcon, TrashIcon } from "../icons/Icons";
import type { FileSide, TaskDraft } from "../../types/task";
import "./TaskCard.css";

type TaskCardProps = {
  task: TaskDraft;
  index: number;
  onUpdate: (patch: { details: string }) => void;
  onAddFiles: (side: FileSide, files: FileList | File[]) => void;
  onRemoveFile: (side: FileSide, fileId: string) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskCard({
  task,
  index,
  onUpdate,
  onAddFiles,
  onRemoveFile,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const canGenerate = Boolean(task.details.trim());
  const generatedName = task.generatedFile?.file.name ?? "Returned file will appear here";
  const extraFilesLabel = useMemo(
    () => (task.extraFiles.length ? `${task.extraFiles.length} optional file${task.extraFiles.length > 1 ? "s" : ""}` : "Optional files"),
    [task.extraFiles.length],
  );

  async function handleGenerate() {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setIsGenerating(false);
  }

  function handleDownload() {
    if (!task.generatedFile) return;

    const url = URL.createObjectURL(task.generatedFile.file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = task.generatedFile.file.name;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article className="task-card" aria-labelledby={`saved-task-${task.id}`}>
      <header className="task-card__header">
        <div className="task-card__heading-group">
          <div className="task-card__eyebrow">Task {String(index + 1).padStart(2, "0")}</div>
          <div className="task-card__title-row">
            <div className="task-card__actions" aria-label={`Actions for ${task.name}`}>
              <button className="task-card__icon-button" type="button" aria-label="Edit task" onClick={onEdit}>
                <EditIcon />
              </button>
              <button className="task-card__icon-button task-card__icon-button--danger" type="button" aria-label="Delete task" onClick={onDelete}>
                <TrashIcon />
              </button>
            </div>
            <h2 id={`saved-task-${task.id}`} className="task-card__name">{task.name}</h2>
          </div>
        </div>
      </header>

      <div className="task-card__flow">
        <div className="task-card__side">
          <FilePanel
            label={extraFilesLabel}
            files={task.extraFiles}
            onAdd={(files) => onAddFiles("extraFiles", files)}
            onRemove={(fileId) => onRemoveFile("extraFiles", fileId)}
          />
        </div>

        <div className="task-card__arrow" aria-hidden="true">
          <ArrowRightIcon />
        </div>

        <section className="task-card__returned">
          <div className="task-card__returned-label">Returned file</div>
          <div className="task-card__returned-surface">
            <button
              className="task-card__download"
              type="button"
              aria-label={task.generatedFile ? `Download ${generatedName}` : "Download returned file"}
              disabled={!task.generatedFile}
              onClick={handleDownload}
            >
              <DownloadIcon />
            </button>

            {task.generatedFile ? (
              <div className="task-card__returned-file">
                <div className="task-card__returned-file-icon">FILE</div>
                <strong title={generatedName}>{generatedName}</strong>
                <span>Ready to download</span>
              </div>
            ) : (
              <div className="task-card__returned-empty">
                <div className="task-card__returned-empty-title">No generated file yet</div>
                <div className="task-card__returned-empty-copy">Run the task to get the LLM result here.</div>
              </div>
            )}
          </div>
        </section>
      </div>

      <textarea
        className="task-card__details"
        rows={4}
        value={task.details}
        placeholder="Describe what should change"
        onChange={(event) => onUpdate({ details: event.target.value })}
      />

      <div className="task-card__generate-row">
        <button
          className="task-card__generate"
          type="button"
          disabled={!canGenerate || isGenerating}
          onClick={handleGenerate}
        >
          {isGenerating ? "Generating…" : "Generate"}
        </button>
      </div>
    </article>
  );
}
