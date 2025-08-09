import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { githubIcon } from "./Icons";
import { motion, stagger, AnimatePresence } from "motion/react"
import type { ProjectDB } from "../pages/AdminProjects";
import { getTechUsedFromName } from "../store/techUsedOptions";

type ProjectSectionProps = {

    projects: ProjectDB[]
}

export const ProjectsSection = ({ projects }: ProjectSectionProps) => {

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

    const sortedProjects = projects.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();

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

                projects
            </motion.h2>

            <motion.p
                className="text-lg text-zinc-400 font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Projects that I have built in my spare time or in work.
            </motion.p>

            <motion.div
                className="mt-10 flex flex-col w-full"
                initial='hidden'
                animate='show'
                variants={containerVariant}>

                {sortedProjects.map(({ title, description, projectLink, startDate, techUsed, imageName }, index) => (

                    <ProjectPanel key={index} title={title} description={description} projectLink={projectLink}
                        startDate={startDate} techUsed={techUsed} imageName={imageName} index={index} />

                ))}

            </motion.div>
        </motion.div>
    )
}

type ProjectPanelProps = {

    title: string,
    description: string,
    projectLink: string,
    startDate: string,
    techUsed: string[],
    imageName: string,
    index: number,
}

export const ProjectPanel = ({ title, description, projectLink, startDate, techUsed, imageName, index }: ProjectPanelProps) => {

    const panelVariant = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    const [isOpen, setIsOpen] = useState(false);

    //const formattedDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <motion.div
            variants={panelVariant}
            animate={{ transition: { ease: "easeOut" } }}
            className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="px-2.5 py-1 text-sm bg-zinc-900 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">{index + 1}</div>
                        <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text">{title}</h3>
                    </div>

                    <div className="flex flex-row items-center space-x-3">
                        <p className="font-text text-sm p-1 text-zinc-400 group-hover:text-zinc-300 transition">Started: {startDate}</p>
                        <div
                            className="p-1 text-zinc-500 group-hover:text-zinc-300 transition">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen ? (
                    <ProjectInfoPanel description={description} projectLink={projectLink} imageName={imageName} techUsed={techUsed} />
                ) : null}
            </AnimatePresence>

        </motion.div>
    )
}

type ProjectInfoPanelProps = {

    description: string,
    projectLink: string,
    imageName: string,
    techUsed: string[],
}

export const ProjectInfoPanel = ({ description, projectLink, imageName, techUsed }: ProjectInfoPanelProps) => {

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

                <div className="w-2/3 p-1">
                    <p className="text-sm text-zinc-400 mb-6 font-text w-full">
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
                        src={`/images/${imageName}`}
                        alt="Project"
                        className="rounded w-10/12" />
                </div>
            </div>


            <div className="flex flex-col space-y-2 w-full" key="tech">

                <h3 className="font-text text-xs text-zinc-400 w-full">TECH USED:</h3>

                <div className="w-2/3 flex flex-row flex-wrap space-x-1 space-y-2 mb-3 p-1">
                    {techUsed.map((name, index) => (
                        <div className="mx-4" key={index}>
                            {getTechUsedFromName(name)?.icon}
                        </div>
                    ))}
                </div>
            </div>

            <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-text w-full"
                key="link"
                style={{ color: '#9e75f0' }}
            >
                <div className="flex flex-row space-x-2 items-center hover:text-purple-300 transition my-1 w-full">
                    {githubIcon}
                    <p>View on GitHub</p>
                    <GoArrowUpRight size={25} />
                </div>
            </a>
        </motion.div>
    )
}