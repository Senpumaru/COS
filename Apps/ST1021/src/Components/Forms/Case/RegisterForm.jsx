import { DatePicker } from "@material-ui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import PatientAutocomplete from "../../Fields/PatientAutocomplete";
import useDebounce from "../../Functions/useDebounce";
import SpecTextField from "../../TextField/SpecTextField";

const SERVER_URL = process.env.REACT_APP_API_SERVER;

async function findPatients({ queryKey: [_, term] }) {
  const response = await fetch(`${SERVER_URL}api/ST0001/patients?search=${term}`);
  const json = await response.json();
  const words = (json || []).map(({ word }) => word).sort();
  console.log("Words:", json);
  return words;
}

function RegisterForm() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid>
      
      <Typography color="primary" gutterBottom>
        <strong>Пациент</strong>
      </Typography>
      <Controller
        control={control}
        name="patient"
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <SpecTextField
            {...field}
            fullWidth
            key="Confirmation Code"
            id="Ambulatory ID-TextField"
            label="Личный номер"
            color="primary"
            error={errors.personal_number ? true : false}
            helperText={errors?.personal_number && errors.personal_number.message}
          />
        )}
      />
      <PatientAutocomplete control={control} />
    </Grid>
  );
}

export default RegisterForm;
