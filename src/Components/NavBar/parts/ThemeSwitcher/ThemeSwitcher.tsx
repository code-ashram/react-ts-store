import {Switch} from "@nextui-org/react";

import MoonIcon from "./assets/images/MoonIcon.tsx";
import SunIcon from "./assets/images/SunIcon.tsx";
import { FC } from 'react'

type Props = {
  onSwitch: () => void
}

const ThemeSwitcher: FC<Props> = ({onSwitch}) => {

  return (
    <Switch
      onChange={onSwitch}
      defaultSelected
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    >
    </Switch>
  );
}

export default ThemeSwitcher
