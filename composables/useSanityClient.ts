import {createClient} from "@sanity/client"

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-08-05",
  token:
    import.meta.env.SSR === false
      ? undefined
      : import.meta.env.SANITY_AUTH_TOKEN,
})

function useSanityClient() {
  return client
}

export {useSanityClient}
