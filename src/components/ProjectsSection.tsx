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
                className="text-xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-title"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>

                Projects
            </motion.h2>

            <motion.p
                className="text-sm sm:text-sm md:text-lg lg:text-2xl text-zinc-800 font-type-bold"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Projects that I have built in my spare time or in work.
            </motion.p>

            <motion.div
                className="flex flex-col w-full"
                initial='hidden'
                animate='show'
                variants={containerVariant}>

                {sortedProjects.map(({ title, description, projectLink, startDate, techUsed, imageName, isWork }, index) => (

                    <ProjectPanel key={index} title={title} description={description} projectLink={projectLink}
                        startDate={startDate} techUsed={techUsed} imageName={imageName} isWork={isWork} index={index} />
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
    isWork: boolean,
    index: number,
}

export const ProjectPanel = ({ title, description, projectLink, startDate, techUsed, imageName, isWork, index }: ProjectPanelProps) => {

    const panelVariant = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    const tagText = isWork ? ("Work") : ("Personal");
    const baseTagClass = "flex text-xs sm:text-xs md:text-xs lg:text-sm px-2 py-1 bg-emerald-100 border-1 rounded-2xl font-type-bold group-hover:translate-x-1 transition";
    const colorTagClass = isWork
        ? "border-emerald-800 text-emerald-800 group-hover:text-emerald-600 group-hover:border-emerald-600"
        : "border-blue-800 text-blue-800 group-hover:text-blue-600 group-hover:border-blue-600";
    const tagClass = `${baseTagClass} ${colorTagClass}`;

    return (
        <motion.div
            variants={panelVariant}
            animate={{ transition: { ease: "easeOut" } }}
            className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-3 border-dashed border-b-zinc-600 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-3">
                        <div className="px-2.5 py-1 text-xs sm:text-xs md:text-sm lg:text-base font-bold font-title border-2 border-zinc-400 group-hover:border-zinc-800 text-zinc-500 group-hover:text-zinc-900 rounded transition">{index + 1}</div>
                        <h3 className="font-type-bold text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-zinc-600 group-hover:text-zinc-900 group-hover:translate-x-1 transition">{title}</h3>

                        <div className={tagClass}>
                            <p>{tagText}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center space-x-3 text-sm sm:text-sm md:text-base lg:text-lg">
                        <p className="font-type-bold p-1 text-zinc-700 group-hover:text-zinc-800 transition">Started: {formattedDate}</p>
                        <div
                            className="p-1 text-zinc-700 group-hover:text-zinc-800 transition">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen ? (
                    <ProjectInfoPanel description={description} projectLink={projectLink} imageName={imageName} techUsed={techUsed} isWork={isWork} />
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
    isWork: boolean,
}

export const ProjectInfoPanel = ({ description, projectLink, imageName, techUsed, isWork }: ProjectInfoPanelProps) => {

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
                    <p className="text-sm sm:text-sm md:text-base lg:text-xl xl:text-2xl text-zinc-900 mb-6 font-type-bold w-full">
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

                <div className="w-1/3 flex items-center justify-center border-l-2 border-dashed border-l-zinc-500">
                    <img
                        src={`/images/${imageName}`}
                        alt="Project"
                        className="rounded w-10/12" />
                </div>
            </div>

            <div className="flex flex-col space-y-2 w-full" key="tech">

                <h3 className="font-type-bold text-sm sm:text-sm md:text-base lg:text-lg text-zinc-800 w-full">TECH USED:</h3>

                <div className="w-2/3 flex flex-row items-center flex-wrap gap-x-1 gap-y-3 mb-3 p-1">
                    {techUsed.map((name, index) => (
                        <div className="flex items-center align-middle justify-center mx-4 w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" key={index}>
                            {getTechUsedFromName(name)?.icon}
                        </div>
                    ))}
                </div>
            </div>

            <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-type-bold  w-full text-base sm:text-base md:text-lg lg:text-xl"
                key="link"
                style={{ color: '#9e75f0' }}
            >
                <div className="flex flex-row space-x-2 items-center hover:text-purple-700 transition my-1 w-full">

                    {isWork ? (
                        <>
                            <p>Read More</p>
                            <GoArrowUpRight size={25} />
                        </>
                    ) : (
                        <>
                            {githubIcon}
                            <p>View on GitHub</p>
                            <GoArrowUpRight size={25} />
                        </>
                    )}
                </div>
            </a>
        </motion.div>
    )
}