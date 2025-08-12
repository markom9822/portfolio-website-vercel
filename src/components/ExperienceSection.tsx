import { Fragment } from "react/jsx-runtime";
import { getDurationInYearsMonths, getDurationText } from "../utils/helper";
import { motion, stagger } from "motion/react"
import type { ExperienceDB } from "../pages/AdminExperience";
import { getFlagFromName } from "../store/countryFlagOptions";

type ExperienceSectionProps = {

    experiences: ExperienceDB[]
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {

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

    const sortedExperiences = experiences.sort((a, b) => {
        const dateA = new Date(a.positions[a.positions.length - 1].positionEndDate).getTime();
        const dateB = new Date(b.positions[b.positions.length - 1].positionEndDate).getTime();

        return dateB - dateA;
    });

    return (
        <motion.div
            className="space-y-4 w-full"
            initial='hidden'
            animate='show'
            variants={containerVariant}>

            <motion.h2
                className="text-xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-title w-full"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>
                Experience
            </motion.h2>

            <motion.p
                className="text-sm sm:text-sm md:text-lg lg:text-2xl text-zinc-800 font-type-bold w-full"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>

                My experience to date.
            </motion.p>

            <motion.div
                className="flex flex-col w-full space-y-6"
                variants={itemVariant}
                animate={{ transition: { ease: "easeOut" } }}>

                {sortedExperiences.map(({ companyName, companyIconName, companyLocation, companyWebsite, positions }, index) => (

                    <ExperiencePanel key={index} companyName={companyName} companyIconName={companyIconName} companyLocation={companyLocation}
                        companyWebsite={companyWebsite} positions={positions} />

                ))}

            </motion.div>
        </motion.div>
    )
}

export type PositionProps = {

    positionName: string,
    positionStartDate: string,
    positionEndDate: string,
    content: string,
}


type ExperiencePanelProps = {

    companyName: string,
    companyIconName: string,
    companyLocation: string,
    companyWebsite: string,
    positions: PositionProps[],
}

export const ExperiencePanel = ({ companyName, companyIconName, companyLocation, companyWebsite, positions }: ExperiencePanelProps) => {

    // do I need to show total experience period
    const showTotalDuration = positions.length > 1;

    var durationText = '';

    if (showTotalDuration) {
        const positionDuration = getDurationInYearsMonths(new Date(positions[positions.length - 1].positionStartDate), new Date(positions[0].positionEndDate));
        durationText = getDurationText(positionDuration.years, positionDuration.months);
    }

    const parts = companyLocation.split(",");
    const country = parts[parts.length - 1].toLowerCase().trim();

    return (
        <div
            className="group rounded shadow border-3 border-dashed border-zinc-600 transition hover:border-zinc-900 p-4 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col mb-4 group-hover:translate-x-1 transition space-y-1">
                    <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl text-zinc-700 font-title mb-1 group-hover:text-zinc-900 transition">{companyName}</h2>

                    {showTotalDuration && (<p className="font-type-bold text-xs sm:text-xs md:text-sm lg:text-base text-zinc-700 group-hover:text-zinc-900 transition">[ {durationText} ]</p>)}

                    <div className="flex flex-row items-center space-x-3">
                        <p className="font-type-bold text-xs sm:text-xs md:text-sm lg:text-base text-zinc-700 group-hover:text-zinc-900 transition">{companyLocation.toUpperCase()}</p>
                        <div className="flex items-center opacity-40 group-hover:opacity-100 transition w-6 h-1 sm:w-6 sm:h-1 md:w-9 md:h-3 lg:w-11 lg:h-4">
                            {getFlagFromName(country)?.icon}
                        </div>
                    </div>

                </div>

                <div className="flex items-center opacity-60 group-hover:opacity-100 transition rounded">
                    <a href={companyWebsite} target="_blank">
                        <img title={companyName} style={{ borderRadius: '5px' }} className="w-16 h-16 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-28 lg:h-28" src={companyIconName}>
                        </img>
                    </a>
                </div>
            </div>

            <div className="space-y-3 w-full">
                {positions.map(({ positionName, content, positionStartDate, positionEndDate }, index) => (

                    <PositionPanel key={index} positionName={positionName} positionStartDate={new Date(positionStartDate)}
                        positionEndDate={new Date(positionEndDate)} content={content} />
                ))}
            </div>

        </div>
    )

}

type PositionPanelProps = {

    positionName: string,
    positionStartDate: Date,
    positionEndDate: Date,
    content: string,
}

export const PositionPanel = ({ positionName, content, positionStartDate, positionEndDate }: PositionPanelProps) => {

    const formattedStartDate = positionStartDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })
    const formattedEndDate = positionEndDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })

    // get duration in position
    const positionDuration = getDurationInYearsMonths(positionStartDate, positionEndDate);
    const durationText = getDurationText(positionDuration.years, positionDuration.months);

    return (
        <div className="flex flex-col space-y-3">
            <h3 className="text-base sm:text-base md:text-lg lg:text-xl text-zinc-800 mb-2 font-title">{positionName}</h3>
            <div className="flex flex-row space-x-4 text-xs sm:text-xs md:text-sm lg:text-base font-type-bold">
                <p className=" text-zinc-800">{formattedStartDate} - {formattedEndDate}</p>
                <p className=" text-zinc-700">[ {durationText} ]</p>
            </div>

            <p className="text-xs sm:text-xs md:text-sm lg:text-base text-zinc-700 mb-2 font-type-bold">
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