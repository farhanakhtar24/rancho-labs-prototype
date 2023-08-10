import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAeRUcI-evGA_G2f79-9HDo0_Y-G-6vYuQ",
	authDomain: "rl-imagebucket.firebaseapp.com",
	projectId: "rl-imagebucket",
	storageBucket: "rl-imagebucket.appspot.com",
	messagingSenderId: "60656464024",
	appId: "1:60656464024:web:a038d50b71252d63f3a0ed",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
