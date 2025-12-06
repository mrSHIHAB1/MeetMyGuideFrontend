export interface IAdmin {
    id?: string;
    email: string;
    name: string;
    picture?: string | null;
    contactNumber: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
