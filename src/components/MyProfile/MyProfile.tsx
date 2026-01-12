"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    // Add your update logic here
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        {/* Left: Profile Photo */}
        <Card className="lg:col-span-1 flex flex-col items-center">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                {previewImage || userInfo.picture ? (
                  <AvatarImage
                    src={previewImage || userInfo.picture}
                    alt={userInfo.name}
                  />
                ) : (
                  <AvatarFallback className="text-3xl">
                    {getInitials(userInfo.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="file"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
              >
                <Camera className="h-4 w-4" />
                <Input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isPending}
                />
              </label>
            </div>

            <div className="text-center">
              <p className="font-semibold text-lg">{userInfo.name}</p>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
              <p className="text-xs text-gray-400 mt-1 capitalize">
                {userInfo.role.toLowerCase()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right: Personal Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={userInfo.name}
                  disabled={isPending}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={userInfo.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={userInfo.phone || ""}
                  disabled={isPending}
                />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={userInfo.address || ""}
                  disabled={isPending}
                />
              </div>

              {/* Add role-specific fields if needed */}
              {userInfo.role === "GUIDE" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      defaultValue={userInfo.guide?.experience || ""}
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentFee">Appointment Fee</Label>
                    <Input
                      id="appointmentFee"
                      name="appointmentFee"
                      type="number"
                      defaultValue={userInfo.guide?.appointmentFee || ""}
                      disabled={isPending}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-blue-500"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default MyProfile;
