
export enum TourStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ITour {
  _id?: string;          // Optional MongoDB ObjectId
  title: string;                 // Required
  description?: string;          // Optional
  itinerary?: string;            // Optional
  fee: number;                   // Required
  duration: number;              // Required (in hours)
  meetingPoint?: string;         // Optional
  maxGroupSize?: number;         // Optional
  images?: string[];             // Optional array of image URLs
  guide?: string;        // Optional reference to a Guide
  isDeleted?: boolean;           // Optional soft delete flag
  status?: TourStatus;           // Optional tour status
  createdAt?: Date;              // Optional timestamp
  updatedAt?: Date;              // Optional timestamp
}
