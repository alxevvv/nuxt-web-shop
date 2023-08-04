export interface Asset {
  _type: "reference"
  _ref: string
}

export interface Image {
  _type: "image"
  asset: Asset
}

export interface Slug {
  _type: "slug"
  current: string
}
