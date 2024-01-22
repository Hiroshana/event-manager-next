import { connectDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";
connectDB();

export const handleNewUserRegistration = async () => {
  try {
    const loggedInUser = await currentUser();

    /**
     * Check if the user already registered
     */

    const userExists = await UserModel.findOne({
      clerkUserId: loggedInUser?.id,
    });
    if (userExists) return userExists;

    /**
     * Create new user if not exists
     */
    const newUser = new UserModel({
      userName: loggedInUser?.username,
      email: loggedInUser?.emailAddresses[0].emailAddress,
      clerkUserId: loggedInUser?.id,
    });

    await newUser.save();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMongoDBUserIdOfLoggedInUser = async () => {
  try {
    const loggedInUser = await currentUser();
    const userInMongoDB = await UserModel.findOne({
      clerkUserId: loggedInUser?.id,
    });
    if (userInMongoDB) return userInMongoDB._id;
  } catch (error: any) {
    throw new Error(error);
  }
};
