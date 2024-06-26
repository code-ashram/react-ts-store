import { FC } from 'react'
import {Switch} from "@nextui-org/react";

import MoonIcon from "./assets/images/MoonIcon.tsx";
import SunIcon from "./assets/images/SunIcon.tsx";

type Props = {
  onSwitch: () => void
  isActive: boolean
}

const ThemeSwitcher: FC<Props> = ({onSwitch, isActive}) => {

  return (
    <Switch
      onChange={onSwitch}
      defaultSelected={isActive}
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    >
    </Switch>
  )
}

export default ThemeSwitcher
