import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTeacherSchema, 
  insertStudentSchema, 
  insertRoomSchema, 
  insertClassSchema,
  insertClassEnrollmentSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Teachers
  app.get("/api/teachers", async (req, res) => {
    try {
      const teachers = await storage.getTeachers();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teachers" });
    }
  });

  app.get("/api/teachers/:id", async (req, res) => {
    try {
      const teacher = await storage.getTeacher(req.params.id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teacher" });
    }
  });

  app.post("/api/teachers", async (req, res) => {
    try {
      const result = insertTeacherSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid teacher data", errors: result.error.errors });
      }
      
      const teacher = await storage.createTeacher(result.data);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Failed to create teacher" });
    }
  });

  app.patch("/api/teachers/:id", async (req, res) => {
    try {
      const result = insertTeacherSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid teacher data", errors: result.error.errors });
      }
      
      const teacher = await storage.updateTeacher(req.params.id, result.data);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Failed to update teacher" });
    }
  });

  app.delete("/api/teachers/:id", async (req, res) => {
    try {
      const success = await storage.deleteTeacher(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete teacher" });
    }
  });

  // Students
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const result = insertStudentSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid student data", errors: result.error.errors });
      }
      
      const student = await storage.createStudent(result.data);
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ message: "Failed to create student" });
    }
  });

  app.patch("/api/students/:id", async (req, res) => {
    try {
      const result = insertStudentSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid student data", errors: result.error.errors });
      }
      
      const student = await storage.updateStudent(req.params.id, result.data);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Failed to update student" });
    }
  });

  app.delete("/api/students/:id", async (req, res) => {
    try {
      const success = await storage.deleteStudent(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student" });
    }
  });

  // Rooms
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rooms" });
    }
  });

  app.get("/api/rooms/:id", async (req, res) => {
    try {
      const room = await storage.getRoom(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch room" });
    }
  });

  app.post("/api/rooms", async (req, res) => {
    try {
      const result = insertRoomSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid room data", errors: result.error.errors });
      }
      
      const room = await storage.createRoom(result.data);
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to create room" });
    }
  });

  app.patch("/api/rooms/:id", async (req, res) => {
    try {
      const result = insertRoomSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid room data", errors: result.error.errors });
      }
      
      const room = await storage.updateRoom(req.params.id, result.data);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to update room" });
    }
  });

  app.delete("/api/rooms/:id", async (req, res) => {
    try {
      const success = await storage.deleteRoom(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete room" });
    }
  });

  // Classes
  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes" });
    }
  });

  app.get("/api/classes/:id", async (req, res) => {
    try {
      const classData = await storage.getClass(req.params.id);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.json(classData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class" });
    }
  });

  app.post("/api/classes", async (req, res) => {
    try {
      const result = insertClassSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid class data", errors: result.error.errors });
      }
      
      // Check for schedule conflicts
      const conflicts = await storage.checkScheduleConflict(result.data);
      if (conflicts.length > 0) {
        return res.status(409).json({ 
          message: "Schedule conflict detected", 
          conflicts: conflicts.map(c => ({
            id: c.id,
            name: c.name,
            teacher: c.teacher.name,
            room: c.room.name,
            time: `${c.startTime} - ${c.endTime}`,
          }))
        });
      }
      
      const classData = await storage.createClass(result.data);
      res.status(201).json(classData);
    } catch (error) {
      res.status(500).json({ message: "Failed to create class" });
    }
  });

  app.patch("/api/classes/:id", async (req, res) => {
    try {
      const result = insertClassSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid class data", errors: result.error.errors });
      }
      
      const classData = await storage.updateClass(req.params.id, result.data);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.json(classData);
    } catch (error) {
      res.status(500).json({ message: "Failed to update class" });
    }
  });

  app.delete("/api/classes/:id", async (req, res) => {
    try {
      const success = await storage.deleteClass(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete class" });
    }
  });

  // Class enrollments
  app.get("/api/classes/:id/enrollments", async (req, res) => {
    try {
      const enrollments = await storage.getClassEnrollments(req.params.id);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post("/api/classes/:id/enrollments", async (req, res) => {
    try {
      const result = insertClassEnrollmentSchema.safeParse({
        classId: req.params.id,
        studentId: req.body.studentId,
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid enrollment data", errors: result.error.errors });
      }
      
      const enrollment = await storage.enrollStudent(result.data);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Failed to enroll student" });
    }
  });

  app.delete("/api/classes/:classId/enrollments/:studentId", async (req, res) => {
    try {
      const success = await storage.unenrollStudent(req.params.classId, req.params.studentId);
      if (!success) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to unenroll student" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
