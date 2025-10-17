import {Router} from 'express'
import { upload } from '../../middlewares/multer.middleware'
import { createTask, getTaskById, listTasks, updateTaskById,deleteTask } from '../../controllers/task-management/task.controller'
import { authorityCheck } from '../../middlewares/authorityCheck.middleware'

export const taskRouter=Router()

taskRouter.route('/').post(upload.none(),authorityCheck,createTask)
taskRouter.route('/').get(authorityCheck,listTasks)
taskRouter.route('/:id').get(authorityCheck,getTaskById)
taskRouter.route('/:id').put(upload.none(),authorityCheck,updateTaskById)
taskRouter.route('/:id').delete(authorityCheck,deleteTask)