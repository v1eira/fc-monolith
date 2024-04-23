import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import Invoice from '../../domain/invoice'
import InvoiceItem from '../../domain/invoice-item'
import Address from '../../domain/value-object/address'
import InvoiceGateway from '../../gateway/invoice.gateway'
import {
  GenerateInvoiceInputDto,
  GenerateInvoiceOutputDto,
} from './generate-invoice.dto'

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(
    input: GenerateInvoiceInputDto,
  ): Promise<GenerateInvoiceOutputDto> {
    const items = input.items.map(
      (item) =>
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        }),
    )
    items.map((item) => item.validate())

    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: items,
    })
    invoice.validate()

    await this._invoiceRepository.generate(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
    }
  }
}
