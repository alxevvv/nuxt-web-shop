import {useCartStore} from "@/stores"
import {Product} from "@/models"

function useAddToCart(product: Product) {
  const cartStore = useCartStore()
  const snackbar = useSnackbar()

  async function addToCart() {
    const {error} = await cartStore.add(product._id)
    if (error) {
      snackbar.add({
        type: "error",
        text: error,
      })
    } else {
      snackbar.add({
        type: "success",
        text: `${product.name} added to the cart`,
      })
    }
  }

  return addToCart
}

export {useAddToCart}
