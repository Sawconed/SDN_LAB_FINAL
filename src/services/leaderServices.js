const Leader = require("../models/leaders");

const handleError = (error) => {
  const errors = { name: "", designation: "" };

  if (error.code === 11000) {
    errors.name = "Leader with this name already existed";

    return errors;
  }

  if (error.message.includes("Leader validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.getLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find();
    res.status(200).json(leaders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getLeaderById = async (req, res) => {
  const { leaderId } = req.params;

  try {
    const leader = await Leader.findById(leaderId);

    if (!leader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    res.status(200).json(leader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.createLeader = async (req, res) => {
  const leaderData = new Leader(req.body);

  try {
    const newLeader = await leaderData.save();

    res.status(201).json(newLeader);
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports.createLeaderWithId = async (req, res) => {
  const { leaderId } = req.params;

  try {
    const isLeaderExist = await Leader.findById(leaderId);

    if (isLeaderExist) {
      return res.status(409).json({ message: "Leader already existed" });
    }

    const leaderData = new Leader({ _id: leaderId, ...req.body });
    const newLeader = await leaderData.save();

    res.status(201).json(newLeader);
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports.updateLeader = async (req, res) => {
  const { leaderId } = req.params;

  try {
    const isLeaderExist = await Leader.findByIdAndUpdate(leaderId, {
      ...req.body,
    });

    if (!isLeaderExist) {
      return res.status(404).json({ message: "Leader not found" });
    }

    res.status(201).json({ message: "Leader updated" });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports.deleteLeader = async (req, res) => {
  const { leaderId } = req.params;

  try {
    const deleteLeader = await Leader.findByIdAndDelete(leaderId);

    if (!deleteLeader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    res.status(201).json({ message: "Leader deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
