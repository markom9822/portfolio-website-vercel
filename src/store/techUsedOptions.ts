import type { JSX } from "react"
import { codemirrorIcon, electronIcon, expoIcon, figmaIcon, gitIcon, jotaiIcon, markdownIcon, reactIcon, tailwindCSSIcon, typescriptIcon, viteIcon } from "../components/Icons"

export interface TechUsedInfo {
  name: string,
  icon: JSX.Element,
}


export const getTechUsedFromName = (name: string) : TechUsedInfo | null => {

    const tech = TechUsed.find((item) => item.name === name)
    if(tech !== undefined)
    {
        return tech
    }
    else
    {
        return null
    }
}

export const getTechNamesArray = () => {

    return TechUsed.map(tech => tech.name);
}

export const TechUsed : TechUsedInfo[] = [
  {
    name: 'React',
    icon: reactIcon,
  },
  {
    name: 'Vite',
    icon: viteIcon,
  },
  {
    name: 'Typescript',
    icon: typescriptIcon,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwindCSSIcon,
  },
  {
    name: 'Git',
    icon: gitIcon,
  },
  {
    name: 'Figma',
    icon: figmaIcon,
  },
  {
    name: 'Electron',
    icon: electronIcon,
  },
  {
    name: 'Markdown',
    icon: markdownIcon,
  },
  {
    name: 'Jotai',
    icon: jotaiIcon,
  },
  {
    name: 'Codemirror',
    icon: codemirrorIcon,
  },
  {
    name: 'Expo',
    icon: expoIcon,
  },

];