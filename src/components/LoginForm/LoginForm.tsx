import { FC, FormEvent, useContext, useState } from 'react'
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

import { User } from '../../models'

import EyeSlashFilledIcon from './parts/EyeSlashFilledIcon'
import EyeFilledIcon from './parts/EyeFilledIcon'

import style from '../../App.module.scss'
import UserContext from '../../store/UserContext.ts'
import cartContext from '../../store/CartContext.ts'
import { useQueryClient } from '@tanstack/react-query'
import { getUser, getUserCart, postAuth } from '../../api'
import { jwtDecode } from 'jwt-decode'
import { ActionType } from '../../store/UserReducer.ts'
import { ActionType as CartAction } from '../../store/CartReducer.ts'

type Props = {
  btnText: string,
}

const LoginForm: FC<Props> = ({btnText}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [auth, setAuth] =
    useState<Pick<User, 'username' | 'password'>>({ username: '', password: '' })
  const { dispatchUser: dispatchUser } = useContext(UserContext)
  const { dispatchCart: dispatchCart } = useContext(cartContext)
  const [validation, setValidation] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const queryClient = useQueryClient()
  const { onOpen, onOpenChange } = useDisclosure()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleChangeAuth = (payload: Partial<User>) => {
    setAuth(prevUserData => ({ ...prevUserData, ...payload }))
  }

  const handleSubmitAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { token } = await queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: () => postAuth(auth.username, auth.password)
      })

      const { sub } = jwtDecode<Record<'sub', number>>(token)

      const user = await queryClient.fetchQuery({ queryKey: ['user', `${sub}`], queryFn: () => getUser(sub) })

      dispatchUser({
        type: ActionType.SetUser,
        payload: user
      })

      const [userCart] = await queryClient.fetchQuery({ queryKey: ['cart'], queryFn: () => getUserCart(sub) })

      dispatchCart({
        type: CartAction.SetCart,
        payload: userCart
      })

    } catch (error) {
      console.error(error)
      setValidation(true)
    }
  }

  const handleToggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      <Button onPress={onOpen} onClick={() => setIsOpen(true)} color="primary" variant="solid">
        {btnText}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>

        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmitAuth}>

                <ModalHeader className="flex flex-col gap-1">
                  <FormattedMessage id={'form.title'} />
                </ModalHeader>

                <ModalBody className="gap-1">
                  <div className={cn(style.errorWrapper)}>
                    <Input
                      className="max-w-xs"
                      type="text"
                      value={auth.username}
                      onChange={(e) => handleChangeAuth({ username: e.target.value })}
                      isRequired
                      placeholder={formatMessage({ id: 'form.login.placeholder' })}
                      label={formatMessage({ id: 'form.login.label' })}
                      variant="bordered"
                      isInvalid={validation}
                      onFocus={() => setValidation(false)}
                      errorMessage={validation ? formatMessage({ id: 'form.validation.error' }) : null}
                    />
                  </div>

                  <Input
                    value={auth.password}
                    onChange={(e) => handleChangeAuth({ password: e.target.value })}
                    isRequired
                    label={formatMessage({ id: 'form.password.label' })}
                    placeholder={formatMessage({ id: 'form.password.placeholder' })}
                    variant="bordered"
                    isInvalid={validation}
                    onFocus={() => setValidation(false)}
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
