"use client";

import { useReservation } from "./ReservationContext";
import {differenceInDays} from "date-fns";
import {createBookingAction} from "@/app/_lib/actions";
import SubmitFormButton from "@/app/_components/SubmitFormButton";


function ReservationForm({ cabin, user }) {
    const { range, resetRange } = useReservation();
    const { id, maxCapacity, regularPrice, discount } = cabin;

    const startDate = range.from;
    const endDate = range.to;

    const nights = differenceInDays(endDate, startDate);
    const total = nights * (regularPrice - discount);

    const bookingData = {
        startAt: startDate,
        endAt: endDate,
        nights,
        price: regularPrice,
        total,
        cabinId: id,
    }

    const createBookingWithData = createBookingAction.bind(null, bookingData);

    return (
        <div className="scale-[1.01]">
            <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
                <p>Logged in as</p>

                <div className="flex gap-4 items-center">
                    <img
                        // Important to display google profile images
                        referrerPolicy="no-referrer"
                        className="h-8 rounded-full"
                        src={user.image}
                        alt={user.name}
                    />
                    <p>{user.name}</p>
                </div>
            </div>

            <form
                action={async (formData) => {
                    await createBookingWithData(formData);
                    resetRange();
                }}
                className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
            >
                <div className="space-y-2">
                    <label htmlFor="guests">How many guests?</label>
                    <select
                        name="guests"
                        id="guests"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        required
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        id="observations"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        placeholder="Any pets, allergies, special requirements, etc.?"
                    />
                </div>

                <div className="flex justify-end items-center gap-6">
                    {!(startDate && endDate) ? (
                        <p className="text-primary-300 text-base">Start by selecting dates</p>
                    ) : (
                        <SubmitFormButton pendingLabel={"Processing...."}>
                            Reserve now
                        </SubmitFormButton>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ReservationForm;