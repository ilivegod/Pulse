import { Client, Account, Databases, Storage, Avatars} from 'appwrite';

export const client = new Client();

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    storageId : import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    savesCollectionId : import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
}

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export { ID } from 'appwrite';
