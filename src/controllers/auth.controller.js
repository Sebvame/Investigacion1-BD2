import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const UserFound = await User.findOne({email});

    if (!UserFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, UserFound.password);

    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: UserFound._id });

    res.cookie("token", token);

    res.json({
      id: UserFound._id,
      name: UserFound.name,
      email: UserFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {

  res.cookie("token", "" ,{
    expires: new Date(0),
  });
  return res.sendStatus(200);
}

export const profile = async (req, res) => {
  
  const UserFound = await User.findById(req.user.id);

  if(!UserFound) return res.status(404).json({message: "User not found"});

  return res.json({
    id: UserFound._id,
    name: UserFound.name,
    email: UserFound.email,
  });

};