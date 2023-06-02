/**
 * RideDetail Interface.
 */
interface RideDetail {
  id?: number;
  customerId: number;
  driverId: number;
  fromLatitude: string;
  toLatitude: string;
  fromLongitude: string;
  toLongitude: string;
  destination: string;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default RideDetail;
