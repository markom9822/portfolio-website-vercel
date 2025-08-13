import { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { motion, stagger, AnimatePresence } from "motion/react"
import type { PostDB } from "../pages/AdminPosts";

type PostsSectionProps = {
    posts: PostDB[]
}

export const PostsSection = ({ posts }: PostsSectionProps) => {

    const containerVariant = {
        hidden: {},
        show: {
            transition: {
                delayChildren: stagger(0.1)
            }
        }
    }

    const itemVariant = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    const sortedPosts = posts.sort((a, b) => {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();

        return dateB - dateA;
    });

    return (
        <motion.div
            className="space-y-4 w-full"
            initial='hidden'
            animate='show'
            variants={containerVariant}>

            <motion.h2
                className="text-xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-title"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Posts
            </motion.h2>

            <motion.p
                className="text-xs sm:text-sm md:text-lg lg:text-2xl text-zinc-800 font-type-bold"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Blog posts on topics that I have interest in.
            </motion.p>

            <motion.div
                className="flex flex-col w-full"
                initial='hidden'
                animate='show'
                variants={containerVariant}>

                {sortedPosts.map(({ title, description, publishDate, blogLink, imageName }, index) => (
                    <BlogPostPanel key={index} title={title} description={description} publishDate={publishDate} blogLink={blogLink} imageName={imageName} index={index} />
                ))}

            </motion.div>
        </motion.div>
    )
}

type BlogPostPanelProps = {

    title: string,
    description: string,
    publishDate: string,
    blogLink: string,
    imageName: string,
    index: number,
}

export const BlogPostPanel = ({ title, description, publishDate, blogLink, imageName, index }: BlogPostPanelProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const panelVariant = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    const formattedDate = new Date(publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <motion.div
            variants={panelVariant}
            animate={{ transition: { ease: "easeOut" } }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-3 border-dashed border-b-zinc-600 flex flex-row justify-between items-center w-full gap-x-2 pb-1 md:pb-2">

                    <div className="flex flex-row items-center w-4/6">
                        <div className="w-1/10 flex">
                            <div className="w-2/3 px-1 md:px-2.5 py-1 text-[0.50rem] text-center flex justify-center sm:text-xs md:text-sm lg:text-base font-bold font-title text-zinc-500 group-hover:text-zinc-900 rounded transition">{index + 1}</div>
                        </div>

                        <h3 className="w-9/10 px-3 flex justify-start text-xs sm:text-lg md:text-xl lg:text-2xl font-semibold text-zinc-600 group-hover:text-zinc-900 group-hover:translate-x-1 transition font-type-bold ">{title}</h3>
                    </div>
                    <div className="flex flex-row items-center text-[0.50rem] sm:text-sm md:text-base lg:text-lg w-2/6">
                        <p className=" w-2/3 flex justify-center font-type-bold  p-1 text-zinc-700 group-hover:text-zinc-800 transition">Published: {formattedDate}</p>
                        <motion.div
                            animate={{ rotate: isOpen ? -180 : 0 }}
                            transition={{ duration: 0.06, ease: "easeInOut" }}
                            className="w-1/3 p-1 text-zinc-700 group-hover:text-zinc-800 transition flex items-center justify-center">
                            <FaChevronDown />
                        </motion.div>
                    </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen ? (
                    <BlogPostInfoPanel description={description} blogLink={blogLink} imageName={imageName} />
                ) : null}
            </AnimatePresence>

        </motion.div>
    )
}

type BlogPostInfoPanelProps = {

    description: string,
    blogLink: string,
    imageName: string,
}

export const BlogPostInfoPanel = ({ description, blogLink, imageName }: BlogPostInfoPanelProps) => {


    const menuVariants = {
        closed: {
            scaleY: 0,
            opacity: 0,
            originY: 0,
            transition: { duration: 0.15 }
        },
        open: {
            scaleY: 1,
            opacity: 1,
            originY: 0,
            transition: { duration: 0.2 }
        },
    };

    return (
        <motion.div
            className=" w-full"
            initial="closed"
            animate="open"
            exit="closed"
            key="modal"
            variants={menuVariants}>

            <div className="flex flex-col w-full" key="content">

                <div className="max-w-md flex items-center justify-start md:py-2">
                    <img
                        src={`/images/${imageName}`}
                        alt="Post"
                        loading="eager"
                        className="rounded border-1 border-emerald-500" />
                </div>

                <p className="text-[0.60rem] sm:text-sm md:text-base lg:text-lg text-zinc-900 lg:mb-3 font-type-bold w-full p-1">
                    {description.split('\n').map((line, index, arr) => (
                        <Fragment key={index}>
                            {line}
                            {index < arr.length - 1 && (
                                <>
                                    <br />
                                </>
                            )}
                        </Fragment>
                    ))}
                </p>
            </div>

            <a
                href={blogLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-type-bold text-[0.60rem] sm:text-base md:text-lg lg:text-xl"
                key="link"
                style={{ color: '#9e75f0' }}
            >
                <div className="flex flex-row space-x-1 items-center hover:text-purple-700 transition">
                    <p>Read more</p>
                    <GoArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                </div>
            </a>
        </motion.div>
    )
}