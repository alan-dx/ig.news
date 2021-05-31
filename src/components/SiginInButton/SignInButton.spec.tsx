import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock("next-auth/client")

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {

    //quando se quer retornar coisas distintas em uma função mockada. Necesário instalar a lib ts-jest, para usar com ts
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])//faz com que o retorno informado seja esperado apenas para o primeiro retorno da função, no caso apenas para esse teste

    render(
      <SignInButton />
    )

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {

      //quando se quer retornar coisas distintas em uma função mockada. Necesário instalar a lib ts-jest, para usar com ts
      const useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce([{
        user: {name: 'John Doe', email: 'john@example.com'}, expires: 'fake'}, 
        false
    ])//faz com que o retorno informado seja esperado apenas para o primeiro retorno da função, no caso apenas para esse teste

    render(
      <SignInButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

})