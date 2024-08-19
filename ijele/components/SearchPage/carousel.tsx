import { useEffect, useState } from "react";
import Image from 'next/image'


export const StaticCarousel = (imgArr: string[], millisec: number) => {
    return (
        <div className="carousel w-full h-screen" id="carouselId">
            {imgArr.map((url, i) => {
                return (
                    <div key={`DaisyUICarousel_item_${i}`} className="carousel-item w-full duration-700 ease-in-out" >
                        <Image
                            src={url}
                            className="w-full"
                            alt="HotelCarousel component"
                            key={`DaisyUICarousel_img_${i}`}
                            id={`DaisyUICarousel_img_${i}`}
                            width={100}
                            height={100} />

                    </div>
                )
            }
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

export const AutoCarousel = (imgArr: string[], carouselId: string, millisec: number, isVisible: boolean) => {
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

    if (isVisible)
        return (

            <div className="carousel w-full h-screen" id={carouselId}>
                {imgArr.map((url, i) => {
                    return (
                        <div key={`DaisyUICarousel_item_${i}`} className="carousel-item w-full duration-700 ease-in-out" >
                            <Image
                                src={url}
                                className="w-full"
                                alt="HotelCarousel component"
                                key={`DaisyUICarousel_img_${i}`}
                                id={`DaisyUICarousel_img_${i}`}
                                width={100}
                                height={100} />
                        </div>
                    )
                }
                )}
            </div >
        )
    else
        return (
            <>
            </>
        )
}
