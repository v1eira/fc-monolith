import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import InvoiceFacadeInterface, {
  CreateInvoiceFacadeInputDto,
  CreateInvoiceFacadeOutputDto,
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
} from './invoice.facade.interface'

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateInvoiceUseCase: UseCaseInterface
  private _findInvoiceUseCase: UseCaseInterface

  constructor(
    generateInvoiceUseCase: UseCaseInterface,
    findInvoiceUseCase: UseCaseInterface,
  ) {
    this._generateInvoiceUseCase = generateInvoiceUseCase
    this._findInvoiceUseCase = findInvoiceUseCase
  }

  async create(
    input: CreateInvoiceFacadeInputDto,
  ): Promise<CreateInvoiceFacadeOutputDto> {
    return await this._generateInvoiceUseCase.execute(input)
  }
  async find(
    input: FindInvoiceFacadeInputDto,
  ): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findInvoiceUseCase.execute(input)
  }
}
