export interface PlaceOrderFacadeInputDto {
  clientId: string
  products: {
    id: string
  }[]
}

export interface PlaceOrderFacadeOutputDto {
  id: string
  invoiceId: string
  status: string
  total: number
  products: {
    id: string
  }[]
}

export default interface CheckoutFacadeInterface {
  placeOrder(
    input: PlaceOrderFacadeInputDto,
  ): Promise<PlaceOrderFacadeOutputDto>
}
