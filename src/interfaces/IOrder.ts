import { IProduct } from './IProduct'

interface IClientData {
  userId: string
  direction: string
  express: number
  name: string
  notes: string
  phone: string
}

export interface IOrder {
  id: string
  products: IProduct[]
  clientData: IClientData
  state: number
}
