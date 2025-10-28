import { User, Department, Rating, Question, Response, Notification } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    departmentId?: string;
    departmentName?: string;
    status: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      departmentId?: string;
      departmentName?: string;
      status: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    departmentId?: string;
    departmentName?: string;
    status: string;
  }
}

export type UserWithDepartment = User & {
  department: Department | null;
};

export type RatingWithDetails = Rating & {
  agent: User;
  department: Department;
  responses: (Response & {
    question: Question;
  })[];
};

export type QuestionWithResponses = Question & {
  responses: Response[];
};

export type DepartmentWithUsers = Department & {
  users: User[];
  questions: Question[];
};

export interface DashboardStats {
  totalRatings: number;
  averageRating: number;
  satisfactionPercentage: number;
  totalComplaints: number;
  openComplaints: number;
  resolvedComplaints: number;
  ratingsTrend: {
    date: string;
    count: number;
    avgRating: number;
  }[];
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  departmentName: string;
  totalRatings: number;
  averageRating: number;
  satisfactionPercentage: number;
  totalComplaints: number;
}

export interface DepartmentPerformance {
  departmentId: string;
  departmentName: string;
  totalRatings: number;
  averageRating: number;
  satisfactionPercentage: number;
  totalComplaints: number;
  totalAgents: number;
}

export interface RatingFormData {
  agentId: string;
  customerName: string;
  customerContact?: string;
  policyNumber?: string;
  isAnonymous: boolean;
  responses: {
    questionId: string;
    score: number;
  }[];
  feedbackText?: string;
  isComplaint: boolean;
}

export interface FilterOptions {
  startDate?: Date;
  endDate?: Date;
  departmentId?: string;
  agentId?: string;
  isComplaint?: boolean;
  complaintStatus?: 'OPEN' | 'RESOLVED';
}

export interface ExportData {
  ratings: RatingWithDetails[];
  summary: {
    totalRatings: number;
    averageRating: number;
    satisfactionPercentage: number;
  };
}