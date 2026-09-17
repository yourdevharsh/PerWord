import { Header } from "./components/layout/Header";
import { TaskWorkspace } from "./components/tasks/TaskWorkspace";
import { useTaskDrafts } from "./hooks/useTaskDrafts";
import "./styles/app.css";

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    addFiles,
    removeFile,
    saveTask,
    editTask,
    deleteTask,
  } = useTaskDrafts();

  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <section className="intro" aria-labelledby="page-title">
          <p className="intro__eyebrow">Teach once. Reuse the task.</p>
          <h1 id="page-title" className="intro__title">
            Build a repeatable file-editing task.
          </h1>
          <p className="intro__copy">
            Show PerWord what a file looked like, what it should look like,
            and explain the change.
          </p>
        </section>

        <TaskWorkspace
          tasks={tasks}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onAddFiles={addFiles}
          onRemoveFile={removeFile}
          onSaveTask={saveTask}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}
