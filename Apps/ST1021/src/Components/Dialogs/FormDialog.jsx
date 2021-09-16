import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import CaseForm from "../Forms/CaseForm";

function FormDialog({ isDialogOpened, handleCloseDialog, content }) {
  const handleClose = () => {
    handleCloseDialog(false);
  };

  return (
    <Dialog open={isDialogOpened}>
      <DialogTitle>Форма регистрации</DialogTitle>
      <DialogContent>
          {content}
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
