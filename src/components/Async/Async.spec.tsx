import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText('Hello world')).toBeInTheDocument()
  
  // expect(await screen.findByText('Botao')).toBeInTheDocument()//find irá esperar o componente ser renderizado

  // waitFor(() => {//waitFor ira executar diversas vez até que o que estiver sendo expect aconteça, funciona para funções, componentes, etc
  //   return expect(screen.getByText('Botao')).toBeInTheDocument()
  // }, {//options do waitFor
  //   interval: 2000
  // })

  await waitForElementToBeRemoved(screen.queryByText('Botao'))

  //getBy > busca o elemento
  //findBy > busca o elemento de forma sincrona e assincorna
  //queryBy > busca o elemento de forma sincrona e assincorna, porém não retorna erro se não encontrar

})

