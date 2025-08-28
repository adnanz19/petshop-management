"use client"

import { Card, CardTitle, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState} from "react";
import { getInventoryItems, addInventoryItem, deleteInventoryItem, Inventory } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { set } from "date-fns";

export default function InventoryPage() {
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
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [inventoryItems, setInventoryItems] = useState<Inventory[]>([]);

    const handleAddInventoryItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const item = { name, category, stock: Number(stock), price: Number(price) };
        const id = await addInventoryItem(item);
        setInventoryItems((prev) => [...prev, { id, ...item }]);

        setName("");
        setCategory("");
        setStock("");
        setPrice("");
    };

    const handleDeleteInventoryItem = (id: string) => {
        deleteInventoryItem(id);
        setInventoryItems((prev) => prev.filter((item) => item.id !== id));
    };

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const data = await getInventoryItems();
            setInventoryItems(data);
        };

        fetchInventoryItems();
    }, []);

    return (
        <div className="pt-3 flex flex-col gap-4 w-full">
            <h1 className="font-bold text-2xl">Manajemen Inventaris</h1>
            <Card className="w-full">
                <CardHeader className="gap-0">
                    <CardTitle className="text-lg font-semibold">
                    Form Penambahan Inventaris
                    </CardTitle>
                    <CardDescription>
                    Silakan lengkapi informasi berikut untuk menambahkan inventaris baru.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleAddInventoryItem} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nama Barang</Label>
                                <Input 
                                type="text" 
                                placeholder="Masukkan nama barang" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Kategori</Label>
                                { isClient && (
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="makanan">Makanan Hewan</SelectItem>
                                            <SelectItem value="minuman">Minuman Hewan</SelectItem>
                                            <SelectItem value="perawatan">Perawatan Hewan</SelectItem>
                                            <SelectItem value="aksesori">Aksesori Hewan</SelectItem>
                                            <SelectItem value="lainnya">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Stok</Label>
                                <Input 
                                type="number" 
                                placeholder="Masukkan stok" 
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                />  
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Harga Per Satuan</Label>
                                <Input 
                                type="number" 
                                placeholder="Masukkan harga" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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
                            <TableHead>Nama Barang</TableHead>
                            <TableHead>Jenis Barang</TableHead>
                            <TableHead>Stok</TableHead>
                            <TableHead>Harga Per Satuan (RP)</TableHead>
                            <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventoryItems.map((item: Inventory) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.price}</TableCell>
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
                                                    await handleDeleteInventoryItem(item.id!);
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
