import { Sequelize } from 'sequelize-typescript'
import InvoiceRepository from './invoice.repository'
import Invoice from '../domain/invoice'
import InvoiceItem from '../domain/invoice-item'
import Address from '../domain/value-object/address'
import InvoiceItemModel from './invoice-item.model'
import InvoiceModel from './invoice.model'

describe('Invoice repository test', () => {
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
    const invoiceRepository = new InvoiceRepository()
    const item1 = new InvoiceItem({
      name: 'Invoice 1 item 1',
      price: 100,
    })
    item1.validate()
    const item2 = new InvoiceItem({
      name: 'Invoice 1 item 2',
      price: 50,
    })
    item2.validate()
    const invoice = new Invoice({
      name: 'Invoice 1',
      document: 'Invoice 1 document',
      address: new Address({
        street: 'Invoice 1 street',
        number: 'Invoice 1 number',
        complement: 'Invoice 1 complement',
        city: 'Invoice 1 city',
        state: 'Invoice 1 state',
        zipCode: 'Invoice 1 zipCode',
      }),
      items: [item1, item2],
    })
    invoice.validate()

    await invoiceRepository.generate(invoice)

    const invoiceCreated = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [InvoiceItemModel],
    })
    expect(invoiceCreated.id).toBe(invoice.id.id)
    expect(invoiceCreated.name).toBe(invoice.name)
    expect(invoiceCreated.document).toBe(invoice.document)
    expect(invoiceCreated.street).toBe(invoice.address.street)
    expect(invoiceCreated.number).toBe(invoice.address.number)
    expect(invoiceCreated.complement).toBe(invoice.address.complement)
    expect(invoiceCreated.city).toBe(invoice.address.city)
    expect(invoiceCreated.state).toBe(invoice.address.state)
    expect(invoiceCreated.zipCode).toBe(invoice.address.zipCode)

    expect(invoiceCreated.items.length).toBe(2)
    expect(invoiceCreated.items[0].id).toBe(invoice.items[0].id.id)
    expect(invoiceCreated.items[0].name).toBe(invoice.items[0].name)
    expect(invoiceCreated.items[0].price).toBe(invoice.items[0].price)
    expect(invoiceCreated.items[1].id).toBe(invoice.items[1].id.id)
    expect(invoiceCreated.items[1].name).toBe(invoice.items[1].name)
    expect(invoiceCreated.items[1].price).toBe(invoice.items[1].price)
  })

  it('should find an invoice', async () => {
    const invoiceRepository = new InvoiceRepository()
    await InvoiceModel.create(
      {
        id: '1',
        name: 'Invoice 1',
        document: 'Invoice 1 document',
        street: 'Invoice 1 street',
        number: 'Invoice 1 number',
        complement: 'Invoice 1 complement',
        city: 'Invoice 1 city',
        state: 'Invoice 1 state',
        zipCode: 'Invoice 1 zipCode',
        items: [
          {
            id: '1',
            name: 'Invoice 1 item 1',
            price: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            name: 'Invoice 1 item 2',
            price: 50,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [InvoiceItemModel] },
    )

    const invoice = await invoiceRepository.find('1')

    expect(invoice.id.id).toBe('1')
    expect(invoice.name).toBe('Invoice 1')
    expect(invoice.document).toBe('Invoice 1 document')
    expect(invoice.address.street).toBe('Invoice 1 street')
    expect(invoice.address.number).toBe('Invoice 1 number')
    expect(invoice.address.complement).toBe('Invoice 1 complement')
    expect(invoice.address.city).toBe('Invoice 1 city')
    expect(invoice.address.state).toBe('Invoice 1 state')
    expect(invoice.address.zipCode).toBe('Invoice 1 zipCode')

    expect(invoice.items.length).toBe(2)
    expect(invoice.items[0].id.id).toBe('1')
    expect(invoice.items[0].name).toBe('Invoice 1 item 1')
    expect(invoice.items[0].price).toBe(100)
    expect(invoice.items[1].id.id).toBe('2')
    expect(invoice.items[1].name).toBe('Invoice 1 item 2')
    expect(invoice.items[1].price).toBe(50)

    expect(invoice.total).toBe(150)
  })
})
