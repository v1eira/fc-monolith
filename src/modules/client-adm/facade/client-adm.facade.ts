import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  AddClientFacadeOutputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from './client-adm.facade.interface'

export interface UseCaseProps {
  findUseCase: UseCaseInterface
  addUseCase: UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCase: UseCaseInterface
  private _addUseCase: UseCaseInterface

  constructor(usecasesProps: UseCaseProps) {
    this._findUseCase = usecasesProps.findUseCase
    this._addUseCase = usecasesProps.addUseCase
  }
  async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
    return await this._addUseCase.execute(input)
  }
  async find(
    input: FindClientFacadeInputDto,
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase.execute(input)
  }
}
