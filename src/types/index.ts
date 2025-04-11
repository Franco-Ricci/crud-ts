export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  website: string,
  company: {
    name: string
  }
}
export interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  company?: string;
}
