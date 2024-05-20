import { leaders } from "../publics/data.js";

export const getLeaders = (req, res) => {
  const leaderList = leaders;
  res.status(200).json(leaderList);
};

export const getLeaderById = (req, res) => {
  const { leaderId } = req.params;

  const leader = leaders.find((leader) => leader.id === leaderId);

  if (!leader) {
    res.status(404).json({ message: "Leader not found" });
  } else {
    res.status(200).json(leader);
  }
};

export const createLeader = (req, res) => {
  const { name, description } = req.body;

  const newLeader = {
    id: `l${leaders.length}`,
    name,
    description,
  };

  leaders.push(newLeader);

  res.status(201).json(newLeader);
};

export const createLeaderWithId = (req, res) => {
  const { leaderId } = req.params;

  const isExist = leaders.find((leader) => leader.id === leaderId);

  if (isExist) {
    res
      .status(409)
      .json({ message: `Leader with id=${leaderId} already exist` });
  } else {
    const { name, description } = req.body;

    const newLeader = {
      id: leaderId,
      name,
      description,
    };

    leaders.push(newLeader);

    res.status(201).json(newLeader);
  }
};

export const updateLeader = (req, res) => {
  const { leaderId } = req.params;

  const isExist = leaders.find((leader) => leader.id === leaderId);

  if (isExist) {
    const { name, description } = req.body;

    leaders.forEach((leader) => {
      if (leader.id === leaderId) {
        leader.name = name;
        leader.description = description;
      }
    });

    res.status(201).json({ message: `Leader updated with id of ${leaderId}` });
  } else {
    res.status(404).json({ message: "Leader not found" });
  }
};

export const deleteLeader = (req, res) => {
  const { leaderId } = req.params;

  const isExist = leaders.findIndex((leader) => leader.id === leaderId);

  if (isExist !== -1) {
    leaders.splice(isExist, 1);

    res.status(201).json({ message: `Leader deleted with id of ${leaderId}` });
  } else {
    res.status(404).json({ message: "Leader not found" });
  }
};
