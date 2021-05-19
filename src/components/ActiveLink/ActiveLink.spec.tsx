import { render } from '@testing-library/react'
import { ActiveLink } from '.'

//mock (imitação)
jest.mock('next/router', () => {//o primeiro parâmetro indica qual módulo é importado
  //indicando o retorno do que é importado pelo next/router:
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('Active Link component', () => {//o describe é utilizado quando deseja-se agrupar os testes, indicando qual sessão ele faz parte
 
  it('renders correctly', () => {
    //itE UNITÁRIO PARA O COMPONENTE: ActiveLink
     const { debug, getByText } = render(//o métoro render indica qual componente deve ser renderizado
       //Como o ActiveLink utiliza o useRouter(), que é uma função provida do NextJS, ou seja algo externo do componente,
       //será necessário utilizar um mock (imitação, linha 4), para informar qual o retorno o useRouter() dará
       //Lembre-se que estamos testando o ActiveLink isoladamente
      <ActiveLink href="/" activeClassName="active" >
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toBeInTheDocument()//Indicando o resultado esperado no teste. getByText('Home') indica que, no retorno, deve existir o texto Home no componente
  
    // debug()//irá retornar uma espécie de console.log do html gerado pelo teste acima
  })
  
  it('adds active class if the link as currently active', () => {
    
     const { getByText } = render(
       //o teste passará quando o href foi igual ao asPath indicado na linha 4, que é a condicional passada no componente de fato
      <ActiveLink href="/" activeClassName="active" >
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toHaveClass('active')//Indicando o resultado esperado no teste. O retorno deve conter a classe active
  
  })
})