import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";


export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    address?: string;
    picture?: string;
    needPasswordChange: boolean;
    status: "ACTIVE" | "BLOCKED" | "DELETED";
    admin?: IAdmin;
    tourist?:any
    guide?:any
  
    createdAt: string;
    updatedAt: string;
}