export interface OrderMetadata {
  orderId: number;
  customerId: number;
  customerName: string;
  customerMobileNumber: number;
  customerDeliveryAddress: string | null;
  state: string;
  totalOrderAmount: number;
  totalItemCount: number;
  totalProductCount: number;
  totalInvoiceAmount: number;
  fulfillmentOption: string;
  creationTime: string;
  productImageUrls: string[];
  stateLabel: string;
  orderDescription: string;
  orderLink: string;
}

export interface OrdersResponse {
  ordersMetadata: OrderMetadata[];
}

const mockOrdersResponse: OrdersResponse = {
  ordersMetadata: [
    {
      orderId: 6931496981463564,
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
      ],
      stateLabel: 'Waiting for seller confirmation',
      orderDescription: 'Power Yoga T-shirt(Size-XL)',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/6931496981463564/order-details',
    },
    {
      orderId: 6396141178054622,
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
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FCotton-Graphic-Printed-Pattern-Shirt%2Fdp%2FB0C6B77F8D&psig=AOvVaw0dBGVYCk5O_iJsRAWaWH_a&ust=1724654322990000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLD5qpTEj4gDFQAAAAAdAAAAABAE',
      ],
      stateLabel: 'Waiting for seller confirmation',
      orderDescription: 'Power Yoga T-shirt',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/6396141178054622/order-details',
    },
    {
      orderId: 7584938274657382,
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
        'https://alpha.eu.smartpos-api.seller-fulfillment-tech.amazon.dev/images/3858/abcd1234-2a2d-43be-9e18-3d0d014ff323_1688533094322.jpg',
      ],
      stateLabel: 'Shipped',
      orderDescription: 'Yoga Mat and T-shirt',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/7584938274657382/order-details',
    },
    {
      orderId: 8673948572639485,
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
        'https://alpha.eu.smartpos-api.seller-fulfillment-tech.amazon.dev/images/3858/efgh5678-2a2d-43be-9e18-3d0d014ff323_1688533094322.jpg',
      ],
      stateLabel: 'Delivered',
      orderDescription: 'Yoga Mat, T-shirt, and Water Bottle',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/8673948572639485/order-details',
    },
    {
      orderId: 9023847503847502,
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
        'https://alpha.eu.smartpos-api.seller-fulfillment-tech.amazon.dev/images/3858/ijkl9012-2a2d-43be-9e18-3d0d014ff323_1688533094322.jpg',
      ],
      stateLabel: 'Cancelled by customer',
      orderDescription: 'Fitness Gloves',
      orderLink:
        'https://www.smartbiz.in/teststore-devops/orders/9023847503847502/order-details',
    },
  ],
};

export default mockOrdersResponse;
