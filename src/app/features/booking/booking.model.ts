export interface Booking {
  roomId: number;
  roomName?: string;
  roomPrice?: number;
  startTime: string;
  endTime: string;
  transactionRef?: string;
  pin?: number;
}
