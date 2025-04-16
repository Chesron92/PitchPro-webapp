export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  isFullTime?: boolean;
  isRemote?: boolean;
  status?: string;
  requirements?: string;
  createdAt?: any;
  updatedAt?: any;
  userId?: string;
  recruiterId?: string;
}

export interface JobApplication {
  id?: string;
  jobId: string;
  userId: string;
  recruiterId: string;
  jobTitle?: string;
  companyName?: string;
  applicantName?: string;
  
  // Sollicitatie gegevens
  motivationLetter: string;
  cvUrl?: string;
  
  // Extra informatie
  phoneNumber?: string;
  email?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  
  // Status informatie
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  applicationDate: any;
  updatedAt?: any;
  
  // Extra velden
  notes?: string;
  [key: string]: any;
} 