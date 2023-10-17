export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type Message = {
  id: number;
  message: string;
  sentAt: string;
};

export type UserMessage = {
  userId: number;
  messages: Message[];
};
