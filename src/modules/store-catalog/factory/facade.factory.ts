import ProductRepository from '../repository/product.repository'
import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUsecase from '../usecase/find-product/find-product.usecase'
import StoreCatalogFacade from './store-catalog.facade'

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository()
    const findUseCase = new FindProductUsecase(productRepository)
    const findAllUseCase = new FindAllProductsUseCase(productRepository)
    const storeCatalogFacade = new StoreCatalogFacade({
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase,
    })
    return storeCatalogFacade
  }
}
