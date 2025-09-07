
export type ImageStatus = 'idle' | 'loading' | 'done' | 'error';

export interface GeneratedImage {
  status: ImageStatus;
  url?: string;
  error?: string;
}

export interface GeneratedImageMap {
  [country: string]: GeneratedImage;
}

// --- Data Types ---
export interface Country {
  name: string;
  emoji: string;
}

// --- Auth Types ---
// FIX: Redefined User type to include custom properties like 'credits' and 'displayName'
// and use 'id' instead of 'uid' to align with Supabase conventions, fixing type errors.
export interface User {
  id: string;
  email?: string;
  displayName?: string;
  credits?: number;
}

// FIX: Updated AuthContextType to match the actual implementation in AuthContext.tsx,
// adding 'login' and 'signup' and removing unimplemented Supabase-specific methods.
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
}

// --- Theme Types ---
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}