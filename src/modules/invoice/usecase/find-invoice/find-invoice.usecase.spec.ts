import Id from '../../../@shared/domain/value-object/id.value-object'
import FindInvoiceUsecase from './find-invoice.usecase'

const foundInvoice = {
  id: new Id('1'),
  name: 'Invoice 1',
  document: '123456789',
  address: {
    street: '123 Main St',
    number: '123',
    complement: 'Apt 1',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  },
  items: [
    {
      id: new Id('1'),
      name: 'Item 1',
      price: 100,
    },
    {
      id: new Id('2'),
      name: 'Item 2',
      price: 50,
    },
  ],
  total: 150,
  createdAt: new Date(),
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(foundInvoice)),
    generate: jest.fn(),
  }
}

describe('Find invoice usecase unit tests', () => {
  it('should find a invoice', async () => {
    const invoiceRepository = MockRepository()
    const usecase = new FindInvoiceUsecase(invoiceRepository)

    const input = { id: '1' }

    const output = await usecase.execute(input)

    expect(output.id).toBe(foundInvoice.id.id)
    expect(output.name).toBe(foundInvoice.name)
    expect(output.document).toBe(foundInvoice.document)
    expect(output.address.street).toBe(foundInvoice.address.street)
    expect(output.address.number).toBe(foundInvoice.address.number)
    expect(output.address.complement).toBe(foundInvoice.address.complement)
    expect(output.address.city).toBe(foundInvoice.address.city)
    expect(output.address.state).toBe(foundInvoice.address.state)
    expect(output.address.zipCode).toBe(foundInvoice.address.zipCode)

    expect(output.items.length).toBe(2)
    expect(output.items[0].id).toBe(foundInvoice.items[0].id.id)
    expect(output.items[0].name).toBe(foundInvoice.items[0].name)
    expect(output.items[0].price).toBe(foundInvoice.items[0].price)
    expect(output.items[1].id).toBe(foundInvoice.items[1].id.id)
    expect(output.items[1].name).toBe(foundInvoice.items[1].name)
    expect(output.items[1].price).toBe(foundInvoice.items[1].price)

    expect(output.total).toBe(foundInvoice.total)
    expect(output.createdAt).toBe(foundInvoice.createdAt)
  })
})
