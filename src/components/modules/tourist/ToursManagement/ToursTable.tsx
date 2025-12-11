"use client";

import { useState } from "react";
import { ITour } from "@/types/tour.interface";
import { Button } from "@/components/ui/button";
import TourViewDialog from "./TourViewDiaglog";
import { IBooking } from "@/types/booking.interface";


interface ToursTableProps {
  tours: IBooking[];
}

const ToursTable = ({ tours }: ToursTableProps) => {
  const [selectedTour, setSelectedTour] = useState<IBooking | null>(null);

  return (
    <>
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Available Tours</h2>

        {tours.length === 0 ? (
          <p className="text-center text-muted-foreground">No tours found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {tours.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">

                  <td className="border p-2">{tour.status} BDT</td>
                  <td className="border p-2 text-center">
                    <Button
                      size="sm"
                      onClick={() => setSelectedTour(tour)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Dialog */}
      <TourViewDialog
        open={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </>
  );
};

export default ToursTable;
