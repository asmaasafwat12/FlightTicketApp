import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlightTicket,
  deleteFlightTicket,
  getFlightTickets,
} from "../redux/flightTicketsSlice";
import { AppDispatch, RootState } from "../redux/store";
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Card,
  Stack,
  Box,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import withGuard from "../util/withGuard";
import { grey } from "@mui/material/colors";

const FlightTicketList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const flightTickets = useSelector((state: RootState) => state.flightTickets);
  const [selectedTicket, setSelectedTicket] = useState<FlightTicket | null>(
    null
  );
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getFlightTickets());
  }, [dispatch]);

  const handleDeleteClick = (ticket: FlightTicket) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTicket) {
      dispatch(deleteFlightTicket(selectedTicket.id));
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        textAlign="center"
        marginY={2}
        fontWeight="bold"
        color={grey[900]}
      >
        Flight Ticket List
      </Typography>
      <Stack spacing={2}>
        {flightTickets.data.map((ticket, index) => (
          <Card key={index}>
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <Button style={{ flex: 1 }}>
                <Link
                  to={`/flight-form/${ticket.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Flight Code
                  </Typography>
                  <Typography variant="h5" component="div">
                    {ticket.flightCode}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {`Date: ${ticket.date} `}
                  </Typography>
                  <Typography variant="body2">
                    {` Capacity: ${ticket.capacity}`}
                  </Typography>
                </Link>
              </Button>
              <IconButton onClick={() => handleDeleteClick(ticket)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this ticket?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default withGuard(FlightTicketList);
