import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import FindClientUseCase from './find-client.usecase'

const client = new Client({
  id: new Id('1'),
  name: 'Client 1',
  email: '2h0kD@example.com',
  address: 'Client 1 address',
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
    expect(result.address).toEqual(client.address)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})
