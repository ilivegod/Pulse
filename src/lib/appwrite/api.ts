import { NewUSer } from "@/types";
import { account, appwriteConfig, avatars, databases, ID } from "./config";
import { Query } from "appwrite";

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

        export async function signInUser(user: {email: string ; password: string}){
            try {
            const session = await account.createEmailPasswordSession(user.email, user.password);

            

            return session;
            } catch (error) {
                console.log(error)
                return
            }
        }


        export async function getCurrentUser() {
            try {
                const currentAccount = await account.get()

                if (!currentAccount) throw Error

                const currentUser = await databases.listDocuments(
                    appwriteConfig.databaseId,
                    appwriteConfig.usersCollectionId,
                    [
                        Query.equal('accountId' , currentAccount.$id)
                    ]
                )

                if(!currentUser) throw Error

                return currentUser.documents[0]
            } catch (error) {
                console.log(error)
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

