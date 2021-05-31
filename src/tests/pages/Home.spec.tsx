import { render, screen } from '@testing-library/react'
import { stripe } from '../../services/stripe'
import Home, { getStaticProps } from '../../pages'
import { mocked } from 'ts-jest/utils'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [
        null,
        false
      ]
    }
  }
})

jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$ 10,00'}} />)

    expect(screen.getByText('for R$ 10,00 month')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve)

    retriveStripePricesMocked.mockResolvedValueOnce({//Resolved pois é uma função assincrona
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)//moka o resultado da req do stripe

    const response = await getStaticProps({})//Lembre-se: o retorno do retrive do stripe vai ser utilizado no getStaticProps

    expect(response).toEqual(//toEqual compara response com o objeto indicado abaixo
      expect.objectContaining({//verificando se existe, ao menos, as informações abaixo
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )

  })
})