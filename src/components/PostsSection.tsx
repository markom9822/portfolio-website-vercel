import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
                className="text-4xl font-bold font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                posts
            </motion.h2>

            <motion.p
                className="text-lg text-zinc-800 font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Blog posts on topics that I have interest in.
            </motion.p>

            <motion.div
                className="mt-10 flex flex-col w-full"
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
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="px-2.5 py-1 text-sm bg-zinc-200 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">{index + 1}</div>
                        <h3 className="text-xl font-semibold text-zinc-600 group-hover:text-zinc-900 group-hover:translate-x-1 transition font-text">{title}</h3>
                    </div>
                    <div className="flex flex-row items-center space-x-3">
                        <p className="font-text text-sm p-1 text-zinc-700 group-hover:text-zinc-800 transition">Published: {formattedDate}</p>
                        <div
                            className="p-1 text-zinc-700 group-hover:text-zinc-800 transition">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
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
            className="mt-4 w-full"
            initial="closed"
            animate="open"
            exit="closed"
            key="modal"
            variants={menuVariants}>

            <div className="flex flex-row w-full" key="content">

                <p className="text-sm text-zinc-900 mb-6 font-text w-2/3 p-1">
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

                <div className="w-1/3 flex items-center justify-center border-l-2 border-l-zinc-500">
                    <img
                        src={`/images/${imageName}`}
                        alt="Post"
                        loading="eager"
                        className="rounded w-70" />
                </div>
            </div>

            <a
                href={blogLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-text"
                key="link"
                style={{ color: '#9e75f0' }}
            >
                <div className="flex flex-row space-x-1 items-center hover:text-purple-700 transition">
                    <p>Read more</p>
                    <GoArrowUpRight size={25} />
                </div>
            </a>
        </motion.div>
    )
}