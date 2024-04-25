import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id.value-object'
import OrderModel from './order.model'
import OrderClientModel from './order-client.model'
import OrderProductModel from './order-product.model'
import Order from '../domain/order.entity'
import Client from '../domain/client.entity'
import Product from '../domain/product.entity'
import CheckoutRepository from './checkout.repository'

describe('Order Repository test', () => {
  let sequelize: Sequelize

  beforeAll(() => {
    jest.useFakeTimers('modern')
  })

  afterAll(() => {
    jest.useRealTimers
  })

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([OrderModel, OrderClientModel, OrderProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create an order', async () => {
    const order = new Order({
      id: new Id('1'),
      client: new Client({
        id: new Id('1'),
        name: 'Client 1',
        email: '2h0kD@example.com',
        document: '12345678900',
        street: '16 avenus',
        number: '123',
        complement: 'Ap 400',
        city: 'My city',
        state: 'State',
        zipCode: '89777310',
      }),
      products: [
        new Product({
          id: new Id('1'),
          name: 'Product 1',
          description: 'Description 1',
          salesPrice: 100,
        }),
      ],
      status: 'approved',
    })

    const checkoutRepository = new CheckoutRepository()
    await checkoutRepository.addOrder(order)

    const orderDb = await OrderModel.findOne({
      where: { id: order.id.id },
      include: [OrderClientModel, OrderProductModel],
    })
    expect(orderDb).toBeDefined()
    expect(orderDb.id).toEqual(order.id.id)
  })

  it('should find a order', async () => {
    const checkoutRepository = new CheckoutRepository()

    await OrderModel.create(
      {
        id: '1',
        client: new OrderClientModel({
          id: '1',
          name: 'client name',
          email: 'test@domain.com',
          document: '0000000',
          street: '16 avenus',
          number: '123',
          complement: 'Ap 400',
          city: 'My city',
          state: 'State',
          zipCode: '89777310',
          createdAt: new Date(),
          updatedAt: new Date(),
          orderId: '1',
        }),
        products: [
          new OrderProductModel({
            id: '1',
            name: 'first product',
            description: 'first product description',
            salesPrice: 10,
            orderId: '1',
          }),
          new OrderProductModel({
            id: '2',
            name: 'second product',
            description: 'second product description',
            salesPrice: 20,
            orderId: '1',
          }),
        ],
        status: 'status 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [OrderClientModel, OrderProductModel] },
    )

    const checkout = await checkoutRepository.findOrder('1')

    expect(checkout.id.id).toEqual('1')
    expect(checkout.client.name).toEqual('client name')
    expect(checkout.client.email).toEqual('test@domain.com')
    expect(checkout.client.document).toEqual('0000000')
    expect(checkout.client.street).toEqual('16 avenus')
    expect(checkout.client.number).toEqual('123')
    expect(checkout.client.complement).toEqual('Ap 400')
    expect(checkout.client.city).toEqual('My city')
    expect(checkout.client.state).toEqual('State')
    expect(checkout.client.zipCode).toEqual('89777310')
    expect(checkout.products).toStrictEqual([
      new Product({
        id: new Id('1'),
        name: 'first product',
        description: 'first product description',
        salesPrice: 10,
      }),
      new Product({
        id: new Id('2'),
        name: 'second product',
        description: 'second product description',
        salesPrice: 20,
      }),
    ])
    expect(checkout.status).toEqual('status 1')
  })
})
