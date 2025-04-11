import { Timestamp } from 'firebase/firestore';

export interface WorkExperience {
  id: string;
  functie: string;
  bedrijf: string;
  startDatum: Timestamp | null;
  eindDatum: Timestamp | null;
  beschrijving: string;
  isHuidigeFunctie: boolean;
}

export interface Education {
  id: string;
  opleiding: string;
  instituut: string;
  startDatum: Timestamp | null;
  eindDatum: Timestamp | null;
  beschrijving: string;
  isHuidigeOpleiding: boolean;
}

export interface Internship {
  id: string;
  functie: string;
  bedrijf: string;
  startDatum: Timestamp | null;
  eindDatum: Timestamp | null;
  beschrijving: string;
  isHuidigeStage: boolean;
}

export interface Certificate {
  id: string;
  naam: string;
  uitgever: string;
  datum: Timestamp | null;
  beschrijving: string;
}

export interface Language {
  id: string;
  taal: string;
  niveau: string;
  beschrijving?: string;
}

export interface Hobby {
  id: string;
  naam: string;
  beschrijving?: string;
}

export interface Skill {
  id: string;
  naam: string;
  type: 'soft' | 'hard';
  niveau: number; // 1-5 scale
  beschrijving?: string;
}

export interface DetailedCV {
  overMij: string;
  werkervaring: WorkExperience[];
  opleiding: Education[];
  stages: Internship[];
  certificaten: Certificate[];
  talen: Language[];
  hobbys: Hobby[];
  vaardigheden: Skill[];
}

export type CVSection = 'overMij' | 'werkervaring' | 'opleiding' | 'stages' | 'certificaten' | 'talen' | 'hobbys' | 'vaardigheden'; 