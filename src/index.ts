import express from 'express'
import cors from 'cors'
import { URLController } from './controller/URLController'

const api = express()
api.use(express.json())
api.use(cors())


const urlController = new URLController()

api.post('/avg', urlController.avg);

api.listen(3001, () => console.log('Express listening'))
