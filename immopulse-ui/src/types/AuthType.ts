
export interface SignInResponse {
    message: number;
  //  user: User;
}
export interface MeResponse {
    id: number;
    username: string;
    role: string;

}

export interface LogoutResponse {
    message: string;
}
export interface SignUpResponse {
    message: string;
    userId: string;
}

export interface SignUpRequest {
    username: string;
    password: string;
    role: string;
}

export interface LoginRegisterRequest {
    userId: string;
    email: string;
    password: string;
}

export interface SignUpGoogleRequest {
    credential: string;
    clientId: string;
    select_by: string;
}
