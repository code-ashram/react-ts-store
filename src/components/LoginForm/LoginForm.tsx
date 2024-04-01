import { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl/lib'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure
} from '@nextui-org/react'

import EyeSlashFilledIcon from './parts/EyeSlashFilledIcon.tsx'
import EyeFilledIcon from './parts/EyeFilledIcon.tsx'
import { useIntl } from 'react-intl'

const LoginForm: FC = () => {
  const { formatMessage } = useIntl()
  const [isVisible, setIsVisible] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="solid">
        <FormattedMessage id={'navBar.link.signIn'} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>

        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <FormattedMessage id={'form.title'} />
              </ModalHeader>

              <ModalBody>
                <Input
                  className="max-w-xs"
                  type="text"
                  isRequired
                  placeholder={formatMessage({ id: 'form.login.placeholder' })}
                  label={formatMessage({ id: 'form.login.label' })}
                  variant="bordered"
                />

                <Input
                  isRequired
                  label={formatMessage({ id: 'form.password.label' })}
                  placeholder={formatMessage({ id: 'form.password.placeholder' })}
                  variant="bordered"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
                  Зарегестрироваться
                </Button>
                <Button color="primary" onPress={onClose}>
                  Войти
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginForm
