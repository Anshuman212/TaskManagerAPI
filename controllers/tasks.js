const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error')
//
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createNewTask = asyncWrapper(async (req, res) => {
  //   try {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});
const getSingleTask = asyncWrapper(async (req, res) => {
  //   try {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError( `Nothing found similar to id ${taskId}`,404))
    // return res
    //   .status(404)
    //   .json({ message: `Nothing found similar to id ${taskId}` });
  }
  res.status(200).json(task);
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});
const deleteTask = asyncWrapper(async (req, res) => {
  //   try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`nothing found similar to ${taskID}` ,404));
    // return res
    //   .status(404)
    //   .json({ message: `nothing found similar to ${taskID}` });
  }
  res.status(200).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

const updateTask = asyncWrapper(async (req, res) => {
  //   try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError( 'cannot find the task to update' ,404));
    // return res.status(404).json({ message: 'cannot find the task to update' });
  }
  res.status(200).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
});

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
