import responseHandler from '../handlers/response.handler.js';
import memoryModel from '../models/memory.model.js';

const getAllMemories = async (req, res) => {
  try {
    const memories = await memoryModel.find({}).sort('-date').sort('-createdAt');
    responseHandler.ok(res, memories);
  } catch {
    responseHandler.error(res);
  }
};

const createMemory = async (req, res) => {
  try {
    const memory = new memoryModel({
      ...req.body,
    });

    await memory.save();

    responseHandler.created(res, {
      ...memory._doc,
      id: memory.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const deleteMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const memory = await memoryModel.findOne({
      _id: memoryId,
    });

    if (!memory) return responseHandler.notfound(res);

    await memory.remove();

    responseHandler.ok(res, 'Memory deleted');
  } catch {
    responseHandler.error(res);
  }
};

const searchMemory = async (req, res) => {
  try {
    const { childName } = req.params;
    const memories = await memoryModel.find({ child: childName }).sort('-date').sort('-createdAt');
    responseHandler.ok(res, memories);
  } catch {
    responseHandler.error(res);
  }
};

const updateMemory = async (req, res) => {
  try {
    await memoryModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  getAllMemories,
  createMemory,
  deleteMemory,
  searchMemory,
  updateMemory,
};
