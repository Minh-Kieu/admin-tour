import { TableRow, TableCell, Button } from '@mui/material';
import { useState } from 'react';

type RowDataProps = {
  tour: ToursRowData;
  id: number;
  handleEdit: (tourById: ToursRowData) => void;
  handleRemove: (id: number) => void;
};

const RowData = ({ tour, id, handleEdit, handleRemove }: RowDataProps) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <TableRow key={id}>
      <TableCell>{tour.id}</TableCell>
      <TableCell>{tour.title}</TableCell>
      <TableCell>{tour.name}</TableCell>
      <TableCell>
        {readMore ? tour.description : `${tour.description.substring(0, 100)} ...`}
        <span className='font-semibold text-[#10b981]' onClick={() => setReadMore(!readMore)}>
          {' '}
          {readMore ? 'show less' : 'read more'}
        </span>
      </TableCell>
      <TableCell>${tour.price}</TableCell>
      <TableCell>{tour.priceVND}</TableCell>
      <TableCell>{tour.rating}</TableCell>
      <TableCell>{tour.region}</TableCell>
      <TableCell>
        <img src={tour.img} className='h-[40px] w-[60px]' />
      </TableCell>
      <TableCell className=''>
        <div className='flex gap-2'>
          <Button onClick={() => handleEdit(tour)} variant='contained' color='primary'>
            Edit
          </Button>
          <Button onClick={() => handleRemove(tour.id)} variant='contained' color='error'>
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RowData;
