import { getTourById } from "@/services/admin/toursManagement";

interface Props {
    params: { id: string };
  }
  
  export default async function TourPage({ params }: Props) {
    const { id } = await params;
  
    // fetch tour data using id
    const tourResponse = await getTourById(id);
  const  tour=tourResponse.data
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">{tour.title}</h1>
        <p>{tour.title}</p>
      </div>
    );
  }
  