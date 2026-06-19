export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  brand_id: string;
  product_image: ProductImage;
}

export interface ProductImage {
  id: string;
  by: string;
  source: string;
  title: string;
  type: string;
}

export interface ProductsResponse {
  current_page: number;
  data: Product[];
  total: number;
  per_page: number;
}