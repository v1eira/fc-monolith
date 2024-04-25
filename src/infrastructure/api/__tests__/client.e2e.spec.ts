import { sequelize } from '../db'
import { app } from '../express'
import request from 'supertest'

describe('E2E tests for client', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const response = await request(app).post('/clients').send({
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

    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Client 1')
    expect(response.body.email).toBe('2h0kD@example.com')
    expect(response.body.document).toBe('12345678900')
    expect(response.body.street).toBe('Street 1')
    expect(response.body.number).toBe('123')
    expect(response.body.complement).toBe('Complement 1')
    expect(response.body.city).toBe('City 1')
    expect(response.body.state).toBe('State 1')
    expect(response.body.zipCode).toBe('12345678')
  })

  it('should not create a client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'Client 1',
      email: '2h0kD@example.com',
      // document: '12345678900',
      street: 'Street 1',
      number: '123',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
    })

    expect(response.status).toBe(500)
  })
})
