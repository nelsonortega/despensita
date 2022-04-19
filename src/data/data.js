import State from '../models/state'
import Category from '../models/category'

export const CATEGORIES = [
  new Category('1', 'Alimentos'),
  new Category('2', 'Bebidas'),
  new Category('3', 'Higiene'),
  new Category('4', 'Mascotas')
]

export const STATES = [
  new State('1', 'Pedido realizado'),
  new State('2', 'En proceso'),
  new State('3', 'Listo'),
  new State('4', 'Entregado')
]
