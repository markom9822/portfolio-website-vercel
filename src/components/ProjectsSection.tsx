import { Fragment, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { motion, stagger, AnimatePresence } from "motion/react"
import type { ProjectDB } from "../pages/AdminProjects";
import { getTechUsedFromName } from "../store/techUsedOptions";
import { PiGithubLogo } from "react-icons/pi";

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
                className="text-xs sm:text-sm md:text-lg lg:text-2xl text-zinc-800 font-type-bold"
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
    const baseTagClass = "flex w-2/10 md:w-2/10 lg:w-1/10 text-[0.40rem] justify-center sm:text-xs md:text-xs lg:text-sm px-1 py-0.5 md:px-2 md:py-1 bg-emerald-100 border-1 rounded-2xl font-type-bold group-hover:translate-x-1 transition";
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
                className="group flex flex-row justify-between items-center py-4 w-full rounded">
                <div className="border-b-1 md:border-b-3 border-dashed border-b-zinc-600 flex flex-row gap-x-2 pb-1 md:pb-2 justify-between items-center w-full">

                    <div className="flex flex-row items-center w-4/6">
                        <div className="w-1/10 flex">
                            <div className="w-2/3 px-1 md:px-2.5 py-1 text-[0.50rem] text-center flex justify-center sm:text-xs md:text-sm lg:text-base font-bold font-title text-zinc-500 group-hover:text-zinc-900 rounded transition">{index + 1}</div>
                        </div>

                        <h3 className=" w-7/10 flex px-3 justify-start font-type-bold text-xs sm:text-lg md:text-xl lg:text-2xl font-semibold text-zinc-600 group-hover:text-zinc-900 group-hover:translate-x-1 transition">{title}</h3>

                        <div className={tagClass}>
                            <p className="flex justify-center items-center text-center">{tagText}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center space-x-1 md:space-x-3 text-[0.50rem] sm:text-sm md:text-base lg:text-lg w-2/6">
                        <p className="w-2/3 flex font-type-bold p-1 text-zinc-700 group-hover:text-zinc-800 transition">Started: {formattedDate}</p>
                        <motion.div
                            animate={{ rotate: isOpen ? -180 : 0 }}
                            transition={{ duration: 0.06, ease: "easeInOut" }}
                            className="w-1/3 p-1 text-zinc-700 group-hover:text-zinc-800 transition flex items-center justify-center">
                            <BsChevronDown />
                        </motion.div>
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
            className="w-full"
            initial="closed"
            animate="open"
            exit="closed"
            key="modal"
            variants={menuVariants}>

            <div className="flex flex-col w-full" key="content">

                <div className="max-w-2xl flex items-center justify-start md:py-2">
                    <img
                        src={`/images/${imageName}`}
                        alt="Project"
                        className="rounded border-1 border-emerald-500" />
                </div>

                <div className="w-full p-1">
                    <p className="text-[0.60rem] sm:text-sm md:text-base lg:text-xl xl:text-2xl text-zinc-900 lg:mb-3 font-type-bold w-full">
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


            </div>

            <div className="flex flex-col space-y-2 w-full" key="tech">

                <h3 className="font-type-bold text-[0.60rem] sm:text-sm md:text-base lg:text-lg text-zinc-800 w-full">TECH USED:</h3>

                <div className="w-full flex flex-row items-center flex-wrap gap-x-1 gap-y-3 mb-3 p-1">
                    {techUsed.map((name, index) => (
                        <div className="flex items-center align-middle justify-center mx-1 md:mx-4 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" key={index}>
                            {getTechUsedFromName(name)?.icon}
                        </div>
                    ))}
                </div>
            </div>

            <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-type-bold text-blue-700  w-full text-xs sm:text-base md:text-lg lg:text-xl"
                key="link"
            >
                <div className="flex flex-row space-x-2 items-center hover:text-blue-500 transition my-1 w-full">

                    {isWork ? (
                        <>
                            <p>Read More</p>
                            <GoArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                        </>
                    ) : (
                        <>
                            <PiGithubLogo className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:h-9 lg:w-9" />
                            <p>View on GitHub</p>
                            <GoArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                        </>
                    )}
                </div>
            </a>
        </motion.div>
    )
}