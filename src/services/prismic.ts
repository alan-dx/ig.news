import Prismic from '@prismicio/client'

export function getPrisimicClient(req?: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_ENTRYPOINT,
    {
      req,
      accessToken: process.env.PRISMIC_CMS_TOKEN
    }
  )

  return prismic
}