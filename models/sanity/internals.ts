interface Asset {
  _type: "reference"
  _ref: string
}

interface Image {
  _type: "image"
  asset: Asset
}

interface Slug {
  _type: "slug"
  current: string
}

interface Model<T extends string> {
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  _type: T
}

export type {Asset, Image, Model, Slug}
