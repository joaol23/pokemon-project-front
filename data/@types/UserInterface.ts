export interface UserInteface {
    name: string,
    email: string,
    id: number,
    role: RolesUser
}

export enum RolesUser {
    "admin" = "admin",
    "user" = "user"
}