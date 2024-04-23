import { Sequelize } from 'sequelize-typescript'
import InvoiceFacadeFactory from '../factory/invoice.facade.factory'
import InvoiceItemModel from '../repository/invoice-item.model'
import InvoiceModel from '../repository/invoice.model'
import {
  CreateInvoiceFacadeInputDto,
  FindInvoiceFacadeInputDto,
} from './invoice.facade.interface'

describe('InvoiceFacade', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()
    const input: CreateInvoiceFacadeInputDto = {
      name: 'Test Invoice',
      document: '1234567890',
      street: 'Test Street',
      number: '123',
      complement: 'Test Complement',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345678',
      items: [
        { id: '1', name: 'Test Item 1', price: 10 },
        { id: '2', name: 'Test Item 2', price: 20 },
      ],
    }

    const result = await invoiceFacade.create(input)

    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.number).toEqual(input.number)

    expect(result.items).toHaveLength(2)
    expect(result.items[0].id).toEqual(input.items[0].id)
    expect(result.items[0].name).toEqual(input.items[0].name)
    expect(result.items[0].price).toEqual(input.items[0].price)
    expect(result.items[1].id).toEqual(input.items[1].id)
    expect(result.items[1].name).toEqual(input.items[1].name)
    expect(result.items[1].price).toEqual(input.items[1].price)

    expect(result.total).toEqual(30)
  })

  it('should find an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()
    const { id: invoiceId } = await invoiceFacade.create({
      name: 'Test Invoice',
      document: '1234567890',
      street: 'Test Street',
      number: '123',
      complement: 'Test Complement',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345678',
      items: [
        { id: '1', name: 'Test Item 1', price: 10 },
        { id: '2', name: 'Test Item 2', price: 20 },
      ],
    })

    const input: FindInvoiceFacadeInputDto = {
      id: invoiceId,
    }

    const result = await invoiceFacade.find(input)
    expect(result.id).toEqual(invoiceId)
    expect(result.name).toEqual('Test Invoice')
    expect(result.document).toEqual('1234567890')

    expect(result.address.street).toEqual('Test Street')
    expect(result.address.number).toEqual('123')
    expect(result.address.complement).toEqual('Test Complement')
    expect(result.address.city).toEqual('Test City')
    expect(result.address.state).toEqual('Test State')
    expect(result.address.zipCode).toEqual('12345678')

    expect(result.items).toHaveLength(2)
    expect(result.items[0].id).toEqual('1')
    expect(result.items[0].name).toEqual('Test Item 1')
    expect(result.items[0].price).toEqual(10)
    expect(result.items[1].id).toEqual('2')
    expect(result.items[1].name).toEqual('Test Item 2')
    expect(result.items[1].price).toEqual(20)

    expect(result.total).toEqual(30)
  })
})
