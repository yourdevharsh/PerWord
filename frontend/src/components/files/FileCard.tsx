import { CloseIcon, FileIcon } from "../icons/Icons";
import { formatFileSize } from "../../utils/files";
import type { TaskFile } from "../../types/task";
import "./FileCard.css";

type FileCardProps = {
  item: TaskFile;
  onRemove: () => void;
};

export function FileCard({ item, onRemove }: FileCardProps) {
  return (
    <article className="file-card">
      <div className="file-card__top">
        <span className="file-card__type" aria-hidden="true">
          <FileIcon />
        </span>
        <button
          className="file-card__remove"
          type="button"
          aria-label={`Remove ${item.file.name}`}
          onClick={onRemove}
        >
          <CloseIcon />
        </button>
      </div>

      <div>
        <p className="file-card__name" title={item.file.name}>
          {item.file.name}
        </p>
        <p className="file-card__meta">{formatFileSize(item.file.size)}</p>
      </div>
    </article>
  );
}
