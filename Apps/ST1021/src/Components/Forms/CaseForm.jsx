import { Card } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ClinicalForm from "./Case/ClinicalForm";
import RegisterForm from "./Case/RegisterForm";

function CaseForm() {
  /*** Redux States ***/
  const dispatch = useDispatch();

  // Account Information
  const { Info } = useSelector((state) => state.Account["Info"]);

  // Case Creation State
  const { Loading, Success, Error } = useSelector((state) => state.Case["Create"]);

  /*** React Hook Form ***/
  const defaultValues = {
    patient: "",
    date_of_dispatch: null,
    date_of_acquisition: null,
    institution: "",
    personal_number: "",
    case_editor: "",
    case_consultants: "",
    clinical_interpretation: "",
  };

  /* React Hook Form - Form */
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    mode: "onChange",
  });

  const { register, handleSubmit, watch, setValue, formState, getValues, reset, trigger } = methods;
  console.log("Values:", getValues());

  return (
    <FormProvider {...methods}>
      <form>
        <RegisterForm />
        <ClinicalForm />
      </form>
    </FormProvider>
  );
}

export default CaseForm;
