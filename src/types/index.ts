// Global type definitions for the Personality Test app

// User interface (already defined in the slice)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Interface for test results
export interface TestResult {
  id: string;
  userId: string;
  testName: string;
  score: number;
  date: string; // ISO date string
  answers: Record<string, any>;
}

// Interface for personality test questions
export interface Question {
  id: string;
  text: string;
  category: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  value: number; // Used for scoring
}