"use client"

import { Card, CardTitle, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CustomerPage() {
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
                <CardContent className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Nama Pelanggan</Label>
                        <Input type="text" placeholder="Masukkan nama pelanggan" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Masukkan email pelanggan" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>No. Telepon</Label>
                        <Input type="text" placeholder="Masukkan nomor telepon" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Alamat</Label>
                        <Input type="text" placeholder="Masukkan alamat pelanggan" />
                    </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button className="bg-[#9F580A]">Tambah Pelanggan</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="text-lg font-semibold">
                    Daftar Pelanggan
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>ID Pelanggan</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                            <TableCell>001</TableCell>
                            <TableCell>Budi Santoso</TableCell>
                            <TableCell>Laki-laki</TableCell>
                            <TableCell>Jl. Merdeka No. 10</TableCell>
                            <TableCell>08123456789</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
