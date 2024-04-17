import AddProductUseCase from './add-product.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe('Add product usecase unit tests', () => {
  it('should add a product', async () => {
    const productRepository = MockRepository()
    const usecase = new AddProductUseCase(productRepository)

    const input = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    }

    const result = await usecase.execute(input)

    expect(productRepository.add).toHaveBeenCalled()
    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
