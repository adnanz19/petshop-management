"use client"

import { Card, CardTitle, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState} from "react";
import { getCustomers, addCustomer, deleteCustomer } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "@/components/ui/dialog";

export default function CustomerPage() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        router.push("/login");
        } else {
        setAuthorized(true);
        }
    }, [router]);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [customers, setCustomers] = useState<any[]>([]);

    const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const customer = { name, gender, phone, address };
        const id = await addCustomer(customer);
        setCustomers((prev) => [...prev, { id, ...customer }]);

        setName("");
        setGender("");
        setPhone("");
        setAddress("");
    };

    const handleDeleteCustomer = (id: string) => {
        deleteCustomer(id);
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers();
            setCustomers(data);
        };

        fetchCustomers();
    }, []);

    return (
        <div className="pt-3 flex flex-col gap-4 w-full">
            <h1 className="font-bold text-2xl">Manajemen Pelanggan</h1>
            <Card className="w-full">
                <CardHeader className="gap-0">
                    <CardTitle className="text-lg font-semibold">
                    Form Penambahan Pelanggan
                    </CardTitle>
                    <CardDescription>
                    Silakan lengkapi informasi berikut untuk menambahkan pelanggan baru.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleAddCustomer} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Pelanggan</Label>
                                <Input 
                                type="text" 
                                placeholder="Masukkan nama pelanggan" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Jenis Kelamin</Label>
                                {
                                    isClient && (
                                        <Select value={gender} onValueChange={setGender}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Alamat</Label>
                                <Input 
                                type="text" 
                                placeholder="Masukkan alamat pelanggan" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Kontak</Label>
                                <Input 
                                type="text" 
                                placeholder="Masukkan nomor telepon" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-[#9F580A] w-">Tambah Pelanggan</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="gap-0">
                    <CardTitle  className="text-lg font-semibold">Daftar Pelanggan</CardTitle>
                    <CardDescription>Ini adalah daftar pelanggan yang terdaftar di sistem.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nama Pelanggan</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer: any) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.gender}</TableCell>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" size="sm">Delete</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                <DialogDescription>
                                                Apakah kamu yakin ingin menghapus data pelanggan ini? Tindakan ini tidak bisa dibatalkan.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Batal</Button>
                                                </DialogClose>
                                                <Button
                                                variant="destructive"
                                                onClick={async () => {
                                                    await handleDeleteCustomer(customer.id);
                                                }}
                                                >
                                                Hapus
                                                </Button>
                                            </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
