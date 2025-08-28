"use client"

import { Card, CardTitle, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { use, useEffect, useState} from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBookings, addBooking, deleteBooking, Booking } from "@/lib/firestore";
import { getAnimals, Animal } from "@/lib/firestore";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import dynamic from "next/dynamic";
import { set } from "date-fns";
import { is } from "date-fns/locale";

const Calendar = dynamic(() =>
  import("@/components/ui/calendar").then((mod) => mod.Calendar), 
  { ssr: false }
)

export default function BookingPage() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [service, setService] = useState("");
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [time, setTime] = useState("");
    const [selectedAnimal, setSelectedAnimal] = useState<string>("");
    const [open, setOpen] = useState(false)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true);
    }, []);

    const markedDates = bookings.map(b => b.date ? new Date(b.date) : null).filter(Boolean) as Date[];

    const handleAddBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const animalObj = animals.find((animal: Animal) => animal.id === selectedAnimal);
        if (!animalObj) return alert("Pilih hewan dulu");
        if (!date) return alert("Pilih tanggal dulu");
        if (!service) return alert("Pilih layanan dulu");
        if (!time) return alert("Pilih waktu dulu");
        const newBooking: Booking = {
            animals: animalObj,
            service,
            date,
            time
        };
        const id = await addBooking(newBooking);
        setBookings((prev) => [...prev, { id, ...newBooking }]);

        setSelectedAnimal("");
        setService("");
        setDate(undefined);
        setTime("");
    };

    const handleDeleteBooking = (id: string) => {
        deleteBooking(id);
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            const animalsData = await getAnimals();
            setAnimals(animalsData);

            const bookingsData = await getBookings();
            setBookings(bookingsData);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4 pt-3">
            <h1 className="font-bold text-2xl">Booking Layanan</h1>
            <div className="flex gap-4">
                <Card className="w-full">
                    <CardHeader className="gap-0">
                        <CardTitle className="text-lg font-semibold">
                        Form Penambahan Booking
                        </CardTitle>
                        <CardDescription>
                        Silakan lengkapi informasi berikut untuk menambahkan booking baru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent >
                        <form onSubmit={handleAddBooking} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label>Nama Hewan</Label>
                                    <Select value={selectedAnimal} onValueChange={setSelectedAnimal}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih hewan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {animals.map((animal: Animal) => (
                                                <SelectItem key={animal.id} value={animal.id!}>
                                                    {animal.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Nama Layanan</Label>
                                    {
                                        isClient && (
                                            <Select value={service} onValueChange={setService}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih layanan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="grooming">Grooming</SelectItem>
                                                    <SelectItem value="boarding">Penitipan</SelectItem>
                                                    <SelectItem value="health">Kesehatan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Jadwal</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild className="">
                                        <Button
                                            variant="outline"
                                            id="date"
                                            className="justify-between font-normal w-full"
                                        >
                                            {date ? date.toLocaleDateString() : "Select date"}
                                            <ChevronDownIcon />
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                            setDate(date)
                                            setOpen(false)
                                            }}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Waktu</Label>
                                    <Input 
                                    type="time" 
                                    placeholder="Masukkan waktu layanan" 
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" className="bg-[#9F580A] w-">Tambah Pelanggan</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                    modifiers={{
                        booked: markedDates, 
                    }}
                    modifiersClassNames={{
                        booked: "bg-[#9F580A] text-white rounded-full",
                    }}
                />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Jadwal Booking</CardTitle>
                    <CardDescription>Berikut adalah jadwal booking yang telah dibuat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nama Hewan</TableHead>
                            <TableHead>Jenis Layanan</TableHead>
                            <TableHead>Jadwal</TableHead>
                            <TableHead>Waktu</TableHead>
                            <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking: Booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.animals.name}</TableCell>
                                    <TableCell>{booking.service}</TableCell>
                                    <TableCell>
                                        {booking.date ? booking.date.toLocaleDateString() : ""}
                                    </TableCell>
                                    <TableCell>{booking.time}</TableCell>
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
                                                            await handleDeleteBooking(booking.id!);
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
