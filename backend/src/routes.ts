import {Router} from 'express'

import orphanageController from './controllers/orphanagesController'

import multer from 'multer'
import uploadConfig from './config/upload'

const upload = multer(uploadConfig)

const routes = Router()

routes.get('/orphanages', orphanageController.index)
routes.get('/orphanages/:id', orphanageController.show)
routes.post('/orphanages', upload.array('images'), orphanageController.create)

export default routes