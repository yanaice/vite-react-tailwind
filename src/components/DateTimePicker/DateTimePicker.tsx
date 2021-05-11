import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import dayjs from 'dayjs'
import styled from 'styled-components'
import DayJsUtils from '@date-io/dayjs'
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#79BFAF',
      main: '#008387',
      dark: '#004848',
      contrastText: '#FFFFFF'
    },
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application!
    }
  }
});

const NativeDatepicker = require('native-datepicker/src/react')

interface Props {
  label: string | undefined
  name: string
  required?: boolean | undefined
}

const StyedDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    font-family: inherit;
  }
  input.MuiInputBase-input.MuiInput-input {
    font-size: 1.125rem;
    line-height: 1.2;
    outline: 2px solid transparent;
    outline-offset: 2px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.25rem;
    border-width: 1px;
  }
  .MuiInput-underline:before {
    font-size: 1.125rem;
    line-height: 1.2;
    outline: 2px solid transparent;
    outline-offset: 2px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;
    border-color: #e5e7eb;
  }
  .MuiInput-underline:after {
    border-bottom: none;
    border-color: #e5e7eb;
    transform: none;
    
  }
`
export const DatePickerField: React.FC<Props> = ({ label, name, required }) => {
  
  const { control, formState: { errors }  } = useFormContext()
  
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            console.log('field: ', field.value)
            return (<div className="mb-2">
              {label && <label className="mb-1 text-sm sm:text-sm tracking-wide text-gray-700">
                {label}{required ? '*' : ''}
              </label>}
              <StyedDatePicker
                autoOk
                clearable
                value={field.value || null}
                onChange={(date:any) => field.onChange(dayjs(date).format('YYYY-MM-DD'))}
                className="w-full"
                disableFuture
                views={["year", "month", "date"]}
                format="DD-MM-YYYY"
              />
              {/* <input type="date"
                {...field}
                value={field.value}
                className="text-sm sm:text-base py-1 px-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none w-full"/>
              <NativeDatepicker
                value={field.value}
              /> */}
              <p className="text-sm text-red-500">{_.get(errors, name)?.message}</p>
            </div>)
          }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}