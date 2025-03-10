export interface LoginDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const emptyLoginDto : LoginDto = {
  email: "",
  password: "",
  rememberMe: false
}
