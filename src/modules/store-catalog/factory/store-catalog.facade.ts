import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from '../facade/store-catalog.facade.interface'

export interface UseCaseProps {
  findUseCase: UseCaseInterface
  findAllUseCase: UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: UseCaseInterface
  private _findAllUseCase: UseCaseInterface

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase
    this._findAllUseCase = props.findAllUseCase
  }

  async find(
    input: FindStoreCatalogFacadeInputDto,
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute({ id: input.id })
  }
  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute()
  }
}
