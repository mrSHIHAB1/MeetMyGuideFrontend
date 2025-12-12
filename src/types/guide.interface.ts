export interface IGuide {
    _id?: string;
    id?: string; // Keep for backward compatibility
    email: string;
    name: string;
    address:string,
    isVerified:boolean,
    isblocked:boolean,
    isActive:boolean,
    picture?: string | null;
    profilePhoto?: string | null; // Alternative field name
    contactNumber?: string;
    phone?: string; // Alternative field name
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
