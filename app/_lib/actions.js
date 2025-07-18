"use server";

import {auth, signIn, signOut} from "@/app/_lib/auth";
import supabase from "@/app/_lib/superbase";
import {revalidatePath} from "next/cache";
import {getBookings} from "@/app/_lib/data-service";
import {redirect} from "next/navigation";

export async function  updateGuestAction(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be authenticated");

    const nationalId = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
        throw new Error("Please provide a valid national ID");

    const updateDate = {nationality, countryFlag, nationalId};

    const { data, error } = await supabase
        .from("guests")
        .update(updateDate)
        .eq("id", session.user.guestId);

    if (error) throw new Error("Guest could not be updated");

    revalidatePath("/account/profile");
}

export async function updateBookingAction(formData) {
    const bookingId = Number(formData.get("bookingId"));

    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
        throw new Error("You are not allowed to update this booking");

    const updateData = {
        guests: Number(formData.get("guests")),
        observations: formData.get("observations").slice(0, 1000),
    };

    const { error } = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId)
        .select()
        .single();

    if (error) throw new Error("Booking could not be updated");

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath("/account/reservations");

    redirect("/account/reservations");
}

export async function deleteReservationAction(bookingId) {
    const session = await auth();
    if (!session) throw new Error("You must be authenticated");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if(!guestBookingsIds.includes(bookingId))
        throw new Error("Booking can be deleted only by specific guest");

    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/account/reservations");
}

export async function singInAction() {
    await signIn('google', {redirectTo: '/account'});
}

export async function singOutAction() {
    await signOut({redirectTo: '/'});
}