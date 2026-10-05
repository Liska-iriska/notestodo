import axios, { AxiosError } from "axios";
import type { Note, NoteTag } from "../../types/note";

export type ApiError = AxiosError<{ error: string }>;

const baseURL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
