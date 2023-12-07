export interface UserInteface {
    name: string,
    email: string,
    id: number,
    created_at: Date,
    updated_at: Date,
}

export enum RolesUser {
    "admin" = "admin",
    "user" = "user"
}