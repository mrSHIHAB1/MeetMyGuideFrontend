/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerPatientValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});
export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
    export const touristSignupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  phone: z
    .string()
    .max(11, "Phone number cannot exceed 11 digits")
    .optional(),

  address: z.string().max(200).optional(),

  bio: z.string().optional(),

  spokenLanguages: z.string().optional(),

  travelpreferences: z.string().optional(),

  file: z
    .any()
    .optional()
    .refine(
      (file) => !file || file?.size <= 2 * 1024 * 1024,
      "Image must be under 2MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/png", "image/jpeg", "image/jpg"].includes(file?.type),
      "Only JPG, JPEG, PNG allowed"
    ),
});