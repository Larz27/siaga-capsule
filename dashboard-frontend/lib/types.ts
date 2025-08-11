export interface Submission {
  id: string;
  age: number;
  district: string;
  occupationStatus: string;
  otherOccupation?: string;
  sectorInterest: string;
  otherSector?: string;
  values: string[];
  obstacles: string[];
  question1: string;
  submittedAt: Date | null;
  isPrivate: boolean;
}
