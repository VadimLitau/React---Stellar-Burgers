export interface IRouteuserAuthProfile {
  name: string;
  email: string;
  password: string;
}

export interface IUserRegister {
  accesToken: string;
  refreshTokn: string;
  success: boolean;
  user: { email: string; name: string; password: string };
}

export interface IUserForgotPass {
  succes: boolean;
  message: string;
}

export interface IUserResetPassword extends IUserForgotPass {}
