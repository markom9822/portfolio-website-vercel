import { useEffect, useRef, useState } from 'react'
import './App.css'
import { LuBriefcaseBusiness } from "react-icons/lu";
import { GrProjects } from "react-icons/gr";
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
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
import type { AboutMeContentDB } from './pages/AdminDashboard';
import type { PostDB } from './pages/AdminPosts';
import type { EducationDB } from './pages/AdminEducation';
import type { SkillsDB } from './pages/AdminAboutMe';
import type { ExperienceDB } from './pages/AdminExperience';
import { PageBinding } from './components/PageBindings';
import { FolderTab } from './components/FolderTab';
import paperClip from '/images/paperclip_less.png'
import { PageFooter } from './components/PageFooter';
import { PageHeader } from './components/PageHeader';

export function App() {

  const LOADER_SCREEN_DELAY: number = 1500;

  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);

  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isProjectsFetched, setIsProjectsFetched] = useState(false);
  const [projects, setProjects] = useState<ProjectDB[]>([]);

  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isPostsFetched, setIsPostsFetched] = useState(false);
  const [posts, setPosts] = useState<PostDB[]>([]);

  const [isEducationsLoading, setIsEducationsLoading] = useState(false);
  const [isEducationsFetched, setIsEducationsFetched] = useState(false);
  const [educations, setEducations] = useState<EducationDB[]>([]);

  const [isExperiencesLoading, setIsExperiencesLoading] = useState(false);
  const [isExperiencesFetched, setIsExperiencesFetched] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceDB[]>([]);

  const [isAboutMeContentLoading, setIsAboutMeContentLoading] = useState(false);
  const [isAboutMeContentFetched, setIsAboutMeContentFetched] = useState(false);
  const [aboutMeContent, setAboutMeContent] = useState<AboutMeContentDB[]>([]);

  const [isSkillsLoading, setIsSkillsLoading] = useState(false);
  const [isSkillsFetched, setIsSkillsFetched] = useState(false);
  const [skills, setSkills] = useState<SkillsDB[]>([]);

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
        return isAboutMeContentLoading || isSkillsLoading ? (<LoaderScreen />) : (<AboutSection aboutMeContent={aboutMeContent} skills={skills} />);
      case "experience":
        return isExperiencesLoading ? (<LoaderScreen />) : (<ExperienceSection experiences={experiences} />)
      case "projects":
        return isProjectsLoading ? (<LoaderScreen />) : (<ProjectsSection projects={projects} />)
      case "education":
        return isEducationsLoading ? (<LoaderScreen />) : (<EducationSection educations={educations} />)
      case "posts":
        return isPostsLoading ? (<LoaderScreen />) : (<PostsSection posts={posts} />)
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

    const fetchPosts = () => {
      setIsPostsLoading(true);
      getDocs(collection(db, "posts"))
        .then((snap) => {

          const data: PostDB[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<PostDB, "id">), // Type assertion for Firestore data
          }));

          setPosts(data);
          setIsPostsFetched(true);
        })
        .catch(console.error)
        .finally(() => setIsPostsLoading(false));
    };

    const fetchEducations = () => {
      setIsEducationsLoading(true);
      getDocs(collection(db, "education"))
        .then((snap) => {

          const data: EducationDB[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<EducationDB, "id">), // Type assertion for Firestore data
          }));

          setEducations(data);
          setIsEducationsFetched(true);
        })
        .catch(console.error)
        .finally(() => setIsEducationsLoading(false));
    };

    const fetchExperiences = () => {
      setIsExperiencesLoading(true);
      getDocs(collection(db, "experience"))
        .then((snap) => {

          const data: ExperienceDB[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<ExperienceDB, "id">), // Type assertion for Firestore data
          }));

          setExperiences(data);
          setIsExperiencesFetched(true);
        })
        .catch(console.error)
        .finally(() => setIsExperiencesLoading(false));
    };

    const fetchAboutMeContent = () => {
      setIsAboutMeContentLoading(true);
      getDocs(collection(db, "aboutMe"))
        .then((snap) => {

          const data: AboutMeContentDB[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<AboutMeContentDB, "id">), // Type assertion for Firestore data
          }));

          setAboutMeContent(data);
          setIsAboutMeContentFetched(true);
        })
        .catch(console.error)
        .finally(() => setIsAboutMeContentLoading(false));
    };

    const fetchSkills = () => {
      setIsSkillsLoading(true);
      getDocs(collection(db, "skills"))
        .then((snap) => {

          const data: SkillsDB[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<SkillsDB, "id">), // Type assertion for Firestore data
          }));

          setSkills(data);
          setIsSkillsFetched(true);
        })
        .catch(console.error)
        .finally(() => setIsSkillsLoading(false));
    };

    if ((activeTab === "projects") && !isProjectsFetched) {
      fetchProjects();
    }

    if ((activeTab === "posts") && !isPostsFetched) {
      fetchPosts();
    }

    if ((activeTab === "education") && !isEducationsFetched) {
      fetchEducations();
    }

    if ((activeTab === "experience") && !isExperiencesFetched) {
      fetchExperiences();
    }

    if ((activeTab === "about") && !isAboutMeContentFetched && !isSkillsFetched) {
      fetchAboutMeContent();
      fetchSkills();
    }


  }, [activeTab, isProjectsFetched, isPostsFetched, isExperiencesFetched,
    isEducationsFetched, isAboutMeContentFetched, isSkillsFetched]);


  const handleTabButtonPressed = (labelName: string) => {

    setActiveTab(labelName)
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
  }

  const renderDesktop = () => {

    return (
      <div
        ref={contentContainerRef}
        className='flex flex-col w-full items-start justify-center min-h-screen text-zinc-900 bg-white'>

        <div className='flex flex-col justify-start w-full'>

          <nav className='flex flex-row w-full justify-center z-0'>
            {tabs.map(({ label, Icon }, index) => (
              <FolderTab key={index} label={label} activeTab={activeTab} handleTabPressed={handleTabButtonPressed} Icon={Icon} />
            ))}
          </nav>

          <div className="relative w-full flex min-h-screen justify-center items-start bg-[#e9e9e9] shadow-xl">

            <div className='flex w-full flex-row py-5 text-zinc-900 bg-emerald-200 rounded mb-4 mt-2 mx-4 shadow-md'>

              <PageBinding />

              <div className='absolute w-1/30 left-1/12 sm:left-1/12 md:left-1/15 lg:left-1/18
               top-1/400 sm:-top-1/400 md:-top-1/180 lg:-top-1/140 z-10'>
                <img
                  src={paperClip} />
              </div>

              <div className='px-4 w-11/12'>

                <PageHeader/>
                {handleContentsSection(activeTab)}
                <PageFooter/>
              </div>
            </div>
          </div>
        </div>

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
          backgroundColor: "#fff",
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
