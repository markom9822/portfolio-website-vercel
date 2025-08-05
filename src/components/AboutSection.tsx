import { cppIcon, csIcon, pythonIcon, reactIcon, typescriptIcon, unityIcon } from './Icons';
import { motion, stagger } from "motion/react"


export const AboutSection = () => {

    const skills = [
        {
            title: "C#",
            experience: 3,
            icon: csIcon,
        },
        {
            title: "Unity",
            experience: 3,
            icon: unityIcon,
        },
        {
            title: "React/React Native",
            experience: 2,
            icon: reactIcon,
        },
        {
            title: "Typescript",
            experience: 2,
            icon: typescriptIcon,
        },
        {
            title: "C++",
            experience: 1,
            icon: cppIcon,
        },
        {
            title: "Python",
            experience: 1,
            icon: pythonIcon,
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

    const maxExperienceLevel = Math.max(...skills.map(skill => skill.experience));

    return (
        <motion.div
            initial='hidden'
            animate='show'
            variants={containerVariant}
            className="space-y-7 w-full">

            <motion.h2
                className="text-4xl font-bold font-text"
                variants={itemVariant}
                animate={{transition: {ease: "easeOut"}}}
                >
                about me
            </motion.h2>

            <motion.p
                className="text-lg text-zinc-400 font-text"
                variants={itemVariant}
                animate={{transition: {ease: "easeOut"}}}
            >
                I am a Software Engineer from Dublin, Ireland living in London.
                <br />
                <br />
                I have 3 years of experience in a med-tech startup building VR simulations for medical professionals.
                My background is in Biomedical Engineering with a masters from Imperial College London. I have a strong
                passion for learning new things and building.
                <br />
                <br />
                Here you will find out more about me, my skills, my experience and some of my projects I've been working on in my spare time.
            </motion.p>

            <motion.div
                className='w-full'
                variants={itemVariant}
                animate={{transition: {ease: "easeOut"}}}
            >
                <h2 className="text-2xl font-bold font-text mb-6">
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
                    {skills.map(({ title, experience, icon }, index) => (

                        <SkillPanel key={index} title={title} experience={experience} maxExperienceLevel={maxExperienceLevel} icon={icon} />
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
    icon: any;
}

export const SkillPanel = ({ title, experience, maxExperienceLevel, icon }: SkillPanelProps) => {

    const experienceText = experience.toString() + " yrs";
    const experienceWidth = `${Math.round((experience / maxExperienceLevel) * 100)}%`

    return (
        <div
            className="p-4"
        >
            <div className='flex flex-row space-x-3'>
                {icon}

                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between'>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2 font-text">{title}</h3>
                        <h3 className="text-base text-zinc-200 mb-2 font-text">{experienceText}</h3>
                    </div>
                    <div className="h-2.5 relative">
                        <div className="bg-[#9e75f0] h-2.5 rounded relative z-10" style={{ width: experienceWidth }}></div>
                        <div className="bg-zinc-800 h-2.5 rounded absolute bottom-0 left-0 z-0" style={{ width: "100%" }}></div>
                    </div>
                </div>
            </div>

        </div>
    )
}