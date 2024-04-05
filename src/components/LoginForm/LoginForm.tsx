import { FC, FormEvent, useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl/lib'
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

import EyeSlashFilledIcon from './parts/EyeSlashFilledIcon.tsx'
import EyeFilledIcon from './parts/EyeFilledIcon.tsx'
import { useIntl } from 'react-intl'
import { getUser, postAuth } from '../../api'
import { useQueryClient } from '@tanstack/react-query'
import User from '../../models/user.ts'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../../store/UserContext.ts'
import { ActionType } from '../../store/UserReducer.ts'

const LoginForm: FC = () => {
  const [auth, setAuth] =
    useState<Pick<User, 'username' | 'password'>>({ username: '', password: '' })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { user, dispatch } = useContext(UserContext)

  console.log(user)

  const handleChangeUserData = (payload: Partial<User>) => {
    setAuth(prevUserData => ({ ...prevUserData, ...payload }))
  }

  const handleSubmitUserData = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const { token } = await queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: () => postAuth(auth.username, auth.password)
      })
      const { sub } = jwtDecode<Record<'sub', number>>(token)
      const user = await queryClient.fetchQuery({ queryKey: ['user', `${sub}`], queryFn: () => getUser(sub) })

      dispatch({
        type: ActionType.SetUser,
        payload: user
      })

    } catch (error) {
      console.error(error)
    }

  }

  // const handleSubmitUserData = (e: FormEvent) => {
  //   e.preventDefault()
  //   queryClient
  //     .fetchQuery({ queryKey: ['auth'], queryFn: () => postAuth(auth.username, auth.password) })
  //     .then(response => queryClient
  //       .fetchQuery({
  //         queryKey: ['user'],
  //         queryFn: () => getUser(jwtDecode<Record<'sub', number>>(response.token).sub)
  //       })
  //       .then((user) => dispatch({
  //         type: ACTION_TYPE.SET,
  //         payload: user
  //       }))
  //       .catch((err) => console.error('User was not found', err))
  //     )
  //     .catch((err) => console.error('The username or password is incorrect!', err))
  // }

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
