import { z } from "zod";

export interface Project {
  id: number;
  title: string;
  description: string;
  details: string[] | null;
  tags: string[];
  imageUrl: string | null;
  link: string | null;
  featured: boolean | null;
  createdAt: Date | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  details: string[] | null;
  order: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date | null;
}

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
