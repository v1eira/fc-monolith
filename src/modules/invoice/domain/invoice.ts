import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceItem from './invoice-item'
import Address from './value-object/address'

type InvoiceProps = {
  id?: Id
  name: string
  document: string
  address: Address
  items: InvoiceItem[]
  createdAt?: Date
  updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: InvoiceItem[]

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._document = props.document
    this._address = props.address
    this._items = props.items
  }

  validate(): void {
    if (!this._name) {
      throw new Error('Name must be provided')
    }
    if (!this._document) {
      throw new Error('Document must be provided')
    }
    if (!this._address) {
      throw new Error('Address must be provided')
    }
    if (this._items.length === 0) {
      throw new Error('Must have at least one item')
    }
  }

  get name(): string {
    return this._name
  }

  get document(): string {
    return this._document
  }

  get address(): Address {
    return this._address
  }

  get items(): InvoiceItem[] {
    return this._items
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.price, 0)
  }
}
