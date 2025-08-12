import { Fragment } from 'react/jsx-runtime';
import type { AboutMeContentDB } from '../pages/AdminDashboard';
import { motion, stagger } from "motion/react"
import type { SkillsDB } from '../pages/AdminAboutMe';
import { getTechUsedFromName } from '../store/techUsedOptions';
import profilePic from '/images/profile_photo_small.png'


type AboutSectionProps = {

    aboutMeContent: AboutMeContentDB[],
    skills: SkillsDB[]
}

export const AboutSection = ({ aboutMeContent, skills }: AboutSectionProps) => {

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

    const maxExperienceLevel = Math.max(...skills.map(skill => Number(skill.experience)));

    const sortedSkills = skills.sort((a, b) => {
        return Number(b.experience) - Number(a.experience);
    });


    return (
        <motion.div
            initial='hidden'
            animate='show'
            variants={containerVariant}
            className="space-y-7 w-full">

            <motion.h2
                className="text-xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-text"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}
            >
                about me
            </motion.h2>

            <motion.div
                className='w-full flex flex-row'
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}
            >

                <motion.p
                    className="text-sm sm:text-sm md:text-lg lg:text-2xl text-zinc-800 pr-10 w-2/3 font-text"
                    variants={itemVariant}
                    animate={{ transition: { ease: "easeOut" } }}
                >
                    {aboutMeContent[0].content.split('\n').map((line, index, arr) => (
                        <Fragment key={index}>
                            {line}
                            {index < arr.length - 1 && (
                                <>
                                    <br />
                                </>
                            )}
                        </Fragment>
                    ))}
                </motion.p>

                <motion.div className='flex justify-center w-1/3 aspect-square'>
                    <motion.img 
                    src={profilePic} 
                    style={{ }}
                    className="w-full h-full object-contain opacity-90 " />
                </motion.div>

            </motion.div>

            <motion.div className="my-8 bg-[url('/images/dash_line.svg')] bg-cover w-full h-0.5 lg:h-1 sm:h-0.5" />

            <motion.div
                className='w-full'
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}
            >
                <h2 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold font-text mb-6">
                    skills
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                    }}
                    className="justify-center"
                >
                    {sortedSkills.map(({ title, experience, techUsed }, index) => (

                        <SkillPanel key={index} title={title} experience={Number(experience)} maxExperienceLevel={maxExperienceLevel} tech={techUsed[0]} />
                    ))}

                </div>
            </motion.div>
        </motion.div>
    )
}

type SkillPanelProps = {

    title: string,
    experience: number,
    maxExperienceLevel: number;
    tech: string;
}

export const SkillPanel = ({ title, experience, maxExperienceLevel, tech }: SkillPanelProps) => {

    const experienceText = experience.toString() + " yrs";
    const experienceWidth = `${Math.round((experience / maxExperienceLevel) * 100)}%`

    return (
        <div
            className="p-4"
        >
            <div className='flex flex-row space-x-3'>
                <div className='w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15 lg:w-20 lg:h-20'>
                    {getTechUsedFromName(tech)?.icon}
                </div>
                
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between text-base sm:text-base md:text-lg lg:text-2xl'>
                        <h3 className="font-semibold text-zinc-800 mb-2 font-text">{title}</h3>
                        <h3 className="text-zinc-800 mb-2 font-text">{experienceText}</h3>
                    </div>
                    <div className="h-2 sm:h-2 md:h-2.5 lg:h-3.5 relative">
                        <div className="bg-emerald-900 h-2 sm:h-2 md:h-2.5 lg:h-3.5 rounded-sm relative z-10" style={{ width: experienceWidth }}></div>
                        <div className="bg-emerald-300 h-2 sm:h-2 md:h-2.5 lg:h-3.5 rounded-sm absolute bottom-0 left-0 z-0" style={{ width: "100%" }}></div>
                    </div>
                </div>
            </div>

        </div>
    )
}