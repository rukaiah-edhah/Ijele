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

// export const DaisyUICarousel: React.FC<Iimg> = (imgArr: Iimg) => {
const DaisyUICarousel = (imgArr: string[]) => {
    return (
        <div className="carousel w-full h-screen"  data-carousel="slide">
            {imgArr.map((url, i) => {
                return (
                    <div className="carousel-item w-full duration-700 ease-in-out" data-carousel-item>
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

export default DaisyUICarousel
// export default function DaisyUICarousel({
//     imgs,
//     carouselId,
//     classNameCarousel,
//     classNameForImage,
//     isAutoPlay = true,
//     autoPlayMilliseconds = 5000,
// }: IProps) {
//     const [activeIndex, setActiveIndex] = useState<number>(0);
//     const handleClickBtn = (
//         event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//         i: number
//     ) => {
//         event.preventDefault();
//         const btn = event.currentTarget;
//         const url = btn.getAttribute("url")!;
//         goToOtherImage(url, carouselId);
//         setActiveIndex(i);
//     };

//     useEffect(() => {
//         if (isAutoPlay) {
//             const intervalId = setInterval(() => {
//                 const newActiveIndex =
//                     activeIndex + 1 === imgs.length ? 0 : activeIndex + 1
//                 goToOtherImage(`#DaisyUICarousel_img_${newActiveIndex}`, carouselId);
//                 setActiveIndex(newActiveIndex);
//             }, autoPlayMilliseconds);
//             return () => clearInterval(intervalId);
//         }
//     }, [activeIndex, autoPlayMilliseconds, carouselId, imgs.length, isAutoPlay]);
//     return (
//         <div className="relative">
//             <div
//                 id={carouselId}
//                 className="carousel" {classNameCarousel}
//             >
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
//             <div className="flex justify-center w-full py-2 gap-2  absolute bottom-3">
//                 {imgs.map((img, i) => {
//                     return (
//                         <a
//                             onClick={(e) => handleClickBtn(e, i)}
//                             key={`DaisyUICarousel_img_point_${i}`}
//                             href={`#DaisyUICarousel_img_${i}`}
//                             className={classNames(
//                                 activeIndex !== i && " opacity-30",
//                                 "btn btn-xs btn-circle"
//                             )}
//                         ></a>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
