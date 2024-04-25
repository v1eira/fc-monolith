import ProductModel from '../../../modules/product-adm/repository/product.model'
import { sequelize } from '../db'
import { app } from '../express'
import request from 'supertest'

describe('E2E tests for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const input = {
      name: 'Shirt',
      description: 'T-Shirt description',
      stock: 1,
      purchasePrice: 100,
    }

    const response = await request(app).post('/products').send(input)

    const product = await ProductModel.findOne({ where: { name: input.name } })

    expect(response.status).toBe(201)
    expect(product.name).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.purchasePrice).toBe(input.purchasePrice)
    expect(product.stock).toBe(input.stock)
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
      description: 'Product 1 description',
      // purchasePrice: 100,
      stock: 10,
    })

    expect(response.status).toBe(500)
  })
})
