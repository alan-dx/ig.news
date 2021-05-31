import { render, screen } from '@testing-library/react'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { mocked } from 'ts-jest/utils'
import { getPrisimicClient } from '../../services/prismic'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')
jest.mock('next/router')

describe('Post preview page', () => {
  it('renders correctly', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Subscribe now 🤗')).toBeInTheDocument()

  }) //1:56

  it('redirects user to full post when is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushOfUseRouterMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushOfUseRouterMock
    } as any)

    render(<Post post={post} />)

    expect(pushOfUseRouterMock).toHaveBeenCalledWith(`/posts/${post.slug}`)

  })

  it('loads initial data', async () => {

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

    const response = await getStaticProps({ params: { slug: 'my-new-post'}})

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