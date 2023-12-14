type TravelInfo = {
  id: number;
  name: string;
  description: string;
  detail: string;
  type: string;
  categories: string;
  additionalInfo: string;
  metadata: string;
  promotion: string;
  createdAt: string;
  updatedAt: string;
}[];

type TravelResponse = {
  items: TravelInfo[];
  total: number;
  size: number;
  page: number;
};
