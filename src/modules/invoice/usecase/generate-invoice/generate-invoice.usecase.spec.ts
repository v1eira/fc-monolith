import Id from '../../../@shared/domain/value-object/id.value-object'
import Invoice from '../../domain/invoice'
import InvoiceItem from '../../domain/invoice-item'
import Address from '../../domain/value-object/address'
import InvoiceGateway from '../../gateway/invoice.gateway'
import {
  GenerateInvoiceInputDto,
  GenerateInvoiceOutputDto,
} from './generate-invoice.dto'
import GenerateInvoiceUseCase from './generate-invoice.usecase'

const generatedInvoice = new Invoice({
  name: 'John Doe',
  document: '123456789',
  address: new Address({
    street: '123 Main St',
    number: '123',
    complement: 'Apt 1',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  }),
  items: [
    new InvoiceItem({
      id: new Id('1'),
      name: 'Item 1',
      price: 100,
    }),
    new InvoiceItem({
      id: new Id('2'),
      name: 'Item 2',
      price: 50,
    }),
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
})

const MockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve(generatedInvoice)),
    find: jest.fn(),
  }
}

describe('GenerateInvoiceUseCase', () => {
  describe('execute', () => {
    describe('success', () => {
      it('should generate an invoice', async () => {
        const invoiceRepository = MockRepository()
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(
          invoiceRepository,
        )

        const input: GenerateInvoiceInputDto = {
          name: 'John Doe',
          document: '123456789',
          street: '123 Main St',
          number: '123',
          complement: 'Apt 1',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          items: [
            { id: '1', name: 'Item 1', price: 100 },
            { id: '2', name: 'Item 2', price: 50 },
          ],
        }

        const output = await generateInvoiceUseCase.execute(input)

        expect(invoiceRepository.generate).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(generatedInvoice.name)
        expect(output.document).toBe(generatedInvoice.document)

        expect(output.street).toBe(generatedInvoice.address.street)
        expect(output.number).toBe(generatedInvoice.address.number)
        expect(output.complement).toBe(generatedInvoice.address.complement)
        expect(output.city).toBe(generatedInvoice.address.city)
        expect(output.state).toBe(generatedInvoice.address.state)
        expect(output.zipCode).toBe(generatedInvoice.address.zipCode)

        expect(output.items.length).toBe(2)
        expect(output.items[0].id).toBe(generatedInvoice.items[0].id.id)
        expect(output.items[0].name).toBe(generatedInvoice.items[0].name)
        expect(output.items[0].price).toBe(generatedInvoice.items[0].price)
        expect(output.items[1].id).toBe(generatedInvoice.items[1].id.id)
        expect(output.items[1].name).toBe(generatedInvoice.items[1].name)
        expect(output.items[1].price).toBe(generatedInvoice.items[1].price)

        expect(output.total).toBe(generatedInvoice.total)
      })
    })

    describe('failure', () => {
      it('should not generate an invoice because name is empty', async () => {
        const invoiceRepository = MockRepository()
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(
          invoiceRepository,
        )

        const input: GenerateInvoiceInputDto = {
          name: '',
          document: '123456789',
          street: '123 Main St',
          number: '123',
          complement: 'Apt 1',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          items: [
            { id: '1', name: 'Item 1', price: 100 },
            { id: '2', name: 'Item 2', price: 50 },
          ],
        }

        await expect(generateInvoiceUseCase.execute(input)).rejects.toThrow(
          'Name must be provided',
        )
      })

      it('should not generate an invoice because items is empty', async () => {
        const invoiceRepository = MockRepository()
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(
          invoiceRepository,
        )

        const input: GenerateInvoiceInputDto = {
          name: 'John Doe',
          document: '123456789',
          street: '123 Main St',
          number: '123',
          complement: 'Apt 1',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          items: [],
        }

        await expect(generateInvoiceUseCase.execute(input)).rejects.toThrow(
          'Must have at least one item',
        )
      })
    })
  })
})
