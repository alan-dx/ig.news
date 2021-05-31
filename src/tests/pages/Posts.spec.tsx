import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { mocked } from 'ts-jest/utils'
import { getPrisimicClient } from '../../services/prismic'

const posts = [{
  slug: 'my-new-post',
  title: 'My New Post',
  excerpt: 'Post excerpt',
  updatedAt: '10 de Abril'
}]

jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrisimicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post'}
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt'}
              ],
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})//Pega o retorno do getStaticProps e compara com resultado, como no código abaixo

    expect(response).toEqual(//toEqual compara response com o objeto indicado abaixo
      expect.objectContaining({//verificando se existe, ao menos, as informações abaixo (pode conter outras)
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '2021-04-01'
          }]
        }
      })
    )

  })
})