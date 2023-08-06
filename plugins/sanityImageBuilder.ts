import {SanityImageSource} from "@sanity/image-url/lib/types/types"
import imageUrlBuilder from "@sanity/image-url"
import {useSanityClient} from "@/composables"

export default defineNuxtPlugin(() => {
  const sanity = useSanityClient()
  const builder = imageUrlBuilder({clientConfig: sanity.config()})

  function urlFor(source: SanityImageSource) {
    return builder.image(source).auto("format")
  }

  return {
    provide: {urlFor},
  }
})
