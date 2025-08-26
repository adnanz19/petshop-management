import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Tambah data pelanggan
export const addCustomer = async (customer: { name: string; gender: string; phone: string; address: string }) => {
  const docRef = await addDoc(collection(db, "customers"), customer);
  return docRef.id; // return ID dokumen
};

// Ambil semua pelanggan
export const getCustomers = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  const customers: any[] = [];
  querySnapshot.forEach((doc) => {
    customers.push({ id: doc.id, ...doc.data() });
  });
  return customers;
};

export const deleteCustomer = async (id: string) => {
  await deleteDoc(doc(db, "customers", id));
};

export const addAnimal = async (animal: { name: string; species: string; race: string; gender: string; age: number; owner: string }) => {
  const docRef = await addDoc(collection(db, "animals"), animal);
  return docRef.id; // return ID dokumen
};

export const getAnimals = async () => {
  const querySnapshot = await getDocs(collection(db, "animals"));
  const animals: any[] = [];
  querySnapshot.forEach((doc) => {
    animals.push({ id: doc.id, ...doc.data() });
  });
  return animals;
};

export const deleteAnimal = async (id: string) => {
  await deleteDoc(doc(db, "animals", id));
};
