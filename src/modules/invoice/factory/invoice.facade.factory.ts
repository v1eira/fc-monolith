import InvoiceFacade from '../facade/invoice.facade'
import InvoiceFacadeInterface from '../facade/invoice.facade.interface'
import InvoiceRepository from '../repository/invoice.repository'
import FindInvoiceUsecase from '../usecase/find-invoice/find-invoice.usecase'
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase'

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const invoiceRepository = new InvoiceRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
    const findInvoiceUseCase = new FindInvoiceUsecase(invoiceRepository)
    return new InvoiceFacade(generateInvoiceUseCase, findInvoiceUseCase)
  }
}
