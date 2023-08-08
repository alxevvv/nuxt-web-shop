import {q} from "groqd"
import {Product} from "@/models"

const useSearchStore = defineStore("search", () => {
  const sanity = useSanityClient()
  const router = useRouter()
  const route = useRoute()

  const searchQuery = ref((route.query.q as string) || "")

  const category = ref((route.query.category as string) || "All")
  const price = ref((route.query.price as string) || "All")
  const rating = ref((route.query.rating as string) || "All")

  const sort = ref((route.query.sort as string) || "default")

  const isProductsLoading = ref(false)
  const isCategoriesLoading = ref(false)

  const categories = ref<string[] | null>(null)
  const products = ref<Product[] | null>(null)

  const isFiltersApplied = computed(
    () => !!route.query.category || !!route.query.price || !!route.query.rating
  )
  const isFiltersChanged = computed(
    () =>
      category.value !== "All" ||
      price.value !== "All" ||
      rating.value !== "All"
  )

  function _buildGroqhQuery() {
    let groqQuery = q("*").filter("_type == 'product'")

    if (category.value !== "All") {
      groqQuery = groqQuery.filter(`category match '${category.value}'`)
    }

    if (searchQuery.value.length > 2) {
      groqQuery = groqQuery.filter(`name match '${searchQuery.value}'`)
    }

    if (price.value !== "All") {
      const minPrice = +price.value.split("-")[0]
      const maxPrice = +price.value.split("-")[1]
      groqQuery = groqQuery.filter(
        `price >= ${minPrice} && price <= ${maxPrice}`
      )
    }

    if (rating.value !== "All") {
      groqQuery = groqQuery.filter(`rating >= ${+rating.value}`)
    }

    let order: `${string} asc` | `${string} desc` | "" = ""
    if (sort.value === "lowest") {
      order = "price asc"
    } else if (sort.value === "highest") {
      order = "price desc"
    } else if (sort.value === "toprated") {
      order = "rating desc"
    }

    if (order) {
      // @ts-ignore
      groqQuery = groqQuery.order(order)
    }

    return groqQuery
  }

  function _updateUrlQuery() {
    const newUrlQuery: Record<string, string> = {}

    if (category.value !== "All") {
      newUrlQuery.category = category.value
    }

    if (searchQuery.value.length > 2) {
      newUrlQuery.q = searchQuery.value
    }

    if (price.value !== "All") {
      newUrlQuery.price = price.value
    }

    if (rating.value !== "All") {
      newUrlQuery.rating = rating.value
    }

    if (sort.value !== "default") {
      newUrlQuery.sort = sort.value
    }

    const currentUrlQuery = route.query

    if (
      currentUrlQuery.category !== newUrlQuery.category ||
      currentUrlQuery.q !== newUrlQuery.q ||
      currentUrlQuery.price !== newUrlQuery.price ||
      currentUrlQuery.rating !== newUrlQuery.rating ||
      currentUrlQuery.sort !== newUrlQuery.sort
    ) {
      router.replace({path: route.path, query: newUrlQuery})
    }
  }

  async function updateProducts() {
    const groqQuery = _buildGroqhQuery()

    _updateUrlQuery()

    isProductsLoading.value = true
    products.value = await sanity.fetch<Product[]>(groqQuery.query)
    isProductsLoading.value = false
  }

  function resetFilters() {
    category.value = "All"
    price.value = "All"
    rating.value = "All"

    if (isFiltersApplied.value) {
      updateProducts()
    }
  }

  watch(sort, updateProducts)

  onMounted(async () => {
    isCategoriesLoading.value = true
    categories.value = await $fetch("/api/product/categories")
    isCategoriesLoading.value = false
  })

  return {
    searchQuery,

    category,
    price,
    rating,
    isFiltersChanged,
    isFiltersApplied,

    sort,

    isCategoriesLoading,
    isProductsLoading,

    products,
    categories,

    updateProducts,
    resetFilters,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}

export {useSearchStore}
