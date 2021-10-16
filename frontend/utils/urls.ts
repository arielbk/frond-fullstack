const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

type Image = {
  url: string
}

export const fromImageToUrl = (image: Image) => {
  if (!image) return '/vercel.svg'

  // relative path to image
  if (image.url.indexOf('/') === 0) return `${API_URL}${image.url}`

  return image.url
}
