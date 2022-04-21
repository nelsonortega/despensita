import OrderState from '../models/orderState'

export const ORDER_STATES = [
  new OrderState(1, 'Pedido realizado'),
  new OrderState(2, 'En proceso'),
  new OrderState(3, 'Listo'),
  new OrderState(4, 'Entregado')
]
