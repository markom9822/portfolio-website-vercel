import type { JSX } from "react";
import { canadaFlagIcon, ukFlagIcon } from "../components/Icons";

export interface CountryFlagInfo {
  name: string,
  icon: JSX.Element,
}

export const getFlagFromName = (name: string) : CountryFlagInfo | null => {

    const flag = CountryFlag.find((item) => item.name.toLowerCase() === name.toLowerCase())
    if(flag !== undefined)
    {
        return flag
    }
    else
    {
        return null
    }
}

export const CountryFlag : CountryFlagInfo[] = [
  {
    name: 'united kingdom',
    icon: ukFlagIcon,
  },
  {
    name: 'Canada',
    icon: canadaFlagIcon,
  }
];