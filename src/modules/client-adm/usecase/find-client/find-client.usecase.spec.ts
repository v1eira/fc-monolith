import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import FindClientUseCase from './find-client.usecase'

const client = new Client({
  id: new Id('1'),
  name: 'Client 1',
  email: '2h0kD@example.com',
  document: '12345678900',
  street: 'Street 1',
  number: '123',
  complement: 'Complement 1',
  city: 'City 1',
  state: 'State 1',
  zipCode: '12345678',
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  }
}

describe('Find Client usecase unit tests', () => {
  it('should find a client', async () => {
    const clientRepository = MockRepository()
    const usecase = new FindClientUseCase(clientRepository)

    const result = await usecase.execute({ id: '1' })

    expect(clientRepository.find).toHaveBeenCalled()
    expect(result.id).toEqual(client.id.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.document).toEqual(client.document)
    expect(result.street).toEqual(client.street)
    expect(result.number).toEqual(client.number)
    expect(result.complement).toEqual(client.complement)
    expect(result.city).toEqual(client.city)
    expect(result.state).toEqual(client.state)
    expect(result.zipCode).toEqual(client.zipCode)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})
