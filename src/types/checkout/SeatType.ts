export type Seat = "standard" | "accessible" | "companion";

export type SeatSelected = {
    type: Seat,
    position: string;
}
