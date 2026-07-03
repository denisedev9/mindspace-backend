const Mood = require('../models/mood');

module.exports.createMood = (req, res, next) => {
  const { mood, note } = req.body;
  Mood.create({ userId: req.user._id, mood, note })
    .then((newMood) => res.status(201).send(newMood))
    .catch(next);
};

module.exports.getMoods = (req, res, next) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  Mood.find({ userId: req.user._id, date: { $gte: weekAgo } })
    .sort({ date: 1 })
    .then((moods) => res.send(moods))
    .catch(next);
};
