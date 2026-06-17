import { User } from "../models/User";
import { generateToken, generateRefreshToken } from "../utils/jwt";

export const authService = {
  async register(name: string, email: string, password: string, role: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token, refreshToken };
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await (user as any).comparePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token, refreshToken };
  },
};
