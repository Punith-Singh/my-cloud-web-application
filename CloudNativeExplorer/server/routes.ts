import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTodoSchema, updateTodoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoints for Kubernetes
  app.get("/health/ready", (req, res) => {
    res.status(200).json({ 
      status: "ready",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  app.get("/health/live", (req, res) => {
    res.status(200).json({ 
      status: "live",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // System info endpoint
  app.get("/api/system-info", (req, res) => {
    res.json({
      environment: process.env.NODE_ENV || "development",
      version: process.env.APP_VERSION || "v1.0.0",
      region: process.env.IBM_CLOUD_REGION || "us-south",
      cluster: process.env.KUBERNETES_CLUSTER_NAME || "cloudtodo-cluster",
      namespace: process.env.KUBERNETES_NAMESPACE || "default",
      replicas: "1/1", // This would come from Kubernetes API in real deployment
      lastDeploy: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      memory: {
        used: Math.floor(Math.random() * 200 + 50), // 50-250MB
        total: 512
      },
      cloudProvider: "IBM Cloud",
      platform: "Kubernetes",
      features: ["Auto-scaling", "Load Balancing", "TLS Termination", "Health Monitoring"]
    });
  });

  // Todo CRUD endpoints
  app.get("/api/todos", async (req, res) => {
    try {
      const todos = await storage.getTodos();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  });

  app.get("/api/todos/stats", async (req, res) => {
    try {
      const stats = await storage.getTodoStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching todo stats:", error);
      res.status(500).json({ message: "Failed to fetch todo statistics" });
    }
  });

  app.get("/api/todos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid todo ID" });
      }

      const todo = await storage.getTodo(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      console.error("Error fetching todo:", error);
      res.status(500).json({ message: "Failed to fetch todo" });
    }
  });

  app.post("/api/todos", async (req, res) => {
    try {
      const validationResult = insertTodoSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid todo data",
          errors: validationResult.error.errors
        });
      }

      const todo = await storage.createTodo(validationResult.data);
      res.status(201).json(todo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ message: "Failed to create todo" });
    }
  });

  app.patch("/api/todos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid todo ID" });
      }

      const validationResult = updateTodoSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid update data",
          errors: validationResult.error.errors
        });
      }

      const updatedTodo = await storage.updateTodo(id, validationResult.data);
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Failed to update todo" });
    }
  });

  app.delete("/api/todos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid todo ID" });
      }

      const deleted = await storage.deleteTodo(id);
      if (!deleted) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ message: "Failed to delete todo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
