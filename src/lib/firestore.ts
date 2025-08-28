import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface Customer {
  id: string;
  name: string;
  gender: string;
  address: string;
  phone: string;
}

export interface Animal {
  id?: string; // opsional karena bisa belum ada sebelum tersimpan di Firestore
  name: string;
  species: string;
  race: string;
  gender: string;
  age: number;
  owner: Customer;
}

export interface Inventory {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface Booking {
  id?: string;
  service: string; // contoh: "boarding"
  date?: Date; // atau Timestamp dari Firestore
  time: string; // "07:30"
  animals: Animal;
}


// Tambah data pelanggan
export const addCustomer = async (customer: { name: string; gender: string; phone: string; address: string }) => {
  const docRef = await addDoc(collection(db, "customers"), customer);
  return docRef.id; // return ID dokumen
};

// Ambil semua pelanggan
export const getCustomers = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  const customers: Customer[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Customer, "id">;
    customers.push({ id: doc.id, ...data });
  });
  return customers;
};

export const deleteCustomer = async (id: string) => {
  await deleteDoc(doc(db, "customers", id));
};

export const addAnimal = async (animal: Animal) => {
  const docRef = await addDoc(collection(db, "animals"), animal);
  return docRef.id; // return ID dokumen
};

export const getAnimals = async () => {
  const querySnapshot = await getDocs(collection(db, "animals"));
  const animals: Animal[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Animal, "id">;
    animals.push({ id: doc.id, ...data });
  });
  return animals;
};

export const deleteAnimal = async (id: string) => {
  await deleteDoc(doc(db, "animals", id));
};

export const addInventoryItem = async (item: { name: string; category: string; stock: number; price: number }) => {
  const docRef = await addDoc(collection(db, "inventory"), item);
  return docRef.id; // return ID dokumen
};

export const getInventoryItems = async () => {
  const querySnapshot = await getDocs(collection(db, "inventory"));
  const inventoryItems: Inventory[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Inventory, "id">;
    inventoryItems.push({ id: doc.id, ...data });
  });
  return inventoryItems;
};

export const deleteInventoryItem = async (id: string) => {
  await deleteDoc(doc(db, "inventory", id));
};

export const addBooking = async (booking: Booking) => {
  const docRef = await addDoc(collection(db, "bookings"), booking);
  return docRef.id; // return ID dokumen
};

export const getBookings = async () => {
  const querySnapshot = await getDocs(collection(db, "bookings"));
  const bookings: Booking[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Booking, "id">;
    let bookingDate: Date | undefined = undefined;

    if (data.date instanceof Timestamp) {
      bookingDate = data.date.toDate();
    } else if (data.date instanceof Date) {
      bookingDate = data.date;
    }
    bookings.push({
      id: doc.id,
      ...data,
      date: bookingDate,
    });
  });
  return bookings;
};


export const deleteBooking = async (id: string) => {
  await deleteDoc(doc(db, "bookings", id));
};
