export interface User {
  id: string;
  displayName: string;
  email: string;
  imageURL?: string | null;
  token: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  displayName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  city: string;
  country: string;
}
