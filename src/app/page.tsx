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
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
