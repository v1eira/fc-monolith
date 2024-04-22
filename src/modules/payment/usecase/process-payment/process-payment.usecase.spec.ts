import Id from '../../../@shared/domain/value-object/id.value-object'
import Transaction from '../../domain/transaction'
import ProcessPaymentUseCase from './process-payment.usecase'

const transactionApproved = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: '1',
  status: 'approved',
})

const transactionDeclined = new Transaction({
  id: new Id('1'),
  amount: 50,
  orderId: '1',
  status: 'declined',
})

const MockRepositoryTransactionApproved = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved)),
  }
}

const MockRepositoryTransactionDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
  }
}

describe('ProcessPaymentUsecase', () => {
  it('should approve a transaction', async () => {
    const transactionRepository = MockRepositoryTransactionApproved()
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository,
    )
    const input = {
      orderId: '1',
      amount: 100,
    }
    const result = await processPaymentUseCase.execute(input)
    expect(transactionRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transactionApproved.id.id)
    expect(result.orderId).toBe(input.orderId)
    expect(result.amount).toBe(input.amount)
    expect(result.status).toBe('approved')
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(result.updatedAt).toBeInstanceOf(Date)
  })

  it('should decline a transaction', async () => {
    const transactionRepository = MockRepositoryTransactionDeclined()
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository,
    )
    const input = {
      orderId: '1',
      amount: 50,
    }
    const result = await processPaymentUseCase.execute(input)
    expect(transactionRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transactionDeclined.id.id)
    expect(result.orderId).toBe(input.orderId)
    expect(result.amount).toBe(input.amount)
    expect(result.status).toBe('declined')
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(result.updatedAt).toBeInstanceOf(Date)
  })
})
