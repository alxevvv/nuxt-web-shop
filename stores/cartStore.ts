import {CartItem, Product} from "@/models"

const useCartStore = defineStore("cart", () => {
  const {$urlFor} = useNuxtApp()
  const items = useCookie<CartItem[]>("cart-items", {default: () => []})

  const numItems = computed(() => items.value.length)

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

    const {data: product, error} = await useFetch(`/api/product/${id}`)

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

  function remove(id: string) {
    items.value = items.value.filter((item) => item._id !== id)
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    numItems,

    add,
    remove,
    clear,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}

export {useCartStore}
