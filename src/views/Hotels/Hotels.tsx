import { useQuery, useMutation } from '@tanstack/react-query';
import { hotelsService } from 'services';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import queryService from 'services/client';
import RowHotel from './RowHotel';
import { enqueueSnackbar } from 'notistack';
import { CommonSearch } from 'components';
import { useSearch } from 'hooks';

const Hotels = () => {
  const [id, setId] = useState(0);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [bedType1, setBedType1] = useState('');
  const [bedType2, setBedType2] = useState('');

  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState<HotelsRowData>();

  const [editHotel, editHotelChange] = useState<HotelsRowData>();

  const [page, pageChange] = useState(0);
  const [rowPerPage, rowPerPageChange] = useState(5);
  const [count, setCount] = useState(0);

  const [open, openChange] = useState(false);
  const [isEdit, isEditChange] = useState(false);

  const [titleDialog, titleDialogChange] = useState('');
  const [agreeTerm, agreeTermChange] = useState(true);

  const [searchState, setSearchState] = useState(false);

  const [dataaSearch, onSearchChange] = useSearch();

  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotelsService.getHotels'],
    queryFn: () => hotelsService.getHotels(),
  });

  useEffect(() => {
    if (searchState) {
      setSearchState(false);
    }
  }, [searchState]);

  const createHotelMutation = useMutation({
    mutationFn: (body: HotelsParams) => hotelsService.createHotels(body),
  });

  const updateHotelMutation = useMutation({
    mutationFn: (body: HotelsParams) => hotelsService.updateHotelsID(body),
  });

  const deleteHotelMutation = useMutation({
    mutationFn: (id: number) => hotelsService.deleteHotels(id as number),
  });

  const clearState = () => {
    setId(0);
    setType('');
    setName('');
    setPrice('');
    setTitle('');
    setLocation('');
    setImg1('');
    setImg2('');
    setImg3('');
    setBedType1('');
    setBedType2('');
  };

  const openPopup = () => {
    openChange(true);
  };

  const closePopup = () => {
    openChange(false);
  };

  const functionAdd = () => {
    isEditChange(false);
    clearState();
    titleDialogChange('New Hotels');
    openPopup();
  };

  useEffect(() => {
    if (hotels) {
      setCount(hotels.length);
    }
  }, [hotels]);

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, newpage: number) => {
    pageChange(newpage);
  };

  const handleRowPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    rowPerPageChange(parseInt(e.target.value));
    pageChange(0);
  };

  const handleEdit = (hotelById: HotelsRowData) => {
    editHotelChange(hotelById);
    isEditChange(true);

    setId(hotelById.id);
    setType(hotelById.type);
    setName(hotelById.name);
    setPrice(hotelById.price);
    setTitle(hotelById.title);
    setLocation(hotelById.location);
    setImg1(hotelById.img1);
    setImg2(hotelById.img2);
    setImg3(hotelById.img3);
    setBedType1(hotelById.bedType1);
    setBedType2(hotelById.bedType2);

    titleDialogChange('Edit Hotels');
    openPopup();
  };

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to remove?')) {
      deleteHotelMutation.mutate(id);
      queryService.invalidateQueries({ queryKey: ['hotelsService.getHotels'] });
      enqueueSnackbar('Remove successfully');
    } else {
      enqueueSnackbar('Remove failed', { variant: 'error' });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const obj = { id, title, name, type, price, location, img2, img3, img1, bedType1, bedType2 };
    if (isEdit) {
      updateHotelMutation.mutate(obj);
      enqueueSnackbar('Edit successfully');
    } else {
      createHotelMutation.mutate(obj);
      enqueueSnackbar('Create Hotel successfully');
    }

    queryService.invalidateQueries({ queryKey: ['hotelsService.getHotels'] });

    closePopup();
  };

  return (
    <div>
      <Paper sx={{ margin: '1%' }}>
        <div className='flex justify-between pt-4' style={{ margin: '1%' }}>
    
          <Button onClick={functionAdd} variant='contained'>
            Add New (+)
          </Button>
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'midnightblue' }}>
                  {hotels &&
                    Object.keys(hotels?.[0]!).map((column, i) => (
                      <TableCell key={i} style={{ color: 'white' }}>
                        {column}
                      </TableCell>
                    ))}
                  <TableCell key={222} style={{ color: 'white' }}>
                    action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotels &&
                  hotels.slice(page * rowPerPage, page * rowPerPage + rowPerPage)?.map((hotel, i) => {
                    return (
                      <RowHotel handleEdit={handleEdit} handleRemove={handleRemove} key={i} hotel={hotel} id={i} />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            rowsPerPage={rowPerPage}
            page={page}
            count={count}
            component={'div'}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowPerPageChange}
          ></TablePagination>
        </div>
      </Paper>

      <Dialog open={open} onClose={closePopup} fullWidth maxWidth='sm'>
        <DialogTitle>
          <span>Hotel</span>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                value={id}
                required
                variant='outlined'
                label='Id'
                onChange={(e: any) => {
                  setId(e.target.value);
                }}
              ></TextField>
              <TextField
                value={name}
                required
                variant='outlined'
                label='Name'
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              ></TextField>
              <TextField
                value={type}
                required
                variant='outlined'
                label='Type'
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
              ></TextField>
              <TextField
                value={price}
                required
                variant='outlined'
                label='Price'
                onChange={(e: any) => {
                  setPrice(e.target.value);
                }}
              ></TextField>
              <TextField
                value={title}
                required
                variant='outlined'
                label='Title'
                onChange={(e: any) => {
                  setTitle(e.target.value);
                }}
              ></TextField>
              <TextField
                value={location}
                required
                variant='outlined'
                label='Location'
                onChange={(e: any) => {
                  setLocation(e.target.value);
                }}
              ></TextField>
              <TextField
                value={img1}
                required
                variant='outlined'
                label='Image 1'
                onChange={(e: any) => {
                  setImg1(e.target.value);
                }}
              ></TextField>
              <TextField
                value={img2}
                required
                variant='outlined'
                label='Image 2'
                onChange={(e: any) => {
                  setImg2(e.target.value);
                }}
              ></TextField>
              <TextField
                value={img3}
                required
                variant='outlined'
                label='Image 3'
                onChange={(e: any) => {
                  setImg3(e.target.value);
                }}
              ></TextField>
              <TextField
                value={bedType1}
                required
                variant='outlined'
                label='Bed Type 1'
                onChange={(e: any) => {
                  setBedType1(e.target.value);
                }}
              ></TextField>
              <TextField
                value={bedType2}
                required
                variant='outlined'
                label='Bed Type 2'
                onChange={(e: any) => {
                  setBedType2(e.target.value);
                }}
              ></TextField>
              <FormControlLabel
                checked={agreeTerm}
                onChange={(e: any) => {
                  agreeTermChange(e.target.checked);
                }}
                label='Agree Terms & Conditions'
                control={<Checkbox></Checkbox>}
              ></FormControlLabel>
              <Button disabled={!agreeTerm} variant='contained' type='submit'>
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hotels;
