export type FileSide = "inputFiles" | "outputFiles" | "extraFiles";

export type TaskFile = {
  id: string;
  file: File;
};

export type TaskDraft = {
  id: string;
  name: string;
  details: string;
  inputFiles: TaskFile[];
  outputFiles: TaskFile[];
  extraFiles: TaskFile[];
  generatedFile: TaskFile | null;
  saved: boolean;
};

export type TaskPatch = Partial<Pick<TaskDraft, "name" | "details">>;
