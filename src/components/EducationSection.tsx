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
                className="text-4xl font-bold font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>

                education
            </motion.h2>

            <motion.p
                className="text-lg text-zinc-400 font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                My educational background.
            </motion.p>

            <motion.div
                className="mt-10 flex flex-col w-full space-y-6"
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
            className="group rounded shadow border-2 border-zinc-700 transition hover:border-zinc-400 p-4"
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-col mb-5 group-hover:translate-x-1 transition">
                    <h2 className="text-2xl text-zinc-300 font-text mb-1 group-hover:text-zinc-100 transition">{title}</h2>
                    <p className="font-text text-sm text-zinc-400 group-hover:text-zinc-200 transition">{subtitle.toUpperCase()} [ {startYear} - {endYear} ]</p>
                </div>

                <div className="flex items-center opacity-60 group-hover:opacity-100 transition">
                    <img
                        src={`/images/${imageName}`}
                        className='w-15 h-15' />
                </div>

            </div>

            <p className="text-sm text-zinc-400 font-text">
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