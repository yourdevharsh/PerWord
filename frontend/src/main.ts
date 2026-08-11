import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
  const userPromptEl = document.querySelector(
    "#userPrompt",
  ) as HTMLTextAreaElement | null;
  const fileInputsEl = document.querySelector(
    "#fileInputs",
  ) as HTMLInputElement | null;
  const submitButtonEl = document.querySelector(
    "#submitButton",
  ) as HTMLButtonElement | null;
  const resultEl = document.querySelector(
    "#result",
  ) as HTMLHeadingElement | null;

  submitButtonEl?.addEventListener("click", () => {
    const userPrompt = userPromptEl?.value;
    if (!userPrompt) {
      if (resultEl) {
        resultEl.innerHTML = "No Instruction";
      }
      return;
    }

    const files = fileInputsEl?.files;
    if (!files || files.length == 0) {
      if (resultEl) {
        resultEl.innerHTML = "No files";
      }
      return;
    }

    processRequest(files, userPrompt);
  });
});

async function processRequest(
  files: FileList,
  userPrompt: string,
): Promise<void> {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  formData.append("userPrompt", userPrompt);

  try {
    const response = await fetch("http://localhost:8000/api/v1/process", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
  } catch (error) {}
}
