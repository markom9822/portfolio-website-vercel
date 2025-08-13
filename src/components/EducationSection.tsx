import { Fragment } from "react/jsx-runtime";
import { motion, stagger } from "motion/react"
import type { EducationDB } from "../pages/AdminEducation";

type EducationSectionProps = {

    educations: EducationDB[]
}

export const EducationSection = ({ educations }: EducationSectionProps) => {

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

    const sortedEducations = educations.sort((a, b) => {
        const dateA = new Date(a.endDate).getTime();
        const dateB = new Date(b.endDate).getTime();

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

                Education
            </motion.h2>

            <motion.p
                className="text-xs sm:text-sm md:text-lg lg:text-2xl text-zinc-800 font-type-bold"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                My educational background.
            </motion.p>

            <motion.div
                className="flex flex-col w-full space-y-6"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>

                {sortedEducations.map(({ title, subtitle, content, imageName, startDate, endDate }, index) => (

                    <EducationPanel key={index} title={title} subtitle={subtitle} content={content} imageName={imageName} startDate={startDate} endDate={endDate} />
                ))}

            </motion.div>
        </motion.div>
    )
}

type EducationPanelProps = {

    title: string,
    subtitle: string,
    startDate: string,
    endDate: string,
    content: string,
    imageName: string,
}

export const EducationPanel = ({ title, subtitle, content, imageName, startDate, endDate }: EducationPanelProps) => {

    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();

    return (
        <div
            className="group rounded shadow border-3 border-dashed border-zinc-600 transition hover:border-zinc-700 p-4"
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-col mb-5 group-hover:translate-x-1 transition">
                    <h2 className="font-title text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-700 mb-2 group-hover:text-zinc-800 transition">{title}</h2>
                    <p className="font-type-bold text-[0.60rem] sm:text-xs md:text-sm lg:text-base text-zinc-700 group-hover:text-zinc-800 transition">{subtitle.toUpperCase()} [{startYear} - {endYear}]</p>
                </div>

                <div className="flex items-center opacity-60 group-hover:opacity-100 transition">
                    <img
                        src={`/images/${imageName}`}
                        className='h-8 w-8 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:h-18 lg:w-18' />
                </div>

            </div>

            <p className="text-[0.60rem] sm:text-sm md:text-base lg:text-lg text-zinc-700 font-type-bold ">
                {content.split('\n').map((line, index, arr) => (
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
    )
}