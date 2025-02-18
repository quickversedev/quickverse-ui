// import {OrdersResponse} from './models'; // Adjust the import path as needed

import {OrdersResponse} from '../utils/canonicalModel';

export const mockOrdersResponse: OrdersResponse = {
  ordersMetadata: [
    {
      orderId: '6931496981463564',
      customerId: '1576482547300535',
      customerName: 'Raj Paswan',
      customerMobileNumber: '8801454674',
      customerDeliveryAddress: null,
      state: 'PENDING',
      totalOrderAmount: 499,
      totalItemCount: 1,
      totalProductCount: 1,
      totalInvoiceAmount: 499,
      fulfillmentOption: 'PICK_UP',
      creationTime: '1688716025703',
      productImageUrls: [
        'https://alpha.eu.smartpos-api.seller-fulfillment-tech.amazon.dev/images/3858/80c86c3c-2a2d-43be-9e18-3d0d014ff323_1688533094322.jpg',
      ],
      stateLabel: 'Waiting for seller confirmation',
      orderDescription: 'Power Yoga T-shirt',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/6396141178054622/order-details',
    },
    {
      orderId: '6396141178054622',
      customerId: '1576482547300535',
      customerName: 'Raj Paswan',
      customerMobileNumber: '8801454674',
      customerDeliveryAddress: null,
      state: 'PENDING',
      totalOrderAmount: 998,
      totalItemCount: 2,
      totalProductCount: 1,
      totalInvoiceAmount: 998,
      fulfillmentOption: 'PICK_UP',
      creationTime: '1688722062229',
      productImageUrls: [
        'https://alpha.eu.smartpos-api.seller-fulfillment-tech.amazon.dev/images/3858/80c86c3c-2a2d-43be-9e18-3d0d014ff323_1688533094322.jpg',
      ],
      stateLabel: 'Waiting for seller confirmation',
      orderDescription: 'Power Yoga T-shirt',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/6396141178054622/order-details',
    },
  ],
  cursor: {
    orderId: '6931496981463564',
    customerId: '1576482547300535',
    platform: 'QUICKVERSE',
  },
};
