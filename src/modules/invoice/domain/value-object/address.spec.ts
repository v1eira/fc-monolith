import Address from './address'

describe('Address', () => {
  describe('constructor', () => {
    it('should initialize the properties correctly', () => {
      const address = new Address({
        street: '123 Main St',
        number: '123',
        complement: 'Apt 1',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      })

      expect(address.street).toBe('123 Main St')
      expect(address.number).toBe('123')
      expect(address.complement).toBe('Apt 1')
      expect(address.city).toBe('Anytown')
      expect(address.state).toBe('CA')
      expect(address.zipCode).toBe('12345')
    })
  })

  describe('validate', () => {
    it('should throw an error if the STREET is not provided', () => {
      const address = new Address({
        street: '',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        number: '123',
        complement: 'Apt 1',
      })

      expect(() => {
        address.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the CITY is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        city: '',
        state: 'CA',
        zipCode: '12345',
        number: '123',
        complement: 'Apt 1',
      })

      expect(() => {
        address.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the STATE is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        city: 'Anytown',
        state: '',
        zipCode: '12345',
        number: '123',
        complement: 'Apt 1',
      })

      expect(() => {
        address.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the ZIPCODE is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '',
        number: '123',
        complement: 'Apt 1',
      })

      expect(() => {
        address.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the NUMBER is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        number: '',
        complement: 'Apt 1',
      })

      expect(() => {
        address.validate()
      }).toThrow(Error)
    })

    it('should throw an error if the COMPLEMENT is not provided', () => {
      const address = new Address({
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        number: '123',
        complement: '',
      })

      expect(() => {
        address.validate()
      }).toThrow(Error)
    })
  })
})
