import PaymentFacade from '../facade/payment.facade'
import PaymentFacadeInterface from '../facade/payment.facade.interface'
import TransactionRepository from '../repository/transaction.repository'
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase'

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const transactionRepository = new TransactionRepository()
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository,
    )
    return new PaymentFacade(processPaymentUseCase)
  }
}
