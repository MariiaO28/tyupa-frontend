import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import { Box, TextField } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {registerNewPet} from '../../redux/pets/petsOperations';
import css from './PetSignUpForm.module.css';


export default function PetSignUpForm() {

  const initialValues = {
    name: "",
    birthday: "",
    phone: "",
    gender: "",
    breed: "",
    color: "",
    telegram: "",
  }
  
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const petRegisterPromise = dispatch(registerNewPet(values)).unwrap();

    toast.promise(
      petRegisterPromise, {
        loading:'Registration continues ...',
        success: `Pet registered succesfully!`,
        error: (error) => `Registration failed: ${error.message}`,
      }
    );

    petRegisterPromise
    .then(()=>{})
    .catch(()=>{})

    actions.resetForm();
  };

  const RegistrPetSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(15, 'Too long!').required().trim(),
    birthday: Yup.date().required('Birthday is required').typeError('Invalid date format').max(new Date(), "Birthday cannot be in the future"),
    phone: Yup.string().matches(/^\d{10,12}$/, 'Phone number must be between 10 and 12 digits').required(),
    gender: Yup.string().oneOf(['Хлопчик', 'Дівчинка']).required('Gender is required'),
    breed: Yup.string().min(5, 'Too Short!').required('Breed is required').trim(),
    color: Yup.string().min(3, 'Too Short!').required('Color is required').trim(),
    telegram: Yup.string().min(1, 'Too Short!').required('Telegram is required').trim(),
  })

  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={RegistrPetSchema}
    >
      {({errors, touched}) => (
        <Form className={css.form}>
          <Box
            sx={{
              '& .MuiTextField-root': {m:1, width: '29ch'},
            }}
            noValidate
            autoComplete = 'off'
          />
            <Field name='name'>
              {({field}) => (
                <TextField
                   {...field}
                   id="outlined-username"
                   label="Ім'я улюбленця"
                   variant="outlined"
                   error={touched.name && Boolean(errors.name)}
                   helperText={touched.name && errors.name}
                />
              )}
            </Field>
          <Box
            sx={{
            '& .MuiTextField-root': { m: 1, width: '29ch' },
            }}
            noValidate
            autoComplete="off"
          />
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Field name="birthday">
             {({ field, form }) => (
                <DatePicker
                   {...field}
                   label="Дата народження улюбленця"
                   inputFormat="DD/MM/YYYY"
                   value={field.value || null}
                   onChange={(value) => form.setFieldValue('birthday', value)}
                   renderInput={(params) => (
                     <TextField
                      {...params}
                      error={form.touched.birthday && Boolean(form.errors.birthday)}
                      helperText={form.touched.birthday && form.errors.birthday}
                      fullWidth
                      variant="outlined"
                     />
                    )}
                />
              )}
             </Field>
            </LocalizationProvider>
            <Box
            sx={{
              '& .MuiTextFiels-root': {m:1, width: '29ch'},
            }}
            noValidate
            autoComplete = 'off'
          />
            <Field name='phone'>
              {({field}) => (
                <TextField
                   {...field}
                   id="outlined-phone"
                   label="Номер телефону"
                   variant="outlined"
                   error={touched.phone && Boolean(errors.phone)}
                   helperText={touched.phone && errors.phone}
                />
              )}
            </Field>
            <Box
            sx={{
            '& .MuiTextField-root': { m: 1, width: '29ch' },
            }}
            noValidate
            autoComplete="off"
           />
            <Field name="gender">
             {({ field, meta }) => (
               <FormControl
                  fullWidth
                  error={meta.touched && Boolean(meta.error)}
                  variant="outlined"
               >
               <InputLabel id="gender-label">Стать улюбленця</InputLabel>
               <Select
                   {...field}
                   id="outlined-gender"
                   labelId="gender-label"
                   label="Стать улюбленця"
                   >
                  <MenuItem value="Хлопчик">Хлопчик</MenuItem>
                  <MenuItem value="Дівчинка">Дівчинка</MenuItem>
               </Select>
                  {meta.touched && meta.error && (
               <FormHelperText>{meta.error}</FormHelperText>
              )}
              </FormControl>
            )}
           </Field>
            <Box
            sx={{
              '& .MuiTextFiels-root': {m:1, width: '29ch'},
            }}
            noValidate
            autoComplete = 'off'
          />
            <Field name='breed'>
              {({field}) => (
                <TextField
                   {...field}
                   id="outlined-breed"
                   label="Порода улюбленця"
                   variant="outlined"
                   error={touched.breed && Boolean(errors.breed)}
                   helperText={touched.breed && errors.breed}
                />
              )}
            </Field>
            <Box
            sx={{
              '& .MuiTextFiels-root': {m:1, width: '29ch'},
            }}
            noValidate
            autoComplete = 'off'
          />
            <Field name='color'>
              {({field}) => (
                <TextField
                   {...field}
                   id="outlined-color"
                   label="Забарвлення улюбленця"
                   variant="outlined"
                   error={touched.color && Boolean(errors.color)}
                   helperText={touched.color && errors.color}
                />
              )}
            </Field>
            <Box
            sx={{
              '& .MuiTextFiels-root': {m:1, width: '29ch'},
            }}
            noValidate
            autoComplete = 'off'
          />
            <Field name='telegram'>
              {({field}) => (
                <TextField
                   {...field}
                   id="outlined-telegram"
                   label="Телеграм"
                   variant="outlined"
                   error={touched.telegram && Boolean(errors.telegram)}
                   helperText={touched.telegram && errors.telegram}
                />
              )}
            </Field>
            <button type="submit" className={css.button}>Зберегти</button>
        </Form>
      )
      }
    </Formik>
  );
}
