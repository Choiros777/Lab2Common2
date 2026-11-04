import type { Note } from "../types/note";

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.error || `HTTP error: ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getNotes(): Promise<Note[]> {
  return request<Note[]>("/api/notes");
}

export function getNote(id: number): Promise<Note> {
  return request<Note>(`/api/notes/${id}`);
}

export function createNote(
  title: string,
  content: string,
): Promise<Note> {
  return request<Note>("/api/notes", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
  });
}

export function updateNote(
  id: number,
  data: Partial<
    Pick<Note, "title" | "content" | "is_favorite">
  >,
): Promise<Note> {
  return request<Note>(`/api/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteNote(id: number): Promise<void> {
  return request<void>(`/api/notes/${id}`, {
    method: "DELETE",
  });
}