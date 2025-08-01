import type { ReactElement } from "react"

type ImagesMarqueeProps = {

    images: ReactElement[],
}

export const ImagesMarquee = ({ images }: ImagesMarqueeProps) => {

    if(images.length < 1)
    {
        return null;
    }

    return (
        <div className="overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap">

               {images.map((img, index) => (
                    <div className="mx-6" key={index}>
                        {img}
                    </div>
                ))}
                
            </div>
        </div>

    )



}