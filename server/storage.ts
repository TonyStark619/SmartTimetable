import { 
  type Teacher, 
  type InsertTeacher,
  type Student,
  type InsertStudent,
  type Room,
  type InsertRoom,
  type Class,
  type InsertClass,
  type ClassEnrollment,
  type InsertClassEnrollment,
  type ClassWithDetails,
  type DashboardStats
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Teachers
  getTeachers(): Promise<Teacher[]>;
  getTeacher(id: string): Promise<Teacher | undefined>;
  createTeacher(teacher: InsertTeacher): Promise<Teacher>;
  updateTeacher(id: string, teacher: Partial<InsertTeacher>): Promise<Teacher | undefined>;
  deleteTeacher(id: string): Promise<boolean>;

  // Students
  getStudents(): Promise<Student[]>;
  getStudent(id: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: string): Promise<boolean>;

  // Rooms
  getRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoom(id: string, room: Partial<InsertRoom>): Promise<Room | undefined>;
  deleteRoom(id: string): Promise<boolean>;

  // Classes
  getClasses(): Promise<ClassWithDetails[]>;
  getClass(id: string): Promise<ClassWithDetails | undefined>;
  createClass(classData: InsertClass): Promise<Class>;
  updateClass(id: string, classData: Partial<InsertClass>): Promise<Class | undefined>;
  deleteClass(id: string): Promise<boolean>;
  getClassesByTeacher(teacherId: string): Promise<ClassWithDetails[]>;
  getClassesByRoom(roomId: string): Promise<ClassWithDetails[]>;
  checkScheduleConflict(classData: InsertClass): Promise<ClassWithDetails[]>;

  // Enrollments
  getClassEnrollments(classId: string): Promise<(ClassEnrollment & { student: Student })[]>;
  enrollStudent(enrollment: InsertClassEnrollment): Promise<ClassEnrollment>;
  unenrollStudent(classId: string, studentId: string): Promise<boolean>;

  // Dashboard
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private teachers: Map<string, Teacher> = new Map();
  private students: Map<string, Student> = new Map();
  private rooms: Map<string, Room> = new Map();
  private classes: Map<string, Class> = new Map();
  private enrollments: Map<string, ClassEnrollment> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Sample teachers
    const teacher1: Teacher = {
      id: randomUUID(),
      name: "Dr. Sarah Smith",
      email: "sarah.smith@school.edu",
      subject: "Mathematics",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332995c?w=100&h=100&fit=crop&crop=face",
      isActive: true,
      createdAt: new Date(),
    };

    const teacher2: Teacher = {
      id: randomUUID(),
      name: "Prof. Michael Wilson",
      email: "michael.wilson@school.edu",
      subject: "Physics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      isActive: true,
      createdAt: new Date(),
    };

    const teacher3: Teacher = {
      id: randomUUID(),
      name: "Dr. Emily Brown",
      email: "emily.brown@school.edu",
      subject: "Chemistry",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      isActive: true,
      createdAt: new Date(),
    };

    this.teachers.set(teacher1.id, teacher1);
    this.teachers.set(teacher2.id, teacher2);
    this.teachers.set(teacher3.id, teacher3);

    // Sample rooms
    const room1: Room = {
      id: randomUUID(),
      name: "Room A1",
      capacity: 30,
      type: "classroom",
      status: "available",
      equipment: ["projector", "whiteboard", "computer"],
    };

    const room2: Room = {
      id: randomUUID(),
      name: "Lab B2",
      capacity: 20,
      type: "laboratory",
      status: "occupied",
      equipment: ["lab_equipment", "safety_shower", "fume_hood"],
    };

    const room3: Room = {
      id: randomUUID(),
      name: "Studio A",
      capacity: 15,
      type: "studio",
      status: "available",
      equipment: ["art_supplies", "easels", "natural_light"],
    };

    this.rooms.set(room1.id, room1);
    this.rooms.set(room2.id, room2);
    this.rooms.set(room3.id, room3);

    // Sample students
    for (let i = 1; i <= 50; i++) {
      const student: Student = {
        id: randomUUID(),
        name: `Student ${i}`,
        email: `student${i}@school.edu`,
        grade: i <= 25 ? "10th Grade" : "11th Grade",
        avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop&crop=face`,
        enrollmentDate: new Date(),
      };
      this.students.set(student.id, student);
    }

    // Sample classes
    const class1: Class = {
      id: randomUUID(),
      name: "Math 101",
      subject: "Mathematics",
      teacherId: teacher1.id,
      roomId: room1.id,
      dayOfWeek: 1, // Monday
      startTime: "09:00",
      endTime: "10:00",
      maxStudents: 25,
      color: "#06b6d4",
      createdAt: new Date(),
    };

    const class2: Class = {
      id: randomUUID(),
      name: "Physics Lab",
      subject: "Physics",
      teacherId: teacher2.id,
      roomId: room2.id,
      dayOfWeek: 3, // Wednesday
      startTime: "09:00",
      endTime: "10:00",
      maxStudents: 20,
      color: "#10b981",
      createdAt: new Date(),
    };

    this.classes.set(class1.id, class1);
    this.classes.set(class2.id, class2);
  }

  async getTeachers(): Promise<Teacher[]> {
    return Array.from(this.teachers.values());
  }

  async getTeacher(id: string): Promise<Teacher | undefined> {
    return this.teachers.get(id);
  }

  async createTeacher(teacher: InsertTeacher): Promise<Teacher> {
    const id = randomUUID();
    const newTeacher: Teacher = {
      ...teacher,
      id,
      avatar: teacher.avatar || null,
      isActive: teacher.isActive ?? true,
      createdAt: new Date(),
    };
    this.teachers.set(id, newTeacher);
    return newTeacher;
  }

  async updateTeacher(id: string, teacher: Partial<InsertTeacher>): Promise<Teacher | undefined> {
    const existing = this.teachers.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...teacher };
    this.teachers.set(id, updated);
    return updated;
  }

  async deleteTeacher(id: string): Promise<boolean> {
    return this.teachers.delete(id);
  }

  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const newStudent: Student = {
      ...student,
      id,
      avatar: student.avatar || null,
      enrollmentDate: new Date(),
    };
    this.students.set(id, newStudent);
    return newStudent;
  }

  async updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student | undefined> {
    const existing = this.students.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...student };
    this.students.set(id, updated);
    return updated;
  }

  async deleteStudent(id: string): Promise<boolean> {
    return this.students.delete(id);
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: string): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(room: InsertRoom): Promise<Room> {
    const id = randomUUID();
    const newRoom: Room = {
      ...room,
      id,
      status: room.status || "available",
      equipment: room.equipment || null,
    };
    this.rooms.set(id, newRoom);
    return newRoom;
  }

  async updateRoom(id: string, room: Partial<InsertRoom>): Promise<Room | undefined> {
    const existing = this.rooms.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...room };
    this.rooms.set(id, updated);
    return updated;
  }

  async deleteRoom(id: string): Promise<boolean> {
    return this.rooms.delete(id);
  }

  async getClasses(): Promise<ClassWithDetails[]> {
    const classes = Array.from(this.classes.values());
    return Promise.all(classes.map(async (cls) => {
      const teacher = await this.getTeacher(cls.teacherId);
      const room = await this.getRoom(cls.roomId);
      const enrollments = await this.getClassEnrollments(cls.id);
      
      return {
        ...cls,
        teacher: teacher!,
        room: room!,
        enrollmentCount: enrollments.length,
      };
    }));
  }

  async getClass(id: string): Promise<ClassWithDetails | undefined> {
    const cls = this.classes.get(id);
    if (!cls) return undefined;

    const teacher = await this.getTeacher(cls.teacherId);
    const room = await this.getRoom(cls.roomId);
    const enrollments = await this.getClassEnrollments(cls.id);

    return {
      ...cls,
      teacher: teacher!,
      room: room!,
      enrollmentCount: enrollments.length,
    };
  }

  async createClass(classData: InsertClass): Promise<Class> {
    const id = randomUUID();
    const newClass: Class = {
      ...classData,
      id,
      color: classData.color || "#06b6d4",
      createdAt: new Date(),
    };
    this.classes.set(id, newClass);
    return newClass;
  }

  async updateClass(id: string, classData: Partial<InsertClass>): Promise<Class | undefined> {
    const existing = this.classes.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...classData };
    this.classes.set(id, updated);
    return updated;
  }

  async deleteClass(id: string): Promise<boolean> {
    return this.classes.delete(id);
  }

  async getClassesByTeacher(teacherId: string): Promise<ClassWithDetails[]> {
    const classes = await this.getClasses();
    return classes.filter(cls => cls.teacherId === teacherId);
  }

  async getClassesByRoom(roomId: string): Promise<ClassWithDetails[]> {
    const classes = await this.getClasses();
    return classes.filter(cls => cls.roomId === roomId);
  }

  async checkScheduleConflict(classData: InsertClass): Promise<ClassWithDetails[]> {
    const classes = await this.getClasses();
    return classes.filter(cls => 
      cls.dayOfWeek === classData.dayOfWeek &&
      (cls.teacherId === classData.teacherId || cls.roomId === classData.roomId) &&
      this.timeOverlap(cls.startTime, cls.endTime, classData.startTime, classData.endTime)
    );
  }

  private timeOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    return start1 < end2 && start2 < end1;
  }

  async getClassEnrollments(classId: string): Promise<(ClassEnrollment & { student: Student })[]> {
    const enrollments = Array.from(this.enrollments.values())
      .filter(enrollment => enrollment.classId === classId);
    
    return Promise.all(enrollments.map(async (enrollment) => {
      const student = await this.getStudent(enrollment.studentId);
      return {
        ...enrollment,
        student: student!,
      };
    }));
  }

  async enrollStudent(enrollment: InsertClassEnrollment): Promise<ClassEnrollment> {
    const id = randomUUID();
    const newEnrollment: ClassEnrollment = {
      ...enrollment,
      id,
      enrolledAt: new Date(),
    };
    this.enrollments.set(id, newEnrollment);
    return newEnrollment;
  }

  async unenrollStudent(classId: string, studentId: string): Promise<boolean> {
    const enrollment = Array.from(this.enrollments.values())
      .find(e => e.classId === classId && e.studentId === studentId);
    
    if (enrollment) {
      return this.enrollments.delete(enrollment.id);
    }
    return false;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const classes = await this.getClasses();
    const teachers = await this.getTeachers();
    const students = await this.getStudents();
    const rooms = await this.getRooms();

    const activeTeachers = teachers.filter(t => t.isActive).length;
    const occupiedRooms = rooms.filter(r => r.status === "occupied").length;
    const roomUtilization = Math.round((occupiedRooms / rooms.length) * 100);

    return {
      totalClasses: classes.length,
      activeTeachers,
      totalStudents: students.length,
      roomUtilization,
    };
  }
}

export const storage = new MemStorage();
