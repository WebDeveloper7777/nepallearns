
export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  instructor: Instructor;
  category: Category;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: "English" | "Nepali" | "Both";
  duration: string;
  lessons: number;
  rating: number;
  enrolledStudents: number;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  syllabus?: SyllabusItem[];
};

export type SyllabusItem = {
  title: string;
  duration: string;
  topics: string[];
};

export type Instructor = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  courses: number;
  students: number;
  rating: number;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  courses: number;
};

export type Review = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "instructor" | "admin";
  enrolledCourses: string[];
  wishlist: string[];
  progress: {
    courseId: string;
    completed: number;
    lastAccessed: string;
  }[];
};
