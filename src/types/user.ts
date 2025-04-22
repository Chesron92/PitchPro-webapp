import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { DetailedCV } from './cv';

// Mogelijke gebruikersrollen (in zowel Nederlands als Engels)
export type UserRole = 'werkzoekende' | 'jobseeker' | 'recruiter' | 'admin';

// Gemeenschappelijke adresvelden die worden gebruikt in verschillende plaatsen
export interface AddressFields {
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

// Basis gebruikerstype
export interface BaseUser {
  id: string;
  email: string;
  role: UserRole;
  detailedCV?: DetailedCV;
  // Alle overige velden die we niet specifiek kennen accepteren we ook
  [key: string]: any;
}

// Uitgebreid gebruikerstype met profiel
export interface UserProfile extends BaseUser {
  bio?: string;
  phone?: string;
}

/**
 * Bepaalt of een gebruiker een werkzoekende is
 */
export function isJobSeeker(user: BaseUser | null): boolean {
  if (!user) return false;
  return user.role === 'werkzoekende' || user.role === 'jobseeker';
}

/**
 * Bepaalt of een gebruiker een recruiter is
 */
export function isRecruiter(user: BaseUser | null): boolean {
  if (!user) return false;
  return user.role === 'recruiter';
}

// Type voor een geauthenticeerde gebruiker van Firebase
export interface AuthUser extends FirebaseUser {
  userProfile?: UserProfile;
}

// Soorten login methodes
export type LoginMethod = 'email' | 'google' | 'facebook';

// Status van authenticatie
export type AuthStatus = 'initial' | 'authenticated' | 'unauthenticated';

// Context object voor authenticatie
export interface AuthContextType {
  user: AuthUser | null;
  userData: BaseUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  register: (email: string, password: string, userData: BaseUser) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<BaseUser>) => Promise<any>;
  resetPassword: (email: string) => Promise<void>;
}

// Deze interfaces vertegenwoordigen de ideale structuur, maar alle velden zijn optioneel
// om compatibel te blijven met bestaande data die mogelijk niet alle velden heeft
export interface JobSeekerProfile extends UserProfile {
  skills?: string[];
  cv?: string;
  availability?: string;
  experience?: any[];
  education?: any[];
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  isAvailableForWork?: boolean;
  pitchVideo?: string; // URL naar de persoonlijke video pitch
}

export interface RecruiterProfile extends UserProfile {
  company?: string;
  companyLogo?: string;
  companyWebsite?: string;
  companyDescription?: string;
  position?: string;
  kvkNumber?: string;
  industry?: string;
}

// Nog steeds de ideale interfaces, maar met alle velden optioneel
export interface JobSeeker extends BaseUser {
  role: 'werkzoekende' | 'jobseeker';
  profile?: JobSeekerProfile; // Optioneel omdat sommige profielen dit misschien niet hebben
}

export interface Recruiter extends BaseUser {
  role: 'recruiter';
  profile?: RecruiterProfile; // Optioneel omdat sommige profielen dit misschien niet hebben
}

/**
 * Bepaalt de rol van een gebruiker op basis van hun profielgegevens
 */
export function getUserRole(user: BaseUser | null): UserRole | null {
  if (!user) return null;
  if (isJobSeeker(user)) return 'jobseeker';
  if (isRecruiter(user)) return 'recruiter';
  return null;
}

export type User = JobSeeker | Recruiter;

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

export interface IDetailedCV {
  overMij: string;
  werkervaring: WorkExperience[];
  opleiding: Education[];
  stages: Internship[];
  certificaten: Certificate[];
  talen: Language[];
  hobbys: Hobby[];
} 