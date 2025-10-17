import {Router} from 'express'
import { upload } from '../../middlewares/multer.middleware'
import { loginUser } from '../../controllers/auth/login.controller'
import { registerUser } from '../../controllers/auth/resister.controller'

export const authRouter=Router()

authRouter.route('/login').post(upload.none(),loginUser)
authRouter.route('/register').post(upload.none(),registerUser)
