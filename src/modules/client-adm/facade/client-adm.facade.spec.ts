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
      document: '12345678900',
      street: 'Street 1',
      number: '123',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
    }
    const client = await clientFacade.add(input)
    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.document).toBe(input.document)
    expect(client.street).toBe(input.street)
    expect(client.number).toBe(input.number)
    expect(client.complement).toBe(input.complement)
    expect(client.city).toBe(input.city)
    expect(client.state).toBe(input.state)
    expect(client.zipCode).toBe(input.zipCode)
  })

  it('should find a client', async () => {
    const clientFacade = ClientAdmFacadeFactory.create()
    const input = {
      id: '1',
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
    await clientFacade.add(input)
    const foundClient = await clientFacade.find({ id: input.id })
    expect(foundClient).toBeDefined()
    expect(foundClient.id).toBe(input.id)
    expect(foundClient.name).toBe(input.name)
    expect(foundClient.email).toBe(input.email)
    expect(foundClient.document).toBe(input.document)
    expect(foundClient.street).toBe(input.street)
    expect(foundClient.number).toBe(input.number)
    expect(foundClient.complement).toBe(input.complement)
    expect(foundClient.city).toBe(input.city)
    expect(foundClient.state).toBe(input.state)
    expect(foundClient.zipCode).toBe(input.zipCode)
  })
})
