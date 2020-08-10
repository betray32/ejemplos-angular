/**
 * Angular HttpClient allows you to specify the 
 * type of the response object in the request object, 
 * which make consuming the response easier and straightforward. 
 * This also enables type assertion during the compile time.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
