import { CloseIcon, TrashIcon } from "../icons/Icons";
import "./DeleteTaskModal.css";

type DeleteTaskModalProps = {
  taskName: string;
  onKeep: () => void;
  onDelete: () => void;
};

export function DeleteTaskModal({ taskName, onKeep, onDelete }: DeleteTaskModalProps) {
  return (
    <div className="delete-modal__backdrop" role="presentation" onMouseDown={onKeep}>
      <section
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="delete-modal__close" type="button" aria-label="Keep task" onClick={onKeep}>
          <CloseIcon />
        </button>

        <div className="delete-modal__icon" aria-hidden="true">
          <TrashIcon />
        </div>
        <p className="delete-modal__eyebrow">Delete task</p>
        <h2 id="delete-task-title" className="delete-modal__title">Delete “{taskName}”?</h2>
        <p className="delete-modal__copy">This will remove the saved task from this workspace.</p>

        <div className="delete-modal__actions">
          <button className="delete-modal__keep" type="button" onClick={onKeep}>Keep</button>
          <button className="delete-modal__delete" type="button" onClick={onDelete}>Delete</button>
        </div>
      </section>
    </div>
  );
}
