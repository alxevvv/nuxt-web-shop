import {Image, Slug} from "./sanity"

export interface Product {
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  _type: "product"
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
