import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from './invoice'
import InvoiceItem from './invoice-item'
import Address from './value-object/address'

describe('Invoice', () => {
  describe('constructor', () => {
    it('should initialize the properties correctly', () => {
      const address = new Address({
        street: '123 Main St',
        number: '123',
        complement: 'Apt 1',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      })
      const invoiceItem = new InvoiceItem({
        id: new Id('1'),
        name: 'Item 1',
        price: 100,
      })
      const invoice = new Invoice({
        id: new Id('1'),
        name: 'Invoice 1',
        document: '123456789',
        address: address,
        items: [invoiceItem],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(invoice.id.id).toBe('1')
      expect(invoice.name).toBe('Invoice 1')
      expect(invoice.document).toBe('123456789')
      expect(invoice.address.street).toBe('123 Main St')
      expect(invoice.address.city).toBe('Anytown')
      expect(invoice.address.state).toBe('CA')
      expect(invoice.address.zipCode).toBe('12345')
      expect(invoice.items[0].id.id).toBe('1')
      expect(invoice.items[0].name).toBe('Item 1')
      expect(invoice.items[0].price).toBe(100)
    })
  })

  describe('validate', () => {
    it('should throw an error if the name is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        number: '123',
        complement: 'Apt 1',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      })
      const invoiceItem = new InvoiceItem({
        id: new Id('1'),
        name: 'Item 1',
        price: 100,
      })
      const invoice = new Invoice({
        id: new Id('1'),
        name: '',
        document: '123456789',
        address: address,
        items: [invoiceItem],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(() => {
        invoice.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the document is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        number: '123',
        complement: 'Apt 1',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      })
      const invoiceItem = new InvoiceItem({
        id: new Id('1'),
        name: 'Item 1',
        price: 100,
      })
      const invoice = new Invoice({
        id: new Id('1'),
        name: 'Invoice 1',
        document: '',
        address: address,
        items: [invoiceItem],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(() => {
        invoice.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the address is not provided', () => {
      const invoiceItem = new InvoiceItem({
        id: new Id('1'),
        name: 'Item 1',
        price: 100,
      })
      const invoice = new Invoice({
        id: new Id('1'),
        name: 'Invoice 1',
        document: '123456789',
        address: null,
        items: [invoiceItem],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(() => {
        invoice.validate()
      }).toThrow(Error)
    })

    it('should throw an error if there are no items', () => {
      const address = new Address({
        street: '123 Main St',
        number: '123',
        complement: 'Apt 1',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      })
      const invoice = new Invoice({
        id: new Id('1'),
        name: 'Invoice 1',
        document: '123456789',
        address: address,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(() => {
        invoice.validate()
      }).toThrow(Error)
    })
  })

  describe('total', () => {
    it('should calculate the total price of all items correctly', () => {
      const item1 = new InvoiceItem({
        name: 'Item 1',
        price: 100,
      })

      const item2 = new InvoiceItem({
        name: 'Item 2',
        price: 50,
      })

      const invoice = new Invoice({
        id: new Id('1'),
        name: 'Invoice 1',
        document: '123456789',
        address: new Address({
          street: '123 Main St',
          number: '123',
          complement: 'Apt 1',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
        }),
        items: [item1, item2],
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(invoice.total).toBe(150) // 100 + 50
    })
  })
})
