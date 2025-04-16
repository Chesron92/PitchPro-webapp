import { Timestamp } from 'firebase/firestore';

// Type voor een individueel bericht
export interface Message {
  id: string;
  senderId: string; // ID van de verzender
  text: string;
  timestamp: Timestamp;
  read: boolean;
  // Optionele velden voor uitbreidingen
  attachments?: {
    url: string;
    type: 'image' | 'document' | 'other';
    name: string;
  }[];
}

// Type voor een chat tussen twee gebruikers
export interface Chat {
  id: string; 
  participants: string[]; // Array met user IDs van de deelnemers
  lastMessage?: string; // Tekst van het laatste bericht
  lastMessageTimestamp?: Timestamp; // Timestamp van het laatste bericht
  unreadCount: number | Record<string, number>; // Aantal ongelezen berichten, of een object met userId -> aantal
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interface voor een chat met uitgebreide gebruikersgegevens
export interface ChatWithUserDetails extends Chat {
  otherUser: {
    id: string;
    displayName: string;
    photoURL?: string;
    role?: string;
    // Andere relevante gebruikersinfo
  };
} 