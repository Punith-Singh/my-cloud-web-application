import { todos, type Todo, type InsertTodo, type UpdateTodo } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Todo operations
  getTodos(): Promise<Todo[]>;
  getTodo(id: number): Promise<Todo | undefined>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: number, updates: UpdateTodo): Promise<Todo | undefined>;
  deleteTodo(id: number): Promise<boolean>;
  
  // Stats
  getTodoStats(): Promise<{ total: number; completed: number; active: number }>;
}

export class DatabaseStorage implements IStorage {
  async getTodos(): Promise<Todo[]> {
    const results = await db.select().from(todos).orderBy(todos.createdAt);
    return results.reverse(); // Most recent first
  }

  async getTodo(id: number): Promise<Todo | undefined> {
    const [todo] = await db.select().from(todos).where(eq(todos.id, id));
    return todo || undefined;
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const [todo] = await db
      .insert(todos)
      .values({
        title: insertTodo.title,
        description: insertTodo.description || null,
        priority: insertTodo.priority || "medium",
        completed: insertTodo.completed || false,
      })
      .returning();
    return todo;
  }

  async updateTodo(id: number, updates: UpdateTodo): Promise<Todo | undefined> {
    const updateData: any = { ...updates };
    
    // Handle completion timestamp
    if (updates.completed !== undefined) {
      updateData.completedAt = updates.completed ? new Date() : null;
    }

    const [updatedTodo] = await db
      .update(todos)
      .set(updateData)
      .where(eq(todos.id, id))
      .returning();

    return updatedTodo || undefined;
  }

  async deleteTodo(id: number): Promise<boolean> {
    const result = await db.delete(todos).where(eq(todos.id, id));
    return result.rowCount > 0;
  }

  async getTodoStats(): Promise<{ total: number; completed: number; active: number }> {
    const allTodos = await db.select().from(todos);
    const total = allTodos.length;
    const completed = allTodos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }
}

export const storage = new DatabaseStorage();
