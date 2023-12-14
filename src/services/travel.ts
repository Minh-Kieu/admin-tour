import { clientTravel } from './axios';

const getTravels = (): Promise<TravelResponse> => clientTravel.get(`/travels/`);

const travelsService = {
  getTravels,
};

export default travelsService;
