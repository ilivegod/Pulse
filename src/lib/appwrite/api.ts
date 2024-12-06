import { NewUSer } from "@/types";
import { account, appwriteConfig, avatars, databases, ID } from "./config";

export async function createNewUser(user:NewUSer) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.email,
            imageUrl: avatarUrl,
            username: user.username
        })

        return newUser
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl?: any,
    username?: string
}) {
try {
    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        user
    )

    return newUser;
} catch (error) {
    console.log(error)
}
}

