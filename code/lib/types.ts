// Draft structure for localStorage persistence
export interface Draft {
  id: string;
  name: string;
  inputNotes: string;
  newsletter: string;
  conversationHistory: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Message structure for conversation history
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// API request for generation
export interface GenerateRequest {
  inputNotes: string;
  conversationHistory?: Message[];
}

// API response for generation
export interface GenerateResponse {
  newsletter: string;
  conversationHistory: Message[];
}

// API error response
export interface ErrorResponse {
  error: string;
  message: string;
}
