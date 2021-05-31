import { render, screen } from '@testing-library/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { mocked } from 'ts-jest/utils'
import { getPrisimicClient } from '../../services/prismic'
import { getSession } from 'next-auth/client'

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValue({
      activeSubscription: null
    } as any)

    const response = await getServerSideProps({ params: {slug: 'fake-slug'}} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/',
          permanent: false
        }
      })
    )

  })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active'
    } as any)

    const getPrismicClientMocked = mocked(getPrisimicClient)
    getPrismicClientMocked.mockReturnValue({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heaeding', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post excerpt'}
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getServerSideProps({ params: { slug: 'my-new-post'}} as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post excerpt</p>',
            updatedAt: '2021-04-01'
          }
        }
      })
    )

  })
})