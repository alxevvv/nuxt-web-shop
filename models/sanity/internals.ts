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

export type {Asset, Image, Slug}
