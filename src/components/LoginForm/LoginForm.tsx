import { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl/lib'
import { useIntl } from 'react-intl'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import cn from 'classnames'

import User from '../../models/user.ts'

import EyeSlashFilledIcon from './parts/EyeSlashFilledIcon.tsx'
import EyeFilledIcon from './parts/EyeFilledIcon.tsx'

import style from '../../App.module.scss'

type Props = {
  auth: Pick<User, 'username' | 'password'>
  onChange: (payload: Partial<User>) => void
  onSubmit: (e: Pick<User, "username" | "password">) => Promise<void>
  isInvalid: boolean
  onFocus: () => void
}

const LoginForm: FC<Props> = ({auth, onChange, onSubmit, onFocus, isInvalid}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleToggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="solid">
        <FormattedMessage id={'navBar.link.signIn'} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>

        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => {
                e.preventDefault()
                onSubmit(auth).then(r => r)
              }}>

                <ModalHeader className="flex flex-col gap-1">
                  <FormattedMessage id={'form.title'} />
                </ModalHeader>

                <ModalBody className='gap-1'>
                  <div className={cn(style.errorWrapper)}>
                    <Input
                      className="max-w-xs"
                      type="text"
                      value={auth.username}
                      onChange={(e) => onChange({ username: e.target.value })}
                      isRequired
                      placeholder={formatMessage({ id: 'form.login.placeholder' })}
                      label={formatMessage({ id: 'form.login.label' })}
                      variant="bordered"
                      isInvalid={isInvalid}
                      onFocus={onFocus}
                      errorMessage={isInvalid ? "Please enter a valid username or password" : null}
                    />
                  </div>

                  <Input
                    value={auth.password}
                    onChange={(e) => onChange({ password: e.target.value })}
                    isRequired
                    label={formatMessage({ id: 'form.password.label' })}
                    placeholder={formatMessage({ id: 'form.password.placeholder' })}
                    variant="bordered"
                    isInvalid={isInvalid}
                    onFocus={onFocus}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={handleToggleVisibility}>
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    className="max-w-xs"
                  />
                </ModalBody>

                <ModalFooter className="justify-start">
                  <Button color="primary" variant="flat" onPress={onClose}>
                    <FormattedMessage id={'form.btn.register'} />
                  </Button>
                  <Button color="primary" type="submit">
                    <FormattedMessage id={'form.btn.signIn'} />
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginForm
