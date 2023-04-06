import { createError } from "../error.js";
import User from "../models/User.js";

export const test = (req, res) => {
  res.json("Successful br");
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "No authorization for update!"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("User has been deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "No authorization to delete the account!!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful!");
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Successful unsubscribed!");
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
