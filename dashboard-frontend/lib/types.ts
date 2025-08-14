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
  question1Highlighted?: string;
  question1HighlightedUpdatedAt?: string;
  submittedAt: string | null;
  isPrivate: boolean;
  isFeatured?: boolean;
  featuredUpdatedAt?: string;
}

export interface Testimonial {
  quote: string;
  occupation: string;
  sector: string;
}
