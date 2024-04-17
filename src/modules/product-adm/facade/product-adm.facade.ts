import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
  ProductAdmFacadeInterface,
} from './product-adm.facade.interface'

export interface UseCasesProps {
  addUseCase: UseCaseInterface
  checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface
  private _checkStockUseCase: UseCaseInterface

  constructor(usecasesProps: UseCasesProps) {
    this._addUseCase = usecasesProps.addUseCase
    this._checkStockUseCase = usecasesProps.checkStockUseCase
  }
  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // if the facade dto was != usecase dto we would have to convert it
    return this._addUseCase.execute(input)
  }
  async checkStock(
    input: CheckStockFacadeInputDto,
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input)
  }
}
