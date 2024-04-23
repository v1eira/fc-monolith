import ValueObject from '../../../@shared/domain/value-object/value-object.interface'

type AddressProps = {
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
}

export default class Address implements ValueObject {
  private _street: string
  private _number: string
  private _complement: string
  private _city: string
  private _state: string
  private _zipCode: string

  constructor(props: AddressProps) {
    this._street = props.street
    this._number = props.number
    this._complement = props.complement
    this._city = props.city
    this._state = props.state
    this._zipCode = props.zipCode
  }

  validate(): void {
    if (!this._street) {
      throw new Error('Street must be provided')
    }
    if (!this._number) {
      throw new Error('Number must be provided')
    }
    if (!this._complement) {
      throw new Error('Complement must be provided')
    }
    if (!this._city) {
      throw new Error('City must be provided')
    }
    if (!this._state) {
      throw new Error('State must be provided')
    }
    if (!this._zipCode) {
      throw new Error('Zip Code must be provided')
    }
  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipCode(): string {
    return this._zipCode
  }
}
