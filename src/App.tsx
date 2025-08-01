import { useState } from 'react'
import profilePic from '/images/profile_photo_small.png'
import './App.css'
import { LuBriefcaseBusiness } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { BsInfoCircle  } from "react-icons/bs";

import {
  githubIcon,
  linkedinIcon,
} from "./components/Icons";

import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PostsSection } from './components/PostsSection';
import { EducationSection } from './components/EducationSection'
import { ReachOutSection } from './components/ReachOutSection';

export function App() {

  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { label: "about", Icon: BsInfoCircle },
    { label: "experience", Icon: LuBriefcaseBusiness},
    { label: "projects", Icon: GrProjects },
    { label: "education", Icon: IoSchoolOutline },
    { label: "posts", Icon: MdOutlineLocalPostOffice },
    { label: "reach out", Icon: SiMinutemailer },
  ];

  const handleContentsSection = (tab: string) => {

    switch (tab) {
      case "about":
        return <AboutSection />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectsSection />;
      case "education":
        return <EducationSection />;
      case "posts":
        return <PostsSection />;
      case "reach out":
        return <ReachOutSection />;
      default:
        return null;
    }

  }


  return (
    <div className='flex min-h-screen text-zinc-300 bg-black'>
      <aside className="w-80 h-screen bg-zinc-900/60 border-zinc-700 backdrop-blur-sm p-6 flex flex-col justify-between shadow-xl sticky top-0">

        <div className='flex flex-col items-center space-y-6'>

          <img 
          src={profilePic}
          loading='eager'
          fetchPriority='high'
          className='rounded-full w-32 h-32 object-cover shadow'/>

          <div className='text-center space-y-3'>
            <h2 className='text-2xl text-zinc-300 font-bold font-text'>
              Mark O Meara
            </h2>
            <p className='text-base text-zinc-400 font-text italic'>
              Software Engineer
            </p>
          </div>

          <nav className='flex flex-col w-full space-y-2 relative z-0'>
            {tabs.map(({ label, Icon }) => (

              <div 
              key={label}
              className='relative z-0'>

                {activeTab === label && (
                    <div
                      className="absolute inset-0 bg-white/10 rounded z-[-1]"
                    />
                  )}
                <button
                  onClick={() => setActiveTab(label)}
                  className={`flex text-base items-center space-x-5 px-4 py-2 w-full rounded duration-200 cursor-pointer ${activeTab === label
                    ? "text-white"
                    : "hover:bg-zinc-800 text-zinc-500/80"
                    }`}
                >
                  {Icon && <Icon size={20} />}
                  <span className='font-text'>{label}</span>
                </button>
              </div>
            ))}
          </nav>
        </div>

        <div className='flex justify-center space-x-5 pt-6 border-t border-zinc-700 text-zinc-400'>

          <a
            href="https://github.com/markom9822"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
            aria-label="Github"
          >
            {githubIcon}
          </a>

          <a
            href="https://www.linkedin.com/in/marko-meara/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
            aria-label="LinkedIn"
          >
            {linkedinIcon}
          </a>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10 
        [&::-webkit-scrollbar]:[width:10px]
      [&::-webkit-scrollbar-thumb]:bg-zinc-600
        [&::-webkit-scrollbar-thumb]:rounded-xs
        [&::-webkit-scrollbar-corner]:bg-zinc-900
        overflow-scroll">
        {handleContentsSection(activeTab)}
      </main>
      
    </div>

  )
}

export default App
