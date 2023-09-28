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
        success: true,
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
        success: true,
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

// const getJobs = async (req, res) => {
//   const jobs = Jobs.find({ createdBy: req.user.id })
//   res.status(StatusCodes.OK).json({success:true, data:jobs})
// }

// const getJob = async (req, res) => {
//   const {
//     user: { id },
//     params: { jobId: id },
//   } = req

//   const job = await Job.findOne({
//     _id: jobId,
//     createdBy: userId,
//   })
//   if (!job) {
//     throw new NotFoundError(`No job with id ${jobId}`)
//   }
//   res.status(StatusCodes.OK).json({ job })
// }

module.exports = { createJob, getAllJobs, getJob };
