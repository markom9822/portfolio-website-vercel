import { useEffect, useRef, useState } from 'react'
import profilePic from '/images/profile_photo_small.png'
import './App.css'
import { LuBriefcaseBusiness } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { motion } from "motion/react"

import {
  githubIcon,
  linkedinIcon,
} from "./components/Icons";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PostsSection } from './components/PostsSection';
import { EducationSection } from './components/EducationSection'
import { ReachOutSection } from './components/ReachOutSection';
import LoaderScreen from './components/LoadingScreen';
import type { ProjectDB } from './pages/AdminProjects';

export function App() {

  const LOADER_SCREEN_DELAY: number = 1500;

  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isProjectsFetched, setIsProjectsFetched] = useState(false);
  const [projects, setProjects] = useState<ProjectDB[]>([]);

  const contentContainerRef = useRef<HTMLDivElement | null>(null);


  const tabs = [
    { label: "about", Icon: BsInfoCircle },
    { label: "experience", Icon: LuBriefcaseBusiness },
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
        return isProjectsLoading ? (<LoaderScreen/>) : (<ProjectsSection projects={projects}/>)
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

  useEffect(() => {

    const timer = setTimeout(() => setIsLoading(false), LOADER_SCREEN_DELAY);
    return () => clearTimeout(timer);

  }, []);

  useEffect(() => {

    const fetchProjects = () => {
      setIsProjectsLoading(true);
      getDocs(collection(db, "projects"))
        .then((snap) => {

          const data: ProjectDB[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<ProjectDB, "id">), // Type assertion for Firestore data
            }));

          setProjects(data);
          setIsProjectsFetched(true);
        })
        .catch(console.error)
        .finally(() => setIsProjectsLoading(false));
    };

    if ((activeTab === "projects") && !isProjectsFetched) {
      fetchProjects();
    }


  }, [activeTab, isProjectsFetched]);


  const handleTabButtonPressed = (labelName: string) => {

    setActiveTab(labelName)
    if(contentContainerRef.current)
    {
      contentContainerRef.current.scrollTop = 0;
    }
  }

  const renderDesktop = () => {

    return (
      <div className='flex min-h-screen text-zinc-300 bg-black'>
        <aside className="w-80 h-screen bg-zinc-900/60 border-zinc-700 backdrop-blur-sm p-6 flex flex-col justify-between shadow-xl sticky top-0">

          <div className='flex flex-col items-center space-y-6'>

            <motion.img
              src={profilePic}
              loading='eager'
              fetchPriority='high'
              draggable={false}
              className='rounded-full w-32 h-32 object-cover shadow'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            <motion.div
              className='text-center space-y-3'
              initial={{ opacity: 0, y: -40 }}
              animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } }}
            >
              <h2 className='text-2xl text-zinc-300 font-bold font-text'>
                Mark O Meara
              </h2>
              <p className='text-base text-zinc-400 font-text'>
                [ Software Engineer ]
              </p>
            </motion.div>

            <nav className='flex flex-col w-full space-y-2 relative z-0'>
              {tabs.map(({ label, Icon }) => (

                <div
                  key={label}
                  className='relative z-0'>

                  {activeTab === label && (
                    <motion.div
                      layoutId="highlight"
                      className="absolute inset-0 bg-white/10 rounded z-[-1]"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <button
                    onClick={() => handleTabButtonPressed(label)}
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

          <motion.div
            className='flex justify-center space-x-5 pt-6 border-t border-zinc-700 text-zinc-400'
            initial="hidden"
            animate="visible">

            <motion.a
              href="https://github.com/markom9822"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
              aria-label="Github"
              initial={{ opacity: 0, y: 30 }}
              animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 30 } }}
            >
              {githubIcon}
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/marko-meara/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
              aria-label="LinkedIn"
              initial={{ opacity: 0, y: 30 }}
              animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 30 } }}
            >
              {linkedinIcon}
            </motion.a>
          </motion.div>
        </aside>

        <main 
        ref={contentContainerRef}
        className="flex-1 h-screen w-full overflow-y-auto p-6 md:p-10 
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

  const renderFullScreenLoader = () => {

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          zIndex: 9999,
        }}
      >
        <LoaderScreen
          size={150}
          fullscreen={true}
          tagline="mark o m. portfolio"
          includeResetStyles={true}
        />
      </div>
    )
  }

  return (
    <>
      {isLoading ? renderFullScreenLoader() : renderDesktop()}
    </>
  )

}

export default App
