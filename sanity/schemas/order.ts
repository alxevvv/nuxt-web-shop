export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'username',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          title: 'Order Item',
          type: 'orderItem',
        },
      ],
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'shippingAddress',
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
    },
    {
      name: 'paymentResult',
      title: 'Payment Result',
      type: 'paymentResult',
    },
    {
      name: 'itemsPrice',
      title: 'Items Price',
      type: 'number',
    },
    {
      name: 'shippingPrice',
      title: 'Shipping Price',
      type: 'number',
    },
    {
      name: 'taxPrice',
      title: 'Tax Price',
      type: 'number',
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'isPaid',
      title: 'Is Paid',
      type: 'boolean',
    },
    {
      name: 'paidAt',
      title: 'Paid At',
      type: 'datetime',
    },
    {
      name: 'isDelivered',
      title: 'Is Delivered',
      type: 'boolean',
    },
    {
      name: 'deliveredAt',
      title: 'Delivered At',
      type: 'datetime',
    },
  ],
}
