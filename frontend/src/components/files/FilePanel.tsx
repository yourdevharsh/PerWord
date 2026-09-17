import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { PlusIcon } from "../icons/Icons";
import { FileCard } from "./FileCard";
import type { TaskFile } from "../../types/task";
import "./FilePanel.css";

type FilePanelProps = {
  label: string;
  files: TaskFile[];
  onAdd: (files: FileList | File[]) => void;
  onRemove: (fileId: string) => void;
};

export function FilePanel({ label, files, onAdd, onRemove }: FilePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;
    onAdd(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length) {
      onAdd(event.dataTransfer.files);
    }
  }

  const fileCount = Math.min(files.length, 5);

  return (
    <section className="file-panel">
      <div className="file-panel__label">{label}</div>

      <div
        className={`file-panel__surface ${isDragging ? "file-panel__surface--dragging" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (event.currentTarget === event.target) setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {files.length === 0 ? (
          <button
            type="button"
            className="file-panel__empty"
            onClick={() => inputRef.current?.click()}
          >
            <span className="file-panel__empty-icon" aria-hidden="true">
              <PlusIcon />
            </span>
            <span className="file-panel__empty-title">Add files</span>
            <span className="file-panel__empty-copy">
              Drop files here or choose from your device
            </span>
          </button>
        ) : (
          <div className={`file-grid file-grid--${fileCount}`}>
            {files.map((item) => (
              <FileCard
                key={item.id}
                item={item}
                onRemove={() => onRemove(item.id)}
              />
            ))}

            <button
              className="file-grid__add"
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              <PlusIcon />
              <span>Add more</span>
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
}
