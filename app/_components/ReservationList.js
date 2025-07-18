"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import {deleteReservationAction} from "@/app/_lib/actions";
import {useOptimistic} from "react";

export default function ReservationList({bookings}) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currentBookings, bookingId) => {
        return currentBookings.filter((booking) => booking.id !== bookingId);
    });

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteReservationAction(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
            ))}
        </ul>
    );
}