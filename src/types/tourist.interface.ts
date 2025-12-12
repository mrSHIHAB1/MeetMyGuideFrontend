export interface ITourist {
    _id?: string;
    id?: string; // Keep for backward compatibility
    email: string;
    name: string;
    picture?: string | null;
    address:string,
    isVerified:boolean,
    isblocked:boolean,
    profilePhoto?: string | null; // Alternative field name
    contactNumber?: string;
    phone?: string; // Alternative field name
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
