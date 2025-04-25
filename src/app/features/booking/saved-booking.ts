export interface SavedBooking {
  bookingId: number;
  roomName: string;
  roomId: number;
  roomFloor: number;
  price: number;
  startTime: string;
  endTime: string;
  transactionRef: string;
  pin: number;
}
