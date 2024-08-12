import { useEffect, useState } from "react";


export const StaticCarousel = (imgArr: string[], millisec: number) => {
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

const goToOtherImage = (url: string, carouselId: string) => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const target = document.querySelector<HTMLDivElement>(url)!;
        const left = target.offsetLeft;
        carousel.scrollTo({ left: left });
    }
};

export const AutoCarousel = (imgArr: string[], carouselId:string, millisec:number) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newActiveIndex =
                activeIndex + 1 === imgArr.length ? 0 : activeIndex + 1
            goToOtherImage(`#DaisyUICarousel_img_${newActiveIndex}`, carouselId);
            setActiveIndex(newActiveIndex);
        }, millisec);
        return () => clearInterval(intervalId);
    }, [activeIndex, millisec, carouselId, imgArr.length]);
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
