import { Tours } from 'views/Tours';
import { Hotels } from 'views/Hotels';

const privateRoute = {
  tours: {
    path: '/tours',
    name: 'Tours',
    component: <Tours />,
  },
  hotels: {
    path: '/hotels',
    name: 'Hotels',
    component: <Hotels />,
  },
};

export default privateRoute;
