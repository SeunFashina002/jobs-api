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
const getJobs = async (req, res) => {
  const jobs = Jobs.find({createdBy: req.user.id)
  res.status(StatusCodes.OK).json({success:true, data:jobs})
}

const getJob = async (req, res) => {
  const {
    user: { id },
    params: { jobId: id },
  } = req

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

module.exports = {createJob, getJobs, getJob}
