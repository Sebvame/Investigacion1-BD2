import Tasks from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Tasks.find({
    user: req.user.id
  }).populate('user');
  res.jon(tasks);
};

export const getTask = async (req, res) => {
  const task = await Tasks.findById(req.params.id);

  if (!task) return res.status(401).json({ msg: "Task not found" });
  res.json(task);
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;

  const newTask = new Tasks({
    title,
    description,
    date,
    user: req.userId,
  });

  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const deleteTask = async (req, res) => {
  const task = await Tasks.findByIdAndDelete(req.params.id);

  if (!task) return res.status(401).json({ msg: "Task not found" });
  res.sendStatus(204);
};

export const UpdateTask = async (req, res) => {
  const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!task) return res.status(401).json({ msg: "Task not found" });
  res.json(task);
};
