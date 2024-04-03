import { FC, FormEvent, useState } from 'react'
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
import { postAuth } from '../../api'
import { useQueryClient } from '@tanstack/react-query'
import User from '../../models/user.ts'
import { jwtDecode } from 'jwt-decode'

// type Props = {
//   onSubmit: (userData: User) => void
// }

const LoginForm: FC = () => {
  const { formatMessage } = useIntl()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [auth, setAuth] =
    useState<Pick<User, 'username' | 'password'>>({ username: '', password: '' })
  const queryClient = useQueryClient()

  const handleChangeUserData = (payload: Partial<User>) => {
    setAuth(prevUserData => ({ ...prevUserData, ...payload }))
  }

  const handleSubmitUserData = (e: FormEvent) => {
    e.preventDefault()
    queryClient
      .fetchQuery({ queryKey: ['auth'], queryFn: () => postAuth(auth.username, auth.password) })
      .then(response => jwtDecode(response.token).sub)
      .catch(() => console.log('The username or password is incorrect!'))
  }

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
              <form onSubmit={handleSubmitUserData}>

                <ModalHeader className="flex flex-col gap-1">
                  <FormattedMessage id={'form.title'} />
                </ModalHeader>

                <ModalBody>
                  <Input
                    className="max-w-xs"
                    type="text"
                    value={auth.username}
                    onChange={(e) => handleChangeUserData({ username: e.target.value })}
                    isRequired
                    placeholder={formatMessage({ id: 'form.login.placeholder' })}
                    label={formatMessage({ id: 'form.login.label' })}
                    variant="bordered"
                  />

                  <Input
                    value={auth.password}
                    onChange={(e) => handleChangeUserData({ password: e.target.value })}
                    isRequired
                    label={formatMessage({ id: 'form.password.label' })}
                    placeholder={formatMessage({ id: 'form.password.placeholder' })}
                    variant="bordered"
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
                    Зарегестрироваться
                  </Button>
                  <Button color="primary" type="submit">
                    Войти
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
