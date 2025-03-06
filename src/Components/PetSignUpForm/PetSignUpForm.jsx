import * as Yup from 'yup';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import InputMask from 'react-input-mask';
import {Formik, Form, Field} from 'formik';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {registerNewPet} from '../../redux/pets/petsOperations';
import css from './PetSignUpForm.module.css';

dayjs.locale('uk');

const CustomField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#62684B',
  },
  '& label': {
    color: '#B5B5B5',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0C0D9',
      borderRadius: '6px',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#E0C0D9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D0A8C3',
      borderWidth: '2px',
    },
  },
});

const customCalendarTextFieldStyles = {
  '& label.Mui-focused': { 
    color: '#737958' 
  },
  '& label': { 
    color: '#B5B5B5' 
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FAFAFA',
    '& fieldset': { 
      borderColor: '#E0C0D9', 
      borderRadius: '6px', 
      borderWidth: '2px' 
    },
    '&:hover fieldset': { 
      borderColor: '#E0C0D9' 
    },
    '&.Mui-focused fieldset': { 
      borderColor: '#D0A8C3', 
      borderWidth: '2px' 
    },
    '& .MuiInputBase-input': {
      color: '#737958', 
    },
  },
};

const customDatePickerStyles = {
  '.MuiPaper-root': {
    backgroundColor: '#FAFAFA',
    borderRadius: '6px',
    border: '2px solid #E0C0D9',
    color: '#E0C0D9',
  },
  '.MuiPickersDay-root': { 
    backgroundColor: '#FAFAFA',
    color: '#737958' 
  },
  '.MuiPickersDay-today': { 
    border: '1px solid #E0C0D9',
  },
  '.MuiPickersDay-root.Mui-selected': { 
    backgroundColor: '#E0C0D9', 
    color: '#FAFAFA',
  },
  '.MuiPickersDay-root.Mui-selected:hover': { 
    backgroundColor: '#D0A8C3',
  },
  '.MuiPickersDay-root.Mui-selected:focus': { 
    backgroundColor: '#E0C0D9', 
    color: '#FAFAFA',
  },
  '.MuiPickersDay-root:hover': { 
    backgroundColor: '#E0C0D9',
    color: '#FAFAFA'  
  }
};

const customSelectStyles = {
  '.MuiOutlinedInput-root fieldset': {
    borderRadius: '6px',
    border: '2px solid #E0C0D9',
  },
  
  '.MuiOutlinedInput-root:hover fieldset': {
    borderColor: '#E0C0D9',
  },
  
  '.MuiOutlinedInput-root.Mui-focused fieldset': {
    borderColor: '#D0A8C3',
    borderWidth: '2px',
  },
  
  '.MuiInputLabel-root': {
    color: '#B5B5B5',
  },
  
  '.MuiInputLabel-root.Mui-focused': {
    color: '#737958',
  },
  
  '.MuiSelect-select': {
    backgroundColor: '#FAFAFA',
    color: '#737958',
  },
};

const PhoneInput = ({ field, form }) => {
  return (
    <InputMask
      mask="+38(099) 999-99-99"
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    >
      {(inputProps) => (
        <CustomField
          {...inputProps}
          {...field}
          label="Номер телефону"
          variant="outlined"
          fullWidth
          error={form.touched.phone && Boolean(form.errors.phone)}
          helperText={form.touched.phone && form.errors.phone}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#FAFAFA', 
              '& fieldset': {
              },
            },
            '& .MuiInputBase-input': {
              color: '#737958', 
            },
          }}
        />
      )}
    </InputMask>
  );
};

export default function PetSignUpForm() {

  const initialValues = {
    name: '',
    birthday: '',
    phone: '',
    gender: '',
    breed: '',
    color: '',
    telegram: '',
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
    name: Yup.string().min(2, 'Занадто коротке!').max(15, 'Занадто довге!').required("Ім`я улюбленця є бов`язковим").trim(),
    birthday: Yup.date()
    .typeError('Некоректна дата')
    .max(dayjs(), "Дата не може бути в майбутньому")
    .min(dayjs('2005-01-01'), "Дата народження має бути після 2005 року")
    .required("Дата народження є обов'язковою"),
    phone: Yup.string().matches(/^\+38\(0\d{2}\) \d{3}-\d{2}-\d{2}$/, "Некоректний номер").required("Номер телефону є обов`язковим"),
    gender: Yup.string().oneOf(['Хлопчик', 'Дівчинка']).required("Стать є обов'язковою"),
    breed: Yup.string().min(3, 'Занадто коротка!').required("Порода є обов'язковою").trim(),
    color: Yup.string().min(3, 'Занадто коротке!').required("Колір є обов'язковим").trim(),
    telegram: Yup.string().min(3, 'Занадто коротке!').required("Телеграм є обов'язковим").trim(),
  });

  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RegistrPetSchema}>
        {({ errors, touched, values, setFieldValue }) => (
          <Form className={css.form}>
            <Field name="name" >
              {({ field }) => (
                <CustomField
                  {...field}
                  label="Ім'я улюбленця"
                  placeholder= "Тюпа"
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FAFAFA', 
                      '& fieldset': {
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#737958', 
                    },
                  }}
                />
              )}
            </Field>
  
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
              <DatePicker
                label="Дата народження"
                value={values.birthday ? dayjs(values.birthday) : null}
                onChange={(value) => setFieldValue('birthday', value ? value : '')}
                disableFuture
                format="DD.MM.YYYY"
                localeText={{
                  fieldYearPlaceholder: () => "рррр",
                  fieldMonthPlaceholder: () => "мм",
                  fieldDayPlaceholder: () => "дд",
                }}
                slotProps={{
                  textField: { 
                    inputProps: { 
                      placeholder: values.birthday ? dayjs(values.birthday).format("DD.MM.YYYY") : "14.07.2020",
                     },
                    error: touched.birthday && Boolean(errors.birthday), 
                    helperText: touched.birthday && errors.birthday, 
                    fullWidth: true, variant: 'outlined', 
                    sx: customCalendarTextFieldStyles },
                  popper: { 
                    sx: customDatePickerStyles }
                   }}
              />
            </LocalizationProvider>
  
            <Field 
            name="phone" 
            component={PhoneInput}
            inputRef={(ref) => ref && ref.focus()}>
            </Field>
  
            <Field name="gender">
              {({ field, meta }) => (
                <FormControl 
                fullWidth 
                error={meta.touched && Boolean(meta.error)} 
                variant="outlined"
                sx={customSelectStyles}
                >
                  <InputLabel id="gender-label">Стать улюбленця</InputLabel>
                  <Select
                  {...field} 
                  labelId="gender-label" 
                  label="Стать улюбленця"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '6px',
                        border: '2px solid #E0C0D9',
                        color: '#737958'
                      }
                    },
                  }}
                  >
                    <MenuItem 
                    value="Хлопчик"
                    sx={{
                      borderBottom: '2px solid #E0C0D9',
                      margin: '0',
                      paddingTop: '0', 
                      '&:last-child': { borderBottom: 'none' }
                    }}
                    >
                      Хлопчик
                    </MenuItem>
                    <MenuItem 
                    value="Дівчинка"
                    sx={{
                      borderBottom: '2px solid #E0C0D9', 
                      margin: '0', 
                      paddingBottom: '0', 
                      '&:last-child': { borderBottom: 'none' }
                    }}
                    >
                      Дівчинка
                      </MenuItem>
                  </Select>
                  {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            </Field>
  
            <Field name="breed">
              {({ field }) => (
                <CustomField
                  {...field}
                  label="Порода улюбленця"
                  placeholder= "Англійський кокер-спаніель"
                  variant="outlined"
                  error={touched.breed && Boolean(errors.breed)}
                  helperText={touched.breed && errors.breed}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FAFAFA', 
                      '& fieldset': {
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#737958', 
                    },
                  }}
                />
              )}
            </Field>
  
            <Field name="color">
              {({ field }) => (
                <CustomField
                  {...field}
                  label="Забарвлення улюбленця"
                  placeholder= "Рудий"
                  variant="outlined"
                  error={touched.color && Boolean(errors.color)}
                  helperText={touched.color && errors.color}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FAFAFA', 
                      '& fieldset': {
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#737958', 
                    },
                  }}
                />
              )}
            </Field>
  
            <Field name="telegram">
              {({ field }) => (
                <CustomField
                  {...field}
                  label="Телеграм"
                  placeholder= "@tyupachka"
                  variant="outlined"
                  error={touched.telegram && Boolean(errors.telegram)}
                  helperText={touched.telegram && errors.telegram}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FAFAFA', 
                      '& fieldset': {
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#737958', 
                    },
                  }}
                />
              )}
            </Field>
  
            <button type="submit" className={css.petbutton}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    );
  }
