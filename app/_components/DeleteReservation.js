"use client";

import { TrashIcon } from '@heroicons/react/24/solid';
import {useTransition} from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
    const [isPending, startTransition] = useTransition();

    function handleDeleteReservation() {
        if (confirm("Are you sure you want to delete the reservation?")) {
            startTransition(() => onDelete(bookingId));
        }
    }

    return (
        <button
            onClick={handleDeleteReservation}
            className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
        >
            {!isPending ? (
                <>
                    <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                    <span className='mt-1'>Delete</span>
                </>
            ) : (
                <span className="mx-auto">
                    <SpinnerMini />
                </span>
            )}
        </button>
    );
}

export default DeleteReservation;