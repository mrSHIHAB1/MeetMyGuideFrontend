
export enum TourStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum TourCategory {
  FOOD = "FOOD",
  ART = "ART",
  ADVENTURE = "ADVENTURE",
  CULTURE = "CULTURE",
  NATURE = "NATURE",
  HISTORY = "HISTORY",
  SHOPPING = "SHOPPING",
  NIGHTLIFE = "NIGHTLIFE",
  ALL = "ALL",
}

export interface ITour {
  _id?: string;          // Optional MongoDB ObjectId
  title: string;                 // Required
  description?: string;          // Optional
  destination?: string;          // City or location name
  itinerary?: string;            // Optional
  fee: number;                   // Required
  category?: TourCategory;       // Tour category
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
