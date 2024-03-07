import { FC, ReactNode } from 'react'

import styles from '../../App.module.scss'

type Props = {
  children: ReactNode
}

const Container: FC<Props> = ({children}) => (
  <div className={styles.container}>{children}</div>
)

export default Container
