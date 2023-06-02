/**
 * StartRidePayload Interface.
 */
interface StartRidePayload {
  customerId: number;
  driverId: number;
  destination: string;
  startedFrom: string;
}

export default StartRidePayload;
