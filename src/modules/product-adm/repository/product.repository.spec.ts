import { Sequelize } from 'sequelize-typescript'
import ProductModel from './product.model'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import Product from '../domain/product.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import ProductRepository from './product.repository'

describe('Product repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should add a product', async () => {
    const product = new Product({
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    })
    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const p = await ProductModel.findOne({ where: { id: product.id.id } })
    expect(p.id).toBe(product.id.id)
    expect(p.name).toBe(product.name)
    expect(p.description).toBe(product.description)
    expect(p.purchasePrice).toBe(product.purchasePrice)
    expect(p.stock).toBe(product.stock)
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const p = await productRepository.find('1')
    expect(p.id.id).toBe('1')
    expect(p.name).toBe('Product 1')
    expect(p.description).toBe('Product 1 description')
    expect(p.purchasePrice).toBe(100)
    expect(p.stock).toBe(10)
  })
})
