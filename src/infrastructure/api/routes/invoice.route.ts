import express, { Request, Response } from 'express'
import InvoiceFacadeFactory from '../../../modules/invoice/factory/invoice.facade.factory'

export const invoiceRoute = express.Router()

invoiceRoute.post('/', async (req: Request, res: Response) => {
  const invoiceFacade = InvoiceFacadeFactory.create()

  try {
    const invoiceDto = {
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items,
    }

    const output = await invoiceFacade.create(invoiceDto)

    res.status(201).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

invoiceRoute.get('/:invoiceId', async (req: Request, res: Response) => {
  const invoiceFacade = InvoiceFacadeFactory.create()

  try {
    const invoiceId = String(req.params.invoiceId)
    const output = await invoiceFacade.find({ id: invoiceId })

    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
