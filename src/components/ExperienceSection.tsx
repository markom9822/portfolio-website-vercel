import { Fragment } from "react/jsx-runtime";
import { getDurationInYearsMonths, getDurationText } from "../utils/helper";

export const fundamentalXRIcon = (
  <a href="https://www.fundamentalxr.com/" target="_blank">
    <img title="fundamental XR" width="70" height="70" style={{ borderRadius: '5px' }} src="https://media.licdn.com/dms/image/v2/D4E0BAQErgOdEMxhblQ/company-logo_100_100/B4EZhbLsnvGoAQ-/0/1753876450155/fundamentalxr_logo?e=1756944000&amp;v=beta&amp;t=uiFf15VZzO_rZqm5FJTnbHnSsYlVrJz1UkHqs1UxO8Q">
    </img>
  </a>
)

export const torontoWesternIcon = (
  <a href="https://www.uhn.ca/OurHospitals/TWH" target="_blank">
    <img title="Toronto Western Hospital" width="70" height="70" style={{ borderRadius: '5px' }} src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/d16277a55a092dba9723d56f2303b455"></img>
  </a>
)

export const yCountryCampIcon = (
  <a href="https://ycountrycamp.com/" target="_blank">
    <img title="Y Country Camp" width="70" height="70" style={{ borderRadius: '5px' }} src="https://raisedays-storage.s3.ca-central-1.amazonaws.com/public/00d892f1-61d2-432d-9ca9-40d2f3a1490f.jpeg"></img>
  </a>
)

export const ExperienceSection = () => {

    const experiences = [
        {
            companyName: "fundamental XR",
            companyIcon: fundamentalXRIcon,
            companyLocation: "London, United Kingdom",
            positions: [
                {
                    positionName: "Software Engineer",
                    positionStartDate: new Date(2024, 4, 1),
                    positionEndDate: new Date(2025, 6, 30),
                    content: "Developed industry leading and reusable tech for haptic arms, this work featured in multiple commercial products delivering highly accurate and realistic VR medical simulations.\n" +
                        "Learnt C++ and implemented Test Driven Development (TDD) into the haptic arm codebase.\n" +
                        "Used version control software (Sourcetree and Git), partook in regular code reviews and pair programming sessions."
                },
                {
                    positionName: "Associate Software Engineer",
                    positionStartDate: new Date(2023, 1, 1),
                    positionEndDate: new Date(2024, 4, 30),
                    content: "Made several presentations to the engineering team and wider company on project progress and my personal work.\n" +
                        "Contributed heavily to award winning commercial products ranging from simulating eyeball surgery replicating real-life scenarios with medical equipment.\n" +
                        "Built interactive and user-friendly user interfaces inside of virtual operating rooms.",
                },
                {
                    positionName: "Intern Software Engineer",
                    positionStartDate: new Date(2022, 9, 1),
                    positionEndDate: new Date(2023, 1, 1),
                    content: "Completed internship training and passed code test within 2 months and worked on a commercial product.\n" +
                        "Developed multiple games in Unity engine through C# and presented the results to colleagues; this included still photos of the games as well as a live demo.\n" +
                        "Completed C# coding course on Codecademy website to improve knowledge.",
                },
            ]
        },
        {
            companyName: "Toronto Western Hospital",
            companyIcon: torontoWesternIcon,
            companyLocation: "Toronto, Ontario, Canada",
            positions: [
                {
                    positionName: "Research Assistant",
                    positionStartDate: new Date(2019, 6, 1),
                    positionEndDate: new Date(2020, 8, 1),
                    content: "Analyzed medical device patents towards an upcoming paper on inventiveness among the interventional radiologist community.\n" +
                        "Generated reports in Excel on medical device patent trends, identifying oversaturated and upcoming markets for potential future devices; this report showed that medical device patents are on an upward trend which was unexpected.\n" +
                        "Presented results from my analysis to Professor Kieran Murphy and a group of medical students; this showed that many patents had expired as the owner failed to pay fees.\n" +
                        "Instructed the medical students involved on how to continue my work including, what database was used, how patents were verified and how to structure the report.\n" +
                        "Constructed a questionnaire for patent holders to obtain unavailable information online alongside other team members."
                }
            ]
        },
        {
            companyName: "Y Country Camp",
            companyIcon: yCountryCampIcon,
            companyLocation: "Montreal, Quebec, Canada",
            positions: [
                {
                    positionName: "Lifeguard/Coach",
                    positionStartDate: new Date(2018, 6, 1),
                    positionEndDate: new Date(2018, 7, 30),
                    content: "Coordinated with lifeguard colleagues to run safe and enjoyable water activities for campers; all campers were safe with no serious injuries or drownings.\n" +
                        "Instructed mixed groups of campers between ages 8 to 16 years in swimming lessons.\n" +
                        "Supervised campers during mealtimes, recreational activities and during the night.\n" +
                        "Organized evening activities for campers such as basketball games or playing board games together; this garnered praise from the Camp Director at the end of camp staff meeting."
                }
            ]
        },
    ];

    return (
        <div className="space-y-4">

            <h2 className="text-4xl font-bold font-text">
                experience
            </h2>

            <p className="text-lg text-zinc-400 font-text">
                My experience to date.
            </p>

            <div className="mt-10 flex flex-col w-full space-y-6">

                {experiences.map(({ companyName, companyIcon, companyLocation, positions }) => (

                    <ExperiencePanel companyName={companyName} companyIcon={companyIcon} companyLocation={companyLocation} positions={positions} />

                ))}

            </div>
        </div>
    )
}

type PositionProps = {

    positionName: string,
    positionStartDate: Date,
    positionEndDate: Date,
    content: string,
}


type ExperiencePanelProps = {

    companyName: string,
    companyIcon: any,
    companyLocation: string,
    positions: PositionProps[],
}

export const ExperiencePanel = ({ companyName, companyIcon, companyLocation, positions }: ExperiencePanelProps) => {

    // do I need to show total experience period
    const showTotalDuration = positions.length > 1;

    var durationText = '';

    if(showTotalDuration)
    {
        const positionDuration = getDurationInYearsMonths(positions[positions.length - 1].positionStartDate, positions[0].positionEndDate);
        durationText = getDurationText(positionDuration.years, positionDuration.months);
    }

    return (
        <div
            className="group rounded shadow border-2 border-zinc-700 transition hover:border-zinc-400 p-4 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col mb-4 group-hover:translate-x-1 transition space-y-1">
                    <h2 className="text-2xl text-zinc-300 font-text mb-1 group-hover:text-zinc-100 transition">{companyName}</h2>
                    
                    {showTotalDuration && (<p className="font-text text-sm text-zinc-400 group-hover:text-zinc-200 transition">[ {durationText} ]</p>)}

                    <p className="font-text text-sm text-zinc-400 group-hover:text-zinc-200 transition">{companyLocation.toUpperCase()}</p>
                </div>

                <div className="flex items-center">
                    {companyIcon}
                </div>
            </div>

            <div className="space-y-4">
                {positions.map(({ positionName, content, positionStartDate, positionEndDate }) => (

                    <PositionPanel positionName={positionName} positionStartDate={positionStartDate}
                        positionEndDate={positionEndDate} content={content} />
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
            <h3 className="text-lg text-zinc-200 mb-2 font-text">{positionName}</h3>
            <div className="flex flex-row space-x-4">
                <p className="font-text text-sm text-zinc-300">{formattedStartDate} - {formattedEndDate}</p>
                <p className="font-text text-sm text-zinc-400">[ {durationText} ]</p>
            </div>

            <p className="text-sm text-zinc-400 mb-2 font-text">
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