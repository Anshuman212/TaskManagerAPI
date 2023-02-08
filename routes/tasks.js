const express= require('express');
const router = express.Router();
const {getAllTasks,getSingleTask,updateTask,deleteTask,createNewTask} = require('../controllers/tasks');

router.get('/',getAllTasks)
// alter router.route('/').get((req,res)=>{res.send('   ')});
//router.route('/').post(createNewTask);
router.post('/',createNewTask);
router.get('/:id',getSingleTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports= router