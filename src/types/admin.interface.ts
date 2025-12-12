export interface IAdmin {
    _id?: string;
    id?: string; // Keep for backward compatibility
    email: string;
    name: string;
    picture?: string | null;
    profilePhoto?: string | null; // Alternative field name
    contactNumber?: string;
    phone?: string; // Alternative field name
    isActive:boolean
    address?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
