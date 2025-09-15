export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  grade?: number;
  preferredLanguage?: 'tamil' | 'english' | 'hindi';
  streak?: number;
  badges?: Badge[];
  certificates?: Certificate[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Certificate {
  id: string;
  subject: string;
  level: string;
  earnedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  games: Game[];
}

export interface Game {
  id: string;
  name: string;
  description: string;
  type: 'quiz' | 'puzzle' | 'word-hunt' | 'simulation';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  duration: string;
  players: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  grade: number;
  totalPoints: number;
  completedGames: number;
  averageScore: number;
  streak: number;
  lastActive: Date;
}