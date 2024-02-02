export interface IProduct {
  id?: number;
  productName: string;
  desc: string;
  price: number;
  stock: number;
  img: string;
  isDelete: boolean;
  scale: string;
  brand: string;
  scaleDetail: string;
}
export interface IComment {
  id?: number;
  idUser: number;
  idProduct: number;
  content: string;
  date: string;
}
export interface ICart extends IProduct {
  quantity: number;
}
export interface IOrderDetail {
  id?: number;
  idProducts: number;
  price: number;
  quantity: number;
  productName: string;
}
export interface IOrder {
  id?: number;
  idUser: number;
  userName: string;
  phone: string;
  address: string;
  totalPrice?: number | undefined;
  status: number;
  date: string;
  orderDetails?: ICart[] | undefined;
}
export interface IUser {
  id?: number;
  email: string;
  fullName: string;
  avatar: string;
  password: string;
  role: number;
  status: boolean;
  phone: string;
  address: string;
  cart: ICart[];
}
