import { TableRow, TableCell, Button } from '@mui/material';
import { useState } from 'react';

type RowHotelProps = {
  hotel: HotelsRowData;
  id: number;
  handleEdit: (hotelById: HotelsRowData) => void;
  handleRemove: (id: number) => void;
};

const RowHotel = ({ hotel, id, handleRemove, handleEdit }: RowHotelProps) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <TableRow key={id}>
      <TableCell>{hotel.id}</TableCell>
      <TableCell>{hotel.type}</TableCell>
      <TableCell>{hotel.name}</TableCell>
      <TableCell>${hotel.price}</TableCell>
      <TableCell>
        {readMore ? hotel.title : `${hotel.title.substring(0, 100)} ...`}
        <span className='font-semibold text-[#10b981]' onClick={() => setReadMore(!readMore)}>
          {' '}
          {readMore ? 'show less' : 'read more'}
        </span>
      </TableCell>
      <TableCell>{hotel.location}</TableCell>
      <TableCell>
        <img src={hotel.img1} className='h-[60px] w-[100px]' />
      </TableCell>
      <TableCell>
        <img src={hotel.img2} className='h-[60px] w-[100px]' />
      </TableCell>
      <TableCell>
        <img src={hotel.img3} className='h-[60px] w-[100px]' />
      </TableCell>
      <TableCell>{hotel.bedType1}</TableCell>
      <TableCell>{hotel.bedType2}</TableCell>
      <TableCell className=''>
        <div className='flex gap-2'>
          <Button onClick={() => handleEdit(hotel)} variant='contained' color='primary'>
            Edit
          </Button>
          <Button onClick={() => handleRemove(hotel.id)} variant='contained' color='error'>
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RowHotel;
