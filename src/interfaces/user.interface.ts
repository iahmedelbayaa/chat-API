export interface IUser {
  name: string;
  email: string;
  password: string;
}

export default interface ISignupResponse {
  user: IUser;
}
