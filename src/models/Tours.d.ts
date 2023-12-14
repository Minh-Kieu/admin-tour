type ToursResponse = [
  {
    id: number;
    title: string;
    rating: number;
    price: number;
    img: string;
    region: string;
    name: string;
    priceVND: string;
    description: string;
  },
];

type ToursRowData = {
  id: number;
  title: string;
  rating: number;
  price: number;
  img: string;
  region: string;
  name: string;
  priceVND: string;
  description: string;
};

type ToursParams = {
  id: number;
  title: string;
  rating: number;
  price: number;
  img: string;
  region: string;
  name: string;
  priceVND: string;
  description: string;
};
