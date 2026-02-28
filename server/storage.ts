import { readFileSync } from "fs";
import { join } from "path";
import {
  type InsertContactMessage,
  type ContactMessage,
  type Project,
  type Skill,
  type Experience,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperiences(): Promise<Experience[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  seedData(): Promise<void>;
}

// In-memory storage for contact messages
let contactMessagesStore: ContactMessage[] = [];
let nextContactMessageId = 1;

// Helper to transform snake_case to camelCase for projects
function transformProject(project: any): Project {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    details: project.details || [],
    tags: project.tags,
    imageUrl: project.image_url || project.imageUrl,
    link: project.link,
    featured: project.featured,
    createdAt: project.created_at ? new Date(project.created_at) : new Date(),
  };
}

// Helper to transform snake_case to camelCase for contact messages
function transformContactMessage(message: any): ContactMessage {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    message: message.message,
    createdAt: message.created_at ? new Date(message.created_at) : new Date(),
  };
}

export class StaticStorage implements IStorage {
  private loadJSON<T>(filename: string): T {
    const filePath = join(process.cwd(), filename);
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  }

  async getProjects(): Promise<Project[]> {
    const projects = this.loadJSON<any[]>("projects.json");
    return projects.map(transformProject).sort((a, b) => a.id - b.id);
  }

  async getSkills(): Promise<Skill[]> {
    return this.loadJSON<Skill[]>("skills.json");
  }

  async getExperiences(): Promise<Experience[]> {
    const experiences = this.loadJSON<Experience[]>("experiences.json");
    return experiences.sort((a, b) => a.order - b.order);
  }

  async createContactMessage(
    message: InsertContactMessage,
  ): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: nextContactMessageId++,
      name: message.name,
      email: message.email,
      message: message.message,
      createdAt: new Date(),
    };
    contactMessagesStore.push(newMessage);
    return newMessage;
  }

  async seedData(): Promise<void> {
    // Load initial contact messages from JSON file if it exists
    try {
      const messages = this.loadJSON<any[]>("contact_messages.json");
      contactMessagesStore = messages
        .filter((msg) => msg.name || msg.email || msg.message) // Filter out empty messages
        .map(transformContactMessage);
      // Set next ID based on highest existing ID
      if (contactMessagesStore.length > 0) {
        nextContactMessageId =
          Math.max(...contactMessagesStore.map((m) => m.id)) + 1;
      }
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      contactMessagesStore = [];
      nextContactMessageId = 1;
    }
  }
}

export const storage = new StaticStorage();
