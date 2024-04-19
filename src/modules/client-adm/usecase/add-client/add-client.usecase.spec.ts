import AddClientUseCase from './add-client.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe('Add Client usecase unit tests', () => {
  it('should add a client', async () => {
    const clientRepository = MockRepository()
    const usecase = new AddClientUseCase(clientRepository)

    const input = {
      name: 'Client 1',
      email: '2h0kD@example.com',
      address: 'Client 1 address',
    }

    const result = await usecase.execute(input)

    expect(clientRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
  })
})
