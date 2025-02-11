import * as Yup from 'yup';
import dayjs from 'dayjs';
import {Formik, Form, Field} from 'formik';
import { TextField } from '@mui/material';
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
    birthday: null,
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
        loading:'Реєстрація триває...',
        success: 'Улюбленець успішно зареєстрований!',
        error: (error) => `Помилка реєстрації: ${error.message}`,
      }
    );

    petRegisterPromise
    .then(()=>{})
    .catch(()=>{})

    actions.resetForm();
  };

  const RegistrPetSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Заадто коротке!').max(15, 'Занадто довге!').required('Ім`я улюбленця є бов`язковим').trim(),
    birthday: Yup.date()
    .typeError('Некоректна дата')
    .max(dayjs(), 'Дата не може бути в майбутньому')
    .min(dayjs('2005-01-01'), 'Дата народження має бути після 2005 року')
    .required(`Дата народження є обов'язковою`),
    phone: Yup.string().matches(/^\d{10,12}$/, 'Номер має містити 10-12 цифр').required('Номер телефону є обов`язковим'),
    gender: Yup.string().oneOf(['Хлопчик', 'Дівчинка']).required(`Стать є обов'язковою`),
    breed: Yup.string().min(3, 'Занадто коротка!').required(`Порода є обов'язковою`).trim(),
    color: Yup.string().min(3, 'Занадто коротке!').required(`Колір є обов'язковим`).trim(),
    telegram: Yup.string().min(3, 'Занадто коротке!').required(`Телеграм є обов'язковим`).trim(),
  });

  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RegistrPetSchema}>
        {({ errors, touched, values, setFieldValue }) => (
          <Form className={css.form}>
            <Field name="name">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Ім'я улюбленця"
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              )}
            </Field>
  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Дата народження"
                value={values.birthday ? dayjs(values.birthday) : null}
                onChange={(value) => setFieldValue('birthday', value ? value.toISOString() : null)}
                disableFuture
                slotProps={{
                  textField: {
                    error: touched.birthday && Boolean(errors.birthday),
                    helperText: touched.birthday && errors.birthday,
                    fullWidth: true,
                    variant: 'outlined',
                  },
                }}
              />
            </LocalizationProvider>
  
            <Field name="phone">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Номер телефону"
                  variant="outlined"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              )}
            </Field>
  
            <Field name="gender">
              {({ field, meta }) => (
                <FormControl fullWidth error={meta.touched && Boolean(meta.error)} variant="outlined">
                  <InputLabel id="gender-label">Стать улюбленця</InputLabel>
                  <Select {...field} labelId="gender-label" label="Стать улюбленця">
                    <MenuItem value="Хлопчик">Хлопчик</MenuItem>
                    <MenuItem value="Дівчинка">Дівчинка</MenuItem>
                  </Select>
                  {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            </Field>
  
            <Field name="breed">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Порода улюбленця"
                  variant="outlined"
                  error={touched.breed && Boolean(errors.breed)}
                  helperText={touched.breed && errors.breed}
                />
              )}
            </Field>
  
            <Field name="color">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Забарвлення улюбленця"
                  variant="outlined"
                  error={touched.color && Boolean(errors.color)}
                  helperText={touched.color && errors.color}
                />
              )}
            </Field>
  
            <Field name="telegram">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Телеграм"
                  variant="outlined"
                  error={touched.telegram && Boolean(errors.telegram)}
                  helperText={touched.telegram && errors.telegram}
                />
              )}
            </Field>
  
            <button type="submit" className={css.button}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    );
  }
