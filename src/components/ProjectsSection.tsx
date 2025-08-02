import { Fragment, useState, type ReactElement } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { codemirrorIcon, electronIcon, expoIcon, figmaIcon, githubIcon, gitIcon, jotaiIcon, markdownIcon, reactIcon, tailwindCSSIcon, typescriptIcon, viteIcon } from "./Icons";
import markNoteImage from '/images/MarkNote_app_cover.png'
import rugbyRadarImage from '/images/Rugby_Radar_Poster.jpg'
import portfolioWebsiteImage from '/images/portfolio_website_cover.png';
import { motion, stagger } from "motion/react"


export const ProjectsSection = () => {


    const projects = [
        {
            title: "This portfolio website!",
            description: "A portfolio website built from scratch using React, Vite and Tailwind CSS.",
            projectLink: "https://github.com/markom9822/markom9822.github.io",
            startDate: new Date(2025, 6, 28),
            image: portfolioWebsiteImage,
            techUsed: [reactIcon, viteIcon, typescriptIcon, tailwindCSSIcon, gitIcon, figmaIcon],
        },
        {
            title: "MarkNote App",
            description: "A personal desktop Markdown note taking application developed using React and Electron.",
            projectLink: "https://github.com/markom9822/MarkNote-App",
            startDate: new Date(2024, 2, 29),
            image: markNoteImage,
            techUsed: [reactIcon, electronIcon, typescriptIcon, tailwindCSSIcon, markdownIcon, jotaiIcon, codemirrorIcon, gitIcon],
        },
        {
            title: "Rugby Radar App",
            description: "A sports mobile application built with React Native and Expo. Provides real-time information on fixtures, stats, standings and more from 10+ rugby leagues around the world.",
            projectLink: "https://github.com/markom9822/rugbyRadar_app",
            startDate: new Date(2024, 6, 12),
            image: rugbyRadarImage,
            techUsed: [reactIcon, typescriptIcon, expoIcon, gitIcon, figmaIcon],
        },
    ];

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

                projects
            </motion.h2>

            <motion.p
                className="text-lg text-zinc-400 font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Projects that I have built in my spare time.
            </motion.p>

            <motion.div
                className="mt-10 flex flex-col w-full"
                initial='hidden'
                animate='show'
                variants={containerVariant}>

                {projects.map(({ title, description, projectLink, startDate, image, techUsed }, index) => (

                    <ProjectPanel title={title} description={description} projectLink={projectLink}
                        startDate={startDate} image={image} techUsed={techUsed} index={index} />

                ))}

            </motion.div>

        </motion.div>
    )
}


type ProjectPanelProps = {

    title: string,
    description: string,
    projectLink: string,
    startDate: Date,
    image: any,
    techUsed: ReactElement[],
    index: number

}

export const ProjectPanel = ({ title, description, projectLink, startDate, image, techUsed, index }: ProjectPanelProps) => {

    const panelVariant = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <motion.div
            variants={panelVariant}
            animate={{ transition: { ease: "easeOut" } }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="px-2.5 py-1 text-sm bg-zinc-900 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">{index + 1}</div>
                        <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text">{title}</h3>
                    </div>

                    <div className="flex flex-row items-center space-x-3">
                        <p className="font-text text-sm p-1 text-zinc-400 group-hover:text-zinc-300 transition">Started: {formattedDate}</p>
                        <button
                            className="p-1 text-zinc-500 group-hover:text-zinc-300 transition">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="mt-4 w-full">

                    <div className="flex flex-row w-full">

                        <div className="w-2/3 p-1">
                            <p className="text-sm text-zinc-400 mb-6 font-text">
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
                        </div>

                        <div className="w-1/3 flex items-center justify-center border-l-2 border-l-zinc-500">
                            <img
                                src={image}
                                className="rounded w-80" />
                        </div>
                    </div>


                    <div className="flex flex-col space-y-2">

                        <h3 className="font-text text-xs text-zinc-400">TECH USED:</h3>

                        <div className="w-2/3 flex flex-row flex-wrap space-x-1 space-y-2 mb-3 p-1">
                            {techUsed.map((img, index) => (
                                <div className="mx-4" key={index}>
                                    {img}
                                </div>
                            ))}
                        </div>
                    </div>

                    <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-text"
                        style={{ color: '#9e75f0' }}
                    >
                        <div className="flex flex-row space-x-2 items-center hover:text-purple-300 transition my-1">
                            {githubIcon}
                            <p>View on GitHub</p>
                            <GoArrowUpRight size={25} />
                        </div>
                    </a>
                </div>
            )}

        </motion.div>
    )
}

