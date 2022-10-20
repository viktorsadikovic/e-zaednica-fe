import React from "react";
import {
  Dialog,
  dialogClasses,
  styled,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import colors from '../../utils/colors';
import { Button } from '../Button';

export default function CustomModal({
  id,
  dialogTitle,
  dialogText,
  dialogContent,
  confirmButtonText,
  cancelButtonText,
  actionsContent,
  open,
  onClose,
  onConfirm,
}) {
  const StyledDialog = styled(Dialog)(() => ({
    [`& .${dialogClasses.paper}`]: {
      border: "none",
      borderRadius: "0.5rem",
      boxShadow: "0px 0px 44px rgba(0, 94, 124, 0.15)",
    },
  }));

  return (
    <StyledDialog
      open={open}
      sx={{
        minWidth: { xs: "80%", md: "37.5rem" },
        minHeight: { xs: "auto", md: "17.312rem" },
      }}
      onClose={onClose}
    >
      <DialogTitle
        sx={(theme) => ({
          padding: theme.spacing(0.8),
          backgroundColor: colors.primary.main,
          color: colors.white,
        })}
        data-testid="dialog-title"
      >
        {dialogTitle}
      </DialogTitle>
      {dialogText && (
        <DialogContentText
          data-testid="dialog-text"
          sx={(theme) => ({ padding: theme.spacing(1) })}
        >
          {dialogText}
        </DialogContentText>
      )}
      <DialogContent data-testid="dialog-content-text">
        {dialogContent}
      </DialogContent>
      <DialogActions data-testid="dialog-actions">
        {actionsContent || (
          <>
            <Button
              sx={{
                typography: { xs: "body2Bold", md: "h4Medium" },
              }}
              variant="contained"
              color="info"
              fullWidth
              onClick={onClose}
              data-testid="cancel-button"
            >
              {cancelButtonText || "CANCEL"}
            </Button>
            <Button
              sx={(theme) => ({
                typography: { xs: "body2Bold", md: "h4Medium" },
                backgroundColor: colors.secondary.main,
                marginX: theme.spacing(1),
              })}
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => {
                if (onConfirm) {
                  onConfirm(id || "");
                  onClose();
                }
                onClose();
              }}
              data-testid="confirm-button"
            >
              {confirmButtonText || "CONFIRM"}
            </Button>
          </>
        )}
      </DialogActions>
    </StyledDialog>
  );
}
