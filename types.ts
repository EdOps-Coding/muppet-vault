
export interface Muppet {
  id: string;
  name: string;
  performer: string;
  description: string;
  imageUrl: string;
  firstAppearance: string;
  bestKnownFor: string;
  era: 'Classic' | 'Modern' | 'Both';
}

export interface ShowInfo {
  title: string;
  years: string;
  format: string;
  keyFeatures: string[];
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
