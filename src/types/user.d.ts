
export interface UserDataResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

interface UserUpdateInput {
  email?: string;
  password?: string;
  name?: string;
}

