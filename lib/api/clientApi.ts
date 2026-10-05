import type { Note, NoteTag } from "../../types/note";
import api from "./api";
import { User } from "@/types/user";

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
  rate: number;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
};

export const fetchNotes = async (
  searchTerm?: string,
  page: number = 1,
  perPage: number = 12,
  tag?: string,
  sortBy: string = "rate",
  sortOrder: string = "asc",
) => {
  const response = await api.get<HTTPResponse>("/notes", {
    params: {
      search: searchTerm?.trim() || undefined,
      page,
      perPage,
      tag,
      sortOrder,
    },
  });

  return response.data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>("/users/me", payload);
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<{ success: boolean }>("/auth/session");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateNote = async (
  id: string,
  data: Partial<NewNoteData>,
): Promise<Note> => {
  const { data: note } = await api.patch<Note>(`/notes/${id}`, data);
  return note;
};
