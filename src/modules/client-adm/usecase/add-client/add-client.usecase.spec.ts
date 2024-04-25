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
      document: '12345678900',
      street: 'Street 1',
      number: '123',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
    }

    const result = await usecase.execute(input)

    expect(clientRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.number).toEqual(input.number)
    expect(result.complement).toEqual(input.complement)
    expect(result.city).toEqual(input.city)
    expect(result.state).toEqual(input.state)
    expect(result.zipCode).toEqual(input.zipCode)
  })
})
