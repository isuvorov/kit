import { Request as ExpressRequest } from 'express';

export interface User {
  _id?: string;
  email: string;
  role: string;
  password: string;
  companyId: string;
}

export type UserDto = {
  email: string;
  password?: string;
  passwordHash?: string;
};

export interface Session {
  _id?: string;
  user: User;
}

export interface SessionData {
  id?: string;
  user?: Partial<User>;
  regenerate(any): void;
  save(any): void;
}

export type Request = ExpressRequest & { session: any };

// export interface Request extends ExpressRequest {
//   session: SessionData; // & Express.Session;
// }
