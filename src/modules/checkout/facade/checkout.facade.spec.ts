import { Sequelize } from 'sequelize-typescript'
import CheckoutFacadeFactory from '../factory/checkout.facade.factory'
import { PlaceOrderFacadeInputDto } from './checkout.facade.interface'
import CheckoutFacade from './checkout.facade'

const MockUseCase = () => {
  return {
    execute: jest.fn().mockReturnValue({
      id: '1',
      invoiceId: '1i',
      status: 'approved',
      total: 30,
      products: [{ id: '1' }, { id: '2' }],
    }),
  }
}

describe('Checkout facade test', () => {
  it('should create an order', async () => {
    const usecase = MockUseCase()
    const checkoutFacade = new CheckoutFacade(usecase)

    const input: PlaceOrderFacadeInputDto = {
      clientId: '1',
      products: [{ id: '1' }, { id: '2' }],
    }

    const output = await checkoutFacade.placeOrder(input)
    expect(output.id).toBe(input.clientId)
    expect(output.products).toHaveLength(2)
    expect(output.products[0].id).toBe(input.products[0].id)
    expect(output.products[1].id).toBe(input.products[1].id)
  })
})
