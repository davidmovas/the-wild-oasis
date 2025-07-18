import {NextResponse} from "next/server";
import {getBookedDatesByCabinId, getCabin} from "@/app/_lib/data-service";

export async function GET(request, {params}) {
    const { cabinId } = params;

    try {
        const [cabin, bookedDates] = Promise.all([
             getCabin(cabinId),
            getBookedDatesByCabinId(cabinId),
        ]);

        return NextResponse.json({cabin, bookedDates})
    } catch {
        return NextResponse.json({ message: "requested cabin not found" });
    }
}