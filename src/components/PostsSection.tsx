import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import healthTrackerImage from '/images/health_tracker.png'
import insideShapesImage from '/images/inside_shape.png';
import { GoArrowUpRight } from "react-icons/go";


export const PostsSection = () => {

    const blogPosts = [
        {
            title: "Health Tracker",
            description: "Automated health tracker system to help keep you on track. Presents your data in a readable format with graphs and statistics." +
                "\nThe system uses Google Forms, Google Sheets, Looker Studio and Google Apps Script. Health related data is sent from your Garmin watch and sent to your Google Drive." +
                " At a scheduled time a script is triggered to find the latest data sent, this data is processed and stored in a Google Sheet document along with your daily input into the Google Form.\n" +
                "This is finally displayed with graphs and statistics on a page in Looker Studio.",
            publishDate: new Date(2024, 4, 31),
            blogLink: "https://medium.com/@markomeara98/health-tracker-using-google-forms-sheets-f5107471aec3",
            image: healthTrackerImage,
        },
        {
            title: "Inside Shapes",
            description: "An exploration into algorithms to determine if a point is inside of different shapes.\n" + 
            "Built an algorithm to check if a point is inside of a 2D polygon of arbitrary shape and size. This is a well known problem in computer graphics and my approach solves this using a ray cast algorithm." + 
            "This works by checking the number of intersections between a ray in one direction and the boundaries of our shape, giving efficient and accurate results.\n" + 
            "Also built a method to check if a point is inside of a cuboid using vector projections in 3D space (via the dot product).",
            publishDate: new Date(2023, 5, 5),
            blogLink: "https://medium.com/@markomeara98/check-inside-shapes-in-unity-99253fd3d815",
            image: insideShapesImage,
        },
    ];

    return (
        <div className="space-y-4">

            <h2 className="text-4xl font-bold font-text">
                posts
            </h2>

            <p className="text-lg text-zinc-400 font-text">
                Blog posts on topics that I have interest in.
            </p>

            <div className="mt-10 flex flex-col w-full space-y-5">

                {blogPosts.map(({ title, description, publishDate, blogLink, image }) => (
                    <BlogPostPanel title={title} description={description} publishDate={publishDate} blogLink={blogLink} image={image} />
                ))}

            </div>
        </div>
    )
}


type BlogPostPanelProps = {

    title: string,
    description: string,
    publishDate: Date,
    blogLink: string,
    image: any,
}

export const BlogPostPanel = ({ title, description, publishDate, blogLink, image }: BlogPostPanelProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = publishDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })


    return (
        <div className="p-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex flex-row justify-between items-center border-b-2 border-b-zinc-500 p-2 w-full rounded">
                <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition mb-2 font-text">{title}</h3>

                <div className="flex flex-row items-center space-x-3">
                    <p className="font-text text-sm p-1 text-zinc-400 group-hover:text-zinc-300 transition">Published: {formattedDate}</p>
                    <button
                        className="p-1 text-zinc-500 group-hover:text-zinc-300 transition">
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>

            </button>

            {isOpen && (
                <div className="mt-4 w-full">

                    <div className="flex flex-row w-full">

                        <p className="text-sm text-zinc-400 mb-6 font-text w-2/3 p-1">
                            {description.split('\n').map((line, index, arr) => (
                                <Fragment key={index}>
                                    {line}
                                    {index < arr.length - 1 && (
                                        <>
                                            <br />
                                            <br />
                                        </>
                                    )}
                                </Fragment>
                            ))}
                        </p>

                        <div className="w-1/3 flex items-center justify-center border-l-2 border-l-zinc-500">
                            <img
                                src={image}
                                loading="eager"
                                className="rounded w-70" />
                        </div>
                    </div>

                    <a
                        href={blogLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-text"
                        style={{ color: '#9e75f0' }}
                    >
                        <div className="flex flex-row space-x-1 items-center hover:text-purple-300 transition">
                            <p>Read more</p>
                            <GoArrowUpRight size={25}/>
                        </div>
                        
                    </a>
                </div>
            )}

        </div>
    )
}