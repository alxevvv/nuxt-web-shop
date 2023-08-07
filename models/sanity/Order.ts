import {OrderItem} from "./OrderItem"
import {PaymentResult} from "./PaymentResult"
import {ShippingAddress} from "./ShippingAddress"
import {Model} from "./internals"
import {PaymentInfo} from "@/stores"

interface Order extends Model<"order"> {
  user: {
    _ref: string
    _type: "reference"
  }
  username: string
  items: (OrderItem & {_key: string})[]
  shippingAddress: ShippingAddress
  paymentMethod: Omit<PaymentInfo["method"], "">
  paymentResult?: PaymentResult
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
}

export type {Order}
