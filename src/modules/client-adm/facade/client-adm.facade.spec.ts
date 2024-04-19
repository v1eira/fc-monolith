import { Sequelize } from 'sequelize-typescript'
import ClientModel from '../repository/client.model'
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory'

describe('Client Adm facade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const clientFacade = ClientAdmFacadeFactory.create()
    const input = {
      id: '1',
      name: 'Client 1',
      email: '2h0kD@example.com',
      address: 'Client 1 address',
    }
    const client = await clientFacade.add(input)
    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.address).toBe(input.address)
  })

  it('should find a client', async () => {
    const clientFacade = ClientAdmFacadeFactory.create()
    const input = {
      id: '1',
      name: 'Client 1',
      email: '2h0kD@example.com',
      address: 'Client 1 address',
    }
    await clientFacade.add(input)
    const foundClient = await clientFacade.find({ id: input.id })
    expect(foundClient).toBeDefined()
    expect(foundClient.id).toBe(input.id)
    expect(foundClient.name).toBe(input.name)
    expect(foundClient.email).toBe(input.email)
    expect(foundClient.address).toBe(input.address)
  })
})
