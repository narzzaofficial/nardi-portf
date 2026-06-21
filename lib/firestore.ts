import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Collection names ──────────────────────────────────────────
export const COLLECTIONS = {
  PROJECTS:       "projects",
  EXPERIENCE:     "experience",
  CERTIFICATIONS: "certifications",
  TESTIMONIALS:   "testimonials",
  ARTICLES:       "articles",
} as const;

// ─── Generic helpers ───────────────────────────────────────────

/** Fetch all docs from a collection, ordered by `order` field if present */
export async function getAll<T = DocumentData>(
  col: string,
  orderField = "order"
): Promise<(T & { id: string })[]> {
  if (!db) return [];
  
  try {
    const q = query(collection(db, col), orderBy(orderField, "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
  } catch {
    // Fallback without ordering if field doesn't exist yet
    const snap = await getDocs(collection(db, col));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
  }
}

/** Add a new document */
export async function addItem(col: string, data: Record<string, unknown>) {
  return addDoc(collection(db, col), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

/** Update an existing document */
export async function updateItem(
  col: string,
  id: string,
  data: Record<string, unknown>
) {
  return updateDoc(doc(db, col, id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

/** Delete a document */
export async function deleteItem(col: string, id: string) {
  return deleteDoc(doc(db, col, id));
}

// ─── Typed data shapes ─────────────────────────────────────────

export interface Project {
  id?: string;
  number: string;
  title: string;
  description: string;
  tech: string[];
  impact: string;
  accent: string;
  liveUrl?: string;
  sourceUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  focus: string[];
  order: number;
}

export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  date?: string;
  imageUrl?: string;
  order: number;
}

export interface Testimonial {
  id?: string;
  text: string;
  author: string;
  role: string;
  company: string;
  order: number;
}

export interface Article {
  id?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  coverImageUrl?: string;
  url?: string;
  order: number;
}
