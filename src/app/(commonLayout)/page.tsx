import { Hero } from "@/components/Hero";
import PackageSection from "@/components/PackageSection";
import Experience from "@/components/Experience";
import FrequentlyAskedQuestion from "@/components/shared/FrequentlyAskedQuestion";
import Contact from "@/components/shared/Contact";
import Featured from "@/components/shared/Featured";
import { getExploreAllTour } from "@/services/tourist/toursManagement";
import { FeatuerdTour, FeaturedGuide } from "@/services/tour/Featuredtour";
import { getTourById } from "@/services/tourist/touristManagement";
import { getGuideById } from "@/services/admin/guidesManagement";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Suspense } from "react";

export default async function Home() {
  const featuredResult = await FeatuerdTour();
  if (!featuredResult.success) {
    return <p>Failed to load featured tours</p>;
  }
  const tourIds = featuredResult.data.map((item: { tour: string }) => item.tour);
  const tours = await Promise.all(tourIds.map((id: string) => getTourById(id)));
  const mergedTours = tours.map((tour, index) => ({
    ...tour,
    totalBookings: featuredResult.data[index].totalBookings,
  }));

  const featuredGuidesResult = await FeaturedGuide();
  if (!featuredGuidesResult.success) {
    return <p>Failed to load featured guides</p>;
  }
  
  // Extract guide IDs
  const guideIds = featuredGuidesResult.data.map(
    (item: { guide: string }) => item.guide
  );
  
  // Fetch guide details
  const guidesData = await Promise.all(
    guideIds.map((id: string) => getGuideById(id))
  );
  
  // Merge averageRating and totalReviews from FeaturedGuide API
  const mergedGuides = guidesData.map((guide, index) => ({
    ...guide,
    averageRating: featuredGuidesResult.data[index].averageRating,
    totalReviews: featuredGuidesResult.data[index].totalReviews,
  }));
  
console.log("merged Guides",mergedGuides)
  return (
    <div className="">
      <Hero />
            {/* <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <Featured tours={mergedTours} />
            </Suspense> */}
      <Featured tours={mergedTours} />
      {/* You can add a FeaturedGuides component here */}
      <FrequentlyAskedQuestion guides={mergedGuides}/>
      <PackageSection />
      <Experience />
      <Contact id="contact" />
    </div>
  );
}

