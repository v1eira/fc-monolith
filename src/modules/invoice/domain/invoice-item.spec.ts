import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceItem from './invoice-item'

describe('InvoiceItem', () => {
  describe('constructor', () => {
    it('should initialize the properties correctly', () => {
      const item = new InvoiceItem({
        id: new Id('1'),
        name: 'Item 1',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(item.id.id).toBe('1')
      expect(item.name).toBe('Item 1')
      expect(item.price).toBe(100)
    })
  })

  describe('validate', () => {
    it('should throw an error if the name is not provided', () => {
      const item = new InvoiceItem({
        id: new Id('1'),
        name: '',
        price: 100,
      })

      expect(() => {
        item.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the price is not greater than zero', () => {
      const item = new InvoiceItem({
        id: new Id('1'),
        name: 'Item 1',
        price: 0,
      })

      expect(() => {
        item.validate()
      }).toThrow(Error)
    })
  })
})
