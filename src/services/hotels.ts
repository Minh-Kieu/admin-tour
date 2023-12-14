import { client } from './axios';

const getHotels = (): Promise<HotelsResponse> => client.get(`/hotels`);

const createHotels = (body: HotelsParams): Promise<HotelsParams> => client.post(`/hotels`, body);

const updateHotelsID = (body: HotelsParams): Promise<HotelsParams> => client.put(`/hotels/` + body.id, body);

const deleteHotels = (id: number): Promise<HotelsParams> => client.delete(`/hotels/` + id);

const hotelsService = {
  getHotels,
  updateHotelsID,
  createHotels,
  deleteHotels,
};

export default hotelsService;
