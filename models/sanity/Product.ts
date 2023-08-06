import {Image, Slug, Model} from "./internals"

export interface Product extends Model<"product"> {
  name: string
  description: string
  category: string
  price: number
  countInStock: number
  numReviews: number
  rating: number
  brand: string
  image: Image
  slug: Slug
}
