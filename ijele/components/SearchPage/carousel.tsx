import { useEffect, useState } from "react";



// type IProps = {
//     imgs: Iimg[];
//     carouselId: string;
//     classNameCarousel?: string;
//     classNameForImage?: string;
//     isAutoPlay?: boolean;
//     autoPlayMilliseconds?: number;
// }

const goToOtherImage = (url: string, carouselId: string) => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const target = document.querySelector<HTMLDivElement>(url)!;
        const left = target.offsetLeft;
        carousel.scrollTo({ left: left });
    }
};


const Carousel = (imgArr: string[]) => {
    return (
        <div className="carousel w-full h-screen" id="carouselId">
            {imgArr.map((url, i) => {
                return (
                    <div className="carousel-item w-full duration-700 ease-in-out" >
                        <img
                            src={url}
                            className="w-full"
                            alt="HotelCarousel component"
                            key={`DaisyUICarousel_img_${i}`}
                            id={`DaisyUICarousel_img_${i}`} />
                    </div>
                )}
            )}
        </div >
    )
}


const AutoCarousel = (imgArr: string[], carouselId:string) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newActiveIndex =
                activeIndex + 1 === imgArr.length ? 0 : activeIndex + 1
            goToOtherImage(`#DaisyUICarousel_img_${newActiveIndex}`, carouselId);
            setActiveIndex(newActiveIndex);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [activeIndex, 2000, carouselId, imgArr.length]);
    return (

        <div className="carousel w-full h-screen" id={carouselId}>
            {imgArr.map((url, i) => {
                return (
                    <div className="carousel-item w-full duration-700 ease-in-out" >
                        <img
                            src={url}
                            className="w-full"
                            alt="HotelCarousel component"
                            key={`DaisyUICarousel_img_${i}`}
                            id={`DaisyUICarousel_img_${i}`} />
                    </div>
                )
            }
            )}
        </div >
    )
}
export default AutoCarousel


// export default function DaisyUICarousel({
//     imgArr: string[],
//     carouselId,
//     classNameCarousel,
//     classNameForImage,
//     autoPlayMilliseconds = 5000,
// }: Iimg) {
//     const [activeIndex, setActiveIndex] = useState<number>(0);

//     useEffect(() => {
//
//             const intervalId = setInterval(() => {
//                 const newActiveIndex =
//                     activeIndex + 1 === imgs.length ? 0 : activeIndex + 1
//                 goToOtherImage(`#DaisyUICarousel_img_${newActiveIndex}`, carouselId);
//                 setActiveIndex(newActiveIndex);
//             }, autoPlayMilliseconds);
//             return () => clearInterval(intervalId);
//     }, [activeIndex, autoPlayMilliseconds, carouselId, imgs.length, isAutoPlay]);


//     return (
//         <div className="relative">
//             <div
//                 id={carouselId}
//                 className="carousel" {classNameCarousel}>

//                 {imgs.map((img, i) => {
//                     return (
//                         <div
//                             key={`DaisyUICarousel_img_${i}`}
//                             id={`DaisyUICarousel_img_${i}`}
//                             className={"carousel-item w-full bg-center bg-cover bg-no-repeat"}
//                             style={{
//                                 backgroundImage: `url(${img.src})`,
//                             }}
//                         ></div>
//                     );
//                 })}
//             </div>
//
//         </div>
//     );
// }
