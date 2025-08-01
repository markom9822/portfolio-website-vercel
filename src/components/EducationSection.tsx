import { Fragment } from "react/jsx-runtime";
import iclLogo from '/images/icl_logo.png'
import ucdLogo from '/images/ucd_logo.png'
import { motion, stagger } from "motion/react"


export const EducationSection = () => {

    const educations = [
        {
            title: "Imperial College London",
            subtitle: "MSc - Biomedical Engineering, Neurotechnology",
            content: "Graduated with Merit and received Department of Bioengineering Scholarship.\n" +
                "Masters Thesis: Sensory augmentation with a third eye using Virtual Reality, published in the 2023 IEEE International Conference on Robot and Human Interactive Communication.",
            icon: iclLogo,
        },
        {
            title: "University College Dublin",
            subtitle: "BEng - Biomedical Engineering",
            content: "First Class Honors (GPA: 3.72/4.20).\n" +
                "Final Year Thesis: Preliminary and final technical report on sleep stage prediction from wearable sensors using machine learning coded in Python.",
            icon: ucdLogo,
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

                {educations.map(({ title, subtitle, content, icon }) => (

                    <EducationPanel title={title} subtitle={subtitle} content={content} icon={icon} />
                ))}

            </motion.div>
        </motion.div>
    )
}

type EducationPanelProps = {

    title: string,
    subtitle: string,
    content: string,
    icon: any,
}

export const EducationPanel = ({ title, subtitle, content, icon }: EducationPanelProps) => {

    return (
        <div
            className="group rounded shadow border-2 border-zinc-700 transition hover:border-zinc-400 p-4"
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-col mb-5 group-hover:translate-x-1 transition">
                    <h2 className="text-2xl text-zinc-300 font-text mb-1 group-hover:text-zinc-100 transition">{title}</h2>
                    <p className="font-text text-sm text-zinc-400 group-hover:text-zinc-200 transition">{subtitle.toUpperCase()}</p>
                </div>

                <div className="flex items-center opacity-60 group-hover:opacity-100 transition">
                    <img
                        src={icon}
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