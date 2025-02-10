export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  inventory: number;
  categoryId: string;
}