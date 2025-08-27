"use client"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { addAnimal, deleteAnimal, getAnimals } from "@/lib/firestore";
import { getCustomers } from "@/lib/firestore";

export default function AnimalPage() {
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [race, setRace] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [owners, setOwners] = useState<string[]>([]);
    const [selectedOwner, setSelectedOwner] = useState<string>("");
    const [animals, setAnimals] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const animalsData = await getAnimals();
            setAnimals(animalsData);

            const customersData = await getCustomers();
            setOwners(customersData);
        };
        fetchData();
    }, []);


    const handleAddAnimal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ownerObj = owners.find((o: any) => o.id === selectedOwner);
        const newAnimal = {
            name,
            species,
            race,
            gender,
            age: Number(age),
            owner: ownerObj ? ownerObj : "",
        };
        const id = await addAnimal(newAnimal);
        setAnimals([...animals, { id, ...newAnimal }]);

        setName("");
        setSpecies("");
        setRace("");
        setGender("");
        setAge("");
        setSelectedOwner("");
    };

    const handleDeleteAnimal = async (id: string) => {
        await deleteAnimal(id);
        setAnimals(animals.filter((animal) => animal.id !== id));
    };

    return (
        <div className="pt-3 flex flex-col gap-4 w-full">
            <h1 className="font-bold text-2xl">Manajemen Hewan</h1>
            <Card className="w-full">
                <CardHeader className="gap-0">
                    <CardTitle className="text-lg font-semibold">
                    Form Penambahan Hewan
                    </CardTitle>
                    <CardDescription>
                    Silakan lengkapi informasi berikut untuk menambahkan pelanggan baru.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddAnimal} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Nama Hewan</Label>
                            <Input 
                            type="text" 
                            placeholder="Masukkan nama pelanggan" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Jenis Hewan</Label>
                            <Input 
                            type="text" 
                            placeholder="Masukkan jenis hewan" 
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Ras Hewan</Label>
                            <Input
                            type="text"
                            placeholder="Masukkan ras hewan"
                            value={race}
                            onChange={(e) => setRace(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Umur Hewan (Bulan)</Label>
                            <Input 
                            type="text" 
                            placeholder="Masukkan usia hewan" 
                            value={age}
                            onChange={((e) => setAge(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Jenis Kelamin</Label>
                            {
                                isClient && (
                                    <Select 
                                        value={gender}
                                        onValueChange={(value) => setGender(value)}
                                    >
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
                            <Label>Nama Pemilik</Label>
                            {
                                isClient && (
                                    <Select
                                    value={selectedOwner}
                                    onValueChange={setSelectedOwner}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih nama pemilik" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {owners.map((owner: any) => (
                                                <SelectItem key={owner.id} value={owner.id}>
                                                    {owner.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }
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
                    <CardTitle  className="text-lg font-semibold">Daftar Hewan</CardTitle>
                    <CardDescription>Ini adalah daftar hewan yang terdaftar di sistem.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nama Pelanggan</TableHead>
                            <TableHead>Jenis</TableHead>
                            <TableHead>Ras</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Umur (Bulan)</TableHead>
                            <TableHead>Pemilik</TableHead>
                            <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {animals.map((animal: any) => (
                                <TableRow key={animal.id}>
                                    <TableCell>{animal.name}</TableCell>
                                    <TableCell>{animal.species}</TableCell>
                                    <TableCell>{animal.race}</TableCell>
                                    <TableCell>{animal.gender}</TableCell>
                                    <TableCell>{animal.age}</TableCell>
                                    <TableCell>{animal.owner.name}</TableCell>
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
                                                    await handleDeleteAnimal(animal.id);
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