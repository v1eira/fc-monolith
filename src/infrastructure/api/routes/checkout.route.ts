import express, { Request, Response } from 'express'
import CheckoutFacadeFactory from '../../../modules/checkout/factory/checkout.facade.factory'
import { PlaceOrderFacadeInputDto } from '../../../modules/checkout/facade/checkout.facade.interface'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const checkoutFacade = CheckoutFacadeFactory.create()
  try {
    const checkoutDto: PlaceOrderFacadeInputDto = {
      clientId: req.body.clientId,
      products: req.body.products.map((p: any) => ({
        id: p.id,
      })),
    }
    const output = await checkoutFacade.placeOrder(checkoutDto)
    res.status(201).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
