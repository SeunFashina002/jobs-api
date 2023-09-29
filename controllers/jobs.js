const Jobs = require("../models/Jobs");
const { StatusCodes } = require("http-status-codes");

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, data: job });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: err.message });
  }
};

// TODO: Get all jobs

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({ createdBy: req.user.id });
    if (jobs.length === 0) {
      return res.status(StatusCodes.OK).json({
        success: false,
        message: "oops, seems you have no jobs yet",
        count: jobs.length,
      });
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, data: jobs, count: jobs.length });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: err.message });
  }
};

const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findOne({ _id: id, createdBy: req.user.id });
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No, jobs found with the id: ${id}`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, data: job });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: err.message });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    req.body.createdBy = req.user.id;

    const job = await Jobs.findByIdAndUpdate(
      { _id: id, createdBy: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No, jobs found with the id: ${id}`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, data: job });
  } catch (err) {
    throw err;
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  req.body.createdBy = req.user.id;
  try {
    const job = await Jobs.findByIdAndDelete({
      _id: id,
      createdBy: req.user.id,
    });
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `No, jobs found with the id: ${id}`,
      });

      res.status(StatusCodes.NO_CONTENT).json({
        success: true,
        message: `The ${job.position} role at ${job.company} has been successfully deleted`,
      });
    }
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: err.message });
  }
};

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
