import { client } from './axios';

const getTours = (): Promise<ToursResponse> => client.get(`/tours`);

const createTours = (body: ToursParams): Promise<ToursParams> => client.post(`/tours`, body);

const updateToursID = (body: ToursParams): Promise<ToursParams> => client.put(`/tours/` + body.id, body);

const deleteTours = (id: number): Promise<ToursResponse> => client.delete(`/tours/` + id);

const toursService = {
  getTours,
  updateToursID,
  deleteTours,
  createTours,
};

export default toursService;
