import {CartItem, Product} from "@/models"

const useCartStore = defineStore("cart", () => {
  const {$urlFor} = useNuxtApp()

  const {data: items, isInitialized: isItemsLoaded} = useCookieRef<CartItem[]>(
    "cart-items",
    []
  )

  const numItems = computed(() => items.value.length)
  const numUnits = computed(() =>
    items.value.reduce((acc, {quantity}) => acc + quantity, 0)
  )
  const itemsPrice = computed(() =>
    round(
      items.value.reduce((acc, {price, quantity}) => acc + price * quantity, 0)
    )
  )

  function _findItem(id: string) {
    return items.value.find(({_id}) => _id === id)
  }

  function _productToCartItem(product: Product, quantity: number): CartItem {
    return {
      _id: product._id,
      name: product.name,
      slug: product.slug.current,
      image: $urlFor(product.image).size(128, 128).url(),
      countInStock: product.countInStock,
      price: product.price,
      quantity,
    }
  }

  async function add(id: string) {
    const existItem = _findItem(id)
    const quantity = (existItem?.quantity ?? 0) + 1

    const {data: product, error} = await useFetch<Product>(`/api/product/${id}`)

    if (!product.value) {
      return {
        success: false,
        error: error.value?.message ?? "Unable to add product",
      }
    }

    if (product.value?.countInStock < quantity) {
      return {
        success: false,
        error: "Sorry, product is out of stock",
      }
    }

    const cartItem = _productToCartItem(product.value, quantity)

    if (!existItem) {
      items.value = [...items.value, cartItem]
    } else {
      items.value = items.value.map((item) =>
        item._id === cartItem._id ? cartItem : item
      )
    }

    return {
      success: true,
      error: null,
    }
  }

  function update(id: string, quantity: number) {
    if (quantity < 1) {
      remove(id)
    } else {
      items.value = items.value.map((item) =>
        item._id === id ? {...item, quantity} : item
      )
    }
  }

  function remove(id: string) {
    items.value = items.value.filter((item) => item._id !== id)
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    isItemsLoaded,
    numItems,
    numUnits,
    itemsPrice,

    add,
    update,
    remove,
    clear,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}

export {useCartStore}
