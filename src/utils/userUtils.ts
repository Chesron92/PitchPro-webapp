import { 
  BaseUser, JobSeeker, Recruiter, UserRole, 
  isJobSeeker, isRecruiter, getUserRole 
} from '../types/user';

/**
 * Normaliseert gebruikersgegevens naar een consistente structuur
 * - Zorgt ervoor dat de rol (role) en userType correct zijn ingesteld
 * - Verplaatst relevante velden naar het gebruikersprofiel (profile)
 * @param userData Ruwe gebruikersgegevens
 * @returns Genormaliseerde gebruikersgegevens
 */
export function normalizeUserData(userData: any): BaseUser {
  if (!userData) return {} as BaseUser;
  
  // Maak een kopie om de originele data niet te wijzigen
  const normalizedUser = { ...userData };
  
  // Zorg ervoor dat rol correct is ingesteld
  ensureRoleFields(normalizedUser);
  
  // Zorg ervoor dat we een profile object hebben
  if (!normalizedUser.profile) {
    normalizedUser.profile = {};
  }
  
  // Verplaats velden naar profile afhankelijk van de rol
  if (isJobSeeker(normalizedUser)) {
    // Voor werkzoekenden
    const jobSeekerFields = [
      'skills', 'cv', 'availability', 'experience', 'education',
      'linkedin', 'portfolio', 'coverLetter', 'isAvailableForWork'
    ];
    
    jobSeekerFields.forEach(field => {
      if (normalizedUser[field] !== undefined && !normalizedUser.profile[field]) {
        normalizedUser.profile[field] = normalizedUser[field];
        delete normalizedUser[field];
      }
    });
  } else if (isRecruiter(normalizedUser)) {
    // Voor recruiters
    const recruiterFields = [
      'company', 'companyName', 'companyLogo', 'companyWebsite', 
      'companyDescription', 'position', 'kvkNumber', 'industry'
    ];
    
    recruiterFields.forEach(field => {
      if (normalizedUser[field] !== undefined && !normalizedUser.profile[field]) {
        normalizedUser.profile[field] = normalizedUser[field];
        // Behoud het company veld op beide locaties voor backward compatibility
        if (field !== 'company' && field !== 'companyName') {
          delete normalizedUser[field];
        }
      }
    });
    
    // Zorg ervoor dat companyName en company gesynchroniseerd zijn
    if (normalizedUser.companyName && !normalizedUser.company) {
      normalizedUser.company = normalizedUser.companyName;
    } else if (normalizedUser.company && !normalizedUser.companyName) {
      normalizedUser.companyName = normalizedUser.company;
    }
    
    if (normalizedUser.profile.companyName && !normalizedUser.profile.company) {
      normalizedUser.profile.company = normalizedUser.profile.companyName;
    } else if (normalizedUser.profile.company && !normalizedUser.profile.companyName) {
      normalizedUser.profile.companyName = normalizedUser.profile.company;
    }
  }
  
  // Verplaats adresvelden naar het address object
  if (!normalizedUser.address) {
    normalizedUser.address = {};
  }
  
  const addressFields = ['street', 'houseNumber', 'postalCode', 'city', 'country'];
  addressFields.forEach(field => {
    if (normalizedUser[field] !== undefined) {
      normalizedUser.address[field] = normalizedUser[field];
      delete normalizedUser[field];
    }
  });
  
  // Zorg ervoor dat displayName en fullName consistent zijn
  if (normalizedUser.fullName && !normalizedUser.displayName) {
    normalizedUser.displayName = normalizedUser.fullName;
  } else if (normalizedUser.displayName && !normalizedUser.fullName) {
    normalizedUser.fullName = normalizedUser.displayName;
  }
  
  // Als we firstName en lastName hebben maar geen fullName, stel die samen
  if (normalizedUser.firstName && normalizedUser.lastName && !normalizedUser.fullName) {
    normalizedUser.fullName = `${normalizedUser.firstName} ${normalizedUser.lastName}`;
    normalizedUser.displayName = normalizedUser.fullName;
  }
  
  // Zorg ervoor dat id en uid consistent zijn
  if (normalizedUser.uid && !normalizedUser.id) {
    normalizedUser.id = normalizedUser.uid;
  } else if (normalizedUser.id && !normalizedUser.uid) {
    normalizedUser.uid = normalizedUser.id;
  }
  
  return normalizedUser;
}

/**
 * Controleert of een rol geldig is
 */
export function isValidRole(role?: string): boolean {
  if (!role) return false;
  return ['werkzoekende', 'jobseeker', 'recruiter', 'admin'].includes(role);
}

/**
 * Krijgt de weergavenaam voor een rol
 */
export function getRoleDisplayName(role?: UserRole): string {
  if (!role) return '';
  
  switch(role) {
    case 'werkzoekende':
    case 'jobseeker':
      return 'Werkzoekende';
    case 'recruiter':
      return 'Recruiter';
    case 'admin':
      return 'Administrator';
    default:
      return '';
  }
}

/**
 * Zorgt ervoor dat de rolvelden correct zijn ingesteld
 */
export function ensureRoleFields(userData: any): void {
  if (!userData) return;
  
  // Normaliseer role en userType zodat ze altijd consistent zijn
  if (userData.role === 'jobseeker') {
    userData.role = 'werkzoekende';
  }
  
  if (userData.userType === 'jobseeker') {
    userData.userType = 'werkzoekende';
  }
  
  // Als role is ingesteld maar userType niet, kopieer role naar userType
  if (userData.role && !userData.userType) {
    userData.userType = userData.role;
  }
  
  // Als userType is ingesteld maar role niet, kopieer userType naar role
  if (userData.userType && !userData.role) {
    userData.role = userData.userType;
  }
}

/**
 * Zorgt ervoor dat een gebruiker de juiste data heeft voor een werkzoekende
 */
export function ensureJobSeekerProfile(user: BaseUser): JobSeeker {
  const normalizedUser = normalizeUserData(user);
  normalizedUser.role = 'werkzoekende';
  normalizedUser.userType = 'werkzoekende';
  
  // Zorg ervoor dat het profiel bestaat
  normalizedUser.profile = normalizedUser.profile || {};
  
  // Stel standaardwaarden in voor vereiste velden
  normalizedUser.profile.skills = normalizedUser.profile.skills || [];
  normalizedUser.profile.isAvailableForWork = normalizedUser.profile.isAvailableForWork ?? true;
  
  return normalizedUser as JobSeeker;
}

/**
 * Zorgt ervoor dat een gebruiker de juiste data heeft voor een recruiter
 */
export function ensureRecruiterProfile(user: BaseUser): Recruiter {
  const normalizedUser = normalizeUserData(user);
  normalizedUser.role = 'recruiter';
  normalizedUser.userType = 'recruiter';
  
  // Zorg ervoor dat het profiel bestaat
  normalizedUser.profile = normalizedUser.profile || {};
  
  // Stel standaardwaarden in voor vereiste velden
  normalizedUser.profile.companyName = normalizedUser.profile.companyName || '';
  
  return normalizedUser as Recruiter;
}

// Functie om het wachtwoord veilig uit de gebruikersgegevens te verwijderen
export function sanitizeUserData(userData: any): any {
  const { password, ...sanitizedData } = userData;
  return sanitizedData;
} 