import {ProductCartItems} from '../../utils/canonicalModel';

export const checkShopBeforeAdding = (
  cart: any,
  currentShopId: string,
  product: ProductCartItems,
) => {
  if (cart.length > 0 && cart[0].shopId !== product.shopId) {
    return {
      requiresConfirmation: true,
      productToAdd: product,
    };
  }
  return {
    requiresConfirmation: false,
    productToAdd: product,
  };
};
