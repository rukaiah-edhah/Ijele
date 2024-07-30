import Navbar from "@/components/navbar";
import HotelSideBar from "@/components/SearchPage/hotel-sidebar";
import SearchNav from "@/components/SearchPage/search-nav";

// test
export default function HomePage(){
    return (
        <>
        <Navbar />    
        <h1>Component test page</h1>
        <HotelSideBar/>
        </>
    )
}