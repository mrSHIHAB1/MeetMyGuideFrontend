import { Hero } from "@/components/Hero";
import PackageSection from "@/components/PackageSection";
import Experience from "@/components/Experience";
import FrequentlyAskedQuestion from "@/components/shared/FrequentlyAskedQuestion";
import Contact from "@/components/shared/Contact";
import Featured from "@/components/shared/Featured";
import { getExploreAllTour } from "@/services/tourist/toursManagement";

export default async function Home() {
  const tour= await getExploreAllTour();

  return <div>
    <Hero></Hero>
    <Featured tour={tour.data}></Featured>
    <PackageSection></PackageSection>
    <Experience></Experience>
    <FrequentlyAskedQuestion></FrequentlyAskedQuestion>
    <Contact id="contact"></Contact>
  </div>;
}
