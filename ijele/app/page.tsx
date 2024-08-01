import Navbar from "@/components/navbar"
import SearchNav from "@/components/SearchPage/search-nav";
import AutoScrollCarousel from '@/components/Homepage/Carousel';

export default function Home() {
  return (
    <>
    <Navbar />
    <SearchNav />
    <AutoScrollCarousel />
    </>
  );
}
