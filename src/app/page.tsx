import {
  getMongoDBUserIdOfLoggedInUser,
  handleNewUserRegistration,
} from "@/actions/users";
import { connectDB } from "@/config/dbConfig";
import { UserButton } from "@clerk/nextjs";
import { log } from "console";

connectDB();
export default async function Home() {
  await handleNewUserRegistration();

  const mongoUserId = await getMongoDBUserIdOfLoggedInUser();

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
