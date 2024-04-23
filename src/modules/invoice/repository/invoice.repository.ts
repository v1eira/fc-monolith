import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from '../domain/invoice'
import InvoiceItem from '../domain/invoice-item'
import Address from '../domain/value-object/address'
import InvoiceGateway from '../gateway/invoice.gateway'
import InvoiceItemModel from './invoice-item.model'
import InvoiceModel from './invoice.model'

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const foundInvoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemModel],
    })
    return new Invoice({
      id: new Id(foundInvoice.id),
      name: foundInvoice.name,
      document: foundInvoice.document,
      address: new Address({
        street: foundInvoice.street,
        number: foundInvoice.number,
        complement: foundInvoice.complement,
        city: foundInvoice.city,
        state: foundInvoice.state,
        zipCode: foundInvoice.zipCode,
      }),
      items: foundInvoice.items.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }),
      ),
      createdAt: foundInvoice.createdAt,
      updatedAt: foundInvoice.updatedAt,
    })
  }

  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item: InvoiceItem) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      },
      { include: [InvoiceItemModel] },
    )
  }
}
