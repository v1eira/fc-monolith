import Id from '../../@shared/domain/value-object/id.value-object'
import Transaction from './transaction'

describe('Transaction', () => {
  describe('constructor', () => {
    it('should initialize the properties correctly', () => {
      const transaction = new Transaction({
        id: new Id('1'),
        amount: 100,
        orderId: '123',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(transaction.id.id).toBe('1')
      expect(transaction.amount).toBe(100)
      expect(transaction.orderId).toBe('123')
      expect(transaction.status).toBe('pending')
      expect(transaction.createdAt).toBeInstanceOf(Date)
      expect(transaction.updatedAt).toBeInstanceOf(Date)
    })
  })

  describe('process', () => {
    it('should approve the transaction if the amount is greater than or equal to 100', () => {
      const transaction = new Transaction({
        id: new Id('1'),
        amount: 100,
        orderId: '123',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transaction.process()

      expect(transaction.status).toBe('approved')
    })

    it('should decline the transaction if the amount is less than 100', () => {
      const transaction = new Transaction({
        id: new Id('1'),
        amount: 99,
        orderId: '123',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transaction.process()

      expect(transaction.status).toBe('declined')
    })
  })

  describe('validate', () => {
    it('should throw an error if the amount is less than or equal to 0', () => {
      const transaction = new Transaction({
        id: new Id('1'),
        amount: 0,
        orderId: '123',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(() => {
        transaction.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the orderId is not provided', () => {
      const transaction = new Transaction({
        id: new Id('1'),
        amount: 100,
        orderId: '',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      expect(() => {
        transaction.validate()
      }).toThrow(Error)
    })
  })
})
