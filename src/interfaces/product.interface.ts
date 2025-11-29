export interface ProductImageInterface {
  url?: string;
}

export interface ProductInfoInterface {
  name?: string;
  description?: string;
  img?: string;
  slug?: string;
  storeSlug?: string;
  isCombo?: boolean;
  priceBefore?: string;
  price: string;
  isCoupon?: boolean;
  clientUrl?: string;
  productImages?: ProductImageInterface[];
}

export interface ProductInterface {
  product: ProductInfoInterface;
}
