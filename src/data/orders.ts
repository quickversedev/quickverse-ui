interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
}

const orders: Order[] = [
  {
    id: '1',
    date: '2023-05-01',
    items: ['Item 1', 'Item 2', 'Item 3'],
    total: 59.99,
    status: 'Delivered',
  },
  {
    id: '2',
    date: '2023-05-10',
    items: ['Item 4', 'Item 5'],
    total: 89.99,
    status: 'Pending',
  },
  {
    id: '3',
    date: '2023-05-15',
    items: ['Item 6', 'Item 7', 'Item 8', 'Item 9'],
    total: 129.99,
    status: 'Shipped',
  },
];

export default orders;
