import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
  // ambil token
  const token = await userCredential.user.getIdToken();
  
  // simpan di localStorage (client-side)
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }

  return userCredential.user;
};


export const logoutUser = async () => {
  return await signOut(auth);
};

