import { NewUSer } from "@/types";
import { account, ID } from "./config";

export async function createNewUser(user:NewUSer) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        return newAccount
    } catch (error) {
        console.log(error)
        return error
    }
}