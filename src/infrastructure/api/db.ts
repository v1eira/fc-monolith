import { Sequelize } from 'sequelize-typescript'

// Checkout models
import OrderProductModel from '../../modules/checkout/repository/order-product.model'
import OrderModel from '../../modules/checkout/repository/order.model'
import OrderClientModel from '../../modules/checkout/repository/order-client.model'

// ClientAdm models
import ClientModel from '../../modules/client-adm/repository/client.model'

// Invoice models
import InvoiceModel from '../../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../../modules/invoice/repository/invoice-item.model'

// Transaction models
import TransactionModel from '../../modules/payment/repository/transaction.model'

// Product-adm models
import AdmProductModel from '../../modules/product-adm/repository/product.model'

// Store-catalog models
import StoreCatalogProductModel from '../../modules/store-catalog/repository/product.model'

export let sequelize: Sequelize

export async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([
    OrderModel,
    ClientModel,
    OrderClientModel,
    TransactionModel,
    StoreCatalogProductModel,
    InvoiceItemModel,
    InvoiceModel,
    OrderProductModel,
    AdmProductModel,
  ])

  await sequelize.sync()
}
