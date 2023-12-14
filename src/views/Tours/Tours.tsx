import { useQuery, useMutation } from '@tanstack/react-query';
import { toursService, travelsService } from 'services';
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
import RowData from './RowData';
import queryService from 'services/client';
import { enqueueSnackbar } from 'notistack';

const Tours = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [priceVND, setPriceVND] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');

  const [editTour, editTourChange] = useState<ToursRowData>();

  const [page, pageChange] = useState(0);
  const [rowPerPage, rowPerPageChange] = useState(5);
  const [count, setCount] = useState(0);

  const [open, openChange] = useState(false);
  const [isEdit, isEditChange] = useState(false);

  const [titleDialog, titleDialogChange] = useState('');
  const [agreeTerm, agreeTermChange] = useState(true);

  const { data: tours, isLoading } = useQuery({
    queryKey: ['toursService.getTours'],
    queryFn: () => toursService.getTours(),
  });

  const { data: travels, isLoading: travelsLoading } = useQuery({
    queryKey: ['travelsService.getTravels'],
    queryFn: () => travelsService.getTravels(),
  });

  console.log(travels);

  const createTourMutation = useMutation({
    mutationFn: (body: ToursParams) => toursService.createTours(body),
  });

  const updateTourMutation = useMutation({
    mutationFn: (body: ToursParams) => toursService.updateToursID(body),
  });

  const deleteTourMutation = useMutation({
    mutationFn: (id: number) => toursService.deleteTours(id as number),
  });
  useEffect(() => {
    if (tours) {
      setCount(tours.length);
    }
  }, [tours]);

  const openPopup = () => {
    openChange(true);
  };

  const functionAdd = () => {
    isEditChange(false);
    clearState();
    titleDialogChange('New Tours');
    openPopup();
  };

  const closePopup = () => {
    openChange(false);
  };

  const clearState = () => {
    setId(0);
    setName('');
    setTitle('');
    setPriceVND('');
    setRating(0);
    setPrice(0);
    setImg('');
    setRegion('');
    setDescription('');
  };

  const handleEdit = (tourById: ToursRowData) => {
    editTourChange(tourById);
    isEditChange(true);

    setId(tourById.id);
    setName(tourById.name);
    setTitle(tourById.title);
    setPriceVND(tourById.priceVND);
    setRating(tourById.rating);
    setPrice(tourById.price);
    setImg(tourById.img);
    setRegion(tourById.region);
    setDescription(tourById.description);

    titleDialogChange('Edit Tours');
    openPopup();
  };

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to remove?')) {
      deleteTourMutation.mutate(id);
      queryService.invalidateQueries({ queryKey: ['toursService.getTours'] });
      enqueueSnackbar('Remove tour successfully');
    } else {
      enqueueSnackbar('Remove tour failed', { variant: 'error' });
    }
  };

  const handleRowPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    rowPerPageChange(parseInt(e.target.value));
    pageChange(0);
  };

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, newpage: number) => {
    pageChange(newpage);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const obj = { id, title, name, description, price, priceVND, rating, region, img };
    if (isEdit) {
      updateTourMutation.mutate(obj);
      enqueueSnackbar('Edit successfully');
    } else {
      createTourMutation.mutate(obj);
      enqueueSnackbar('Create Tour successfully');
    }

    queryService.invalidateQueries({ queryKey: ['toursService.getTours'] });

    closePopup();
  };

  return (
    <div>
      <Paper sx={{ margin: '1%' }}>
        <div style={{ margin: '1%' }}>
          <Button onClick={functionAdd} variant='contained'>
            Add New (+)
          </Button>
        </div>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'midnightblue' }}>
                  {tours &&
                    Object.keys(tours?.[0]!).map((column, i) => (
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
                {tours &&
                  tours.slice(page * rowPerPage, page * rowPerPage + rowPerPage)?.map((tour, i) => {
                    return <RowData key={i} handleRemove={handleRemove} handleEdit={handleEdit} tour={tour} id={i} />;
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
          <span>{titleDialog}</span>
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
                value={title}
                required
                variant='outlined'
                label='Title'
                onChange={(e: any) => {
                  setTitle(e.target.value);
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
                value={priceVND}
                required
                variant='outlined'
                onChange={(e: any) => {
                  setPriceVND(e.target.value);
                }}
                label='Price VND'
              ></TextField>
              <TextField
                onChange={(e: any) => {
                  setRating(e.target.value);
                }}
                value={rating}
                required
                variant='outlined'
                label='Rating'
              ></TextField>
              <TextField
                onChange={(e: any) => {
                  setPrice(e.target.value);
                }}
                value={price}
                required
                variant='outlined'
                label='Price'
              ></TextField>
              <TextField
                onChange={(e: any) => {
                  setImg(e.target.value);
                }}
                value={img}
                required
                variant='outlined'
                label='Image'
              ></TextField>
              <TextField
                onChange={(e: any) => {
                  setRegion(e.target.value);
                }}
                value={region}
                required
                variant='outlined'
                label='Region'
              ></TextField>
              <TextField
                onChange={(e: any) => {
                  setDescription(e.target.value);
                }}
                value={description}
                required
                variant='outlined'
                label='Description'
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

export default Tours;
