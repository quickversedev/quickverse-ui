const mockOrdersResponse = {
  ordersMetadata: [
    {
      orderId: 'QV6931496981463564',
      customerId: 1576482547300535,
      customerName: 'Abhilash Bhaiya',
      customerMobileNumber: 8801454674,
      customerDeliveryAddress: null,
      state: 'PENDING',
      totalOrderAmount: 499,
      totalItemCount: 1,
      totalProductCount: 1,
      totalInvoiceAmount: 499,
      fulfillmentOption: 'PICK_UP',
      creationTime: '1688716025703',
      productImageUrls: [
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
      ],
      stateLabel: 'Waiting for seller confirmation',
      orderDescription: 'Power Yoga T-shirt(Size-XL)',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/6931496981463564/order-details',
      storeName: '',
      productId: '123456',
      estimatedDeliveryDate: '2023-09-01T00:00:00.000Z',
      deliverydate: '2023-09-01T00:00:00.000Z',
    },
    {
      orderId: '6396141178054622',
      customerId: 1576482547300535,
      customerName: 'Uday Sir',
      customerMobileNumber: 8801454674,
      customerDeliveryAddress: null,
      state: 'PENDING',
      totalOrderAmount: 998,
      totalItemCount: 2,
      totalProductCount: 1,
      totalInvoiceAmount: 998,
      fulfillmentOption: 'PICK_UP',
      creationTime: '1688722062229',
      productImageUrls: [
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
      ],
      stateLabel: 'Waiting for seller confirmation',
      orderDescription: 'Power Yoga T-shirt',
      orderLink: 'https://www.google.com/',
      storeName: '',
      productId: '0123456',
      estimatedDeliveryDate: '2023-09-01T00:00:00.000Z',
      deliverydate: '2023-09-01T00:00:00.000Z',
    },
    {
      orderId: '7584938274657382',
      customerId: 1576482547300535,
      customerName: 'Raj Paswan',
      customerMobileNumber: 8801454674,
      customerDeliveryAddress: null,
      state: 'SHIPPED',
      totalOrderAmount: 1500,
      totalItemCount: 3,
      totalProductCount: 2,
      totalInvoiceAmount: 1500,
      fulfillmentOption: 'DELIVERY',
      creationTime: '1688739123456',
      productImageUrls: [
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
      ],
      stateLabel: 'Shipped',
      orderDescription: 'Yoga Mat and T-shirt',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/7584938274657382/order-details',
      storeName: '',
      productId: '1234256',
      estimatedDeliveryDate: '2023-09-01T00:00:00.000Z',
      deliverydate: '2023-09-01T00:00:00.000Z',
    },
    {
      orderId: '8673948572639485',
      customerId: 1576482547300535,
      customerName: 'Raj Paswan',
      customerMobileNumber: 8801454674,
      customerDeliveryAddress: '123 Yoga Street, Fitness City',
      state: 'DELIVERED',
      totalOrderAmount: 2500,
      totalItemCount: 4,
      totalProductCount: 3,
      totalInvoiceAmount: 2500,
      fulfillmentOption: 'DELIVERY',
      creationTime: '1688745678901',
      productImageUrls: [
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
      ],
      stateLabel: 'Delivered',
      orderDescription: 'Yoga Mat, T-shirt, and Water Bottle',
      orderLink:
        'https://www.smartbiz.in/teststoring-devops/orders/8673948572639485/order-details',
      storeName: '',
      productId: '123456ss7',
      estimatedDeliveryDate: '2023-09-01T00:00:00.000Z',
      deliverydate: '2023-09-01T00:00:00.000Z',
    },
    {
      orderId: '9023847503847502',
      customerId: 1576482547300535,
      customerName: 'Raj Paswan',
      customerMobileNumber: 8801454674,
      customerDeliveryAddress: null,
      state: 'CANCELLED',
      totalOrderAmount: 750,
      totalItemCount: 2,
      totalProductCount: 1,
      totalInvoiceAmount: 750,
      fulfillmentOption: 'PICK_UP',
      creationTime: '1688756789012',
      productImageUrls: [
        'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
      ],
      stateLabel: 'Cancelled by customer',
      orderDescription: 'Fitness Gloves',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/9023847503847502/order-details',
      storeName: '',
      productId: '123456sds7',
      estimatedDeliveryDate: '2023-09-01T00:00:00.000Z',
      deliverydate: '2023-09-01T00:00:00.000Z',
    },
  ],
};

export default mockOrdersResponse;
