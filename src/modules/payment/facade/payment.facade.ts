import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from './payment.facade.interface'

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase

  constructor(processPaymentUseCase: UseCaseInterface) {
    this._processPaymentUseCase = processPaymentUseCase
  }

  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this._processPaymentUseCase.execute(input)
  }
}
