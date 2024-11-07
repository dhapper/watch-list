// src/app/models/Show.ts
export interface Show {
    id: number;
    name: string;
    summary: string;
    image?: {
      medium: string;
      original: string;
    };
    genres: string[];
    rating?: {
      average: number;
    };
  }
  