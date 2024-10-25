export interface Element {
  id: string;
  name: string;
  createdAt: string;
  avatar: string;
  username?: string;
  password?: string;
  email?: string;
  lastName?: string;
}

export type OPElement = Partial<Element>;
