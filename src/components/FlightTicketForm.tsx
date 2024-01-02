import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFlightTicket,
  updateFlightTicket,
} from "../redux/flightTicketsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import withGuard from "../util/withGuard";

type FlightTicketFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

type Fields = "flightCode" | "date" | "capacity";

type FlightTicketData = {
  flightCode: string;
  date: Date;
  capacity: number;
};

const schema = yup.object().shape({
  flightCode: yup.string().required("Flight code is required"),
  date: yup
    .date()
    .required("Date is required")
    .min(new Date(), "Date must be in the future"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number"),
});

const FlightTicketForm: React.FC<FlightTicketFormProps> = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { data: flightTicketsData } = useSelector(
    (state: RootState) => state.flightTickets
  );
  const navigate = useNavigate();

  const preFillFormWithData = ({
    flightCode,
    date,
    capacity,
  }: FlightTicketData) => {
    setValue("flightCode", flightCode);
    setValue("date", date);
    setValue("capacity", capacity);
  };

  const getFieldLabel = (field: Fields): string => {
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  useEffect(() => {
    if (id) {
      const ticket = flightTicketsData.find(
        (ticket) => ticket.id === Number(id)
      );
      ticket && preFillFormWithData(ticket);
    } else {
      reset();
    }
  }, [id, flightTicketsData, setValue, reset]);

  const handleOnSubmit = (values) => {
    const formattedDate = new Date(values.date).toISOString().split("T")[0];
    const formattedValues = { ...values, date: formattedDate };

    id
      ? dispatch(updateFlightTicket({ id: Number(id), ...formattedValues }))
      : dispatch(addNewFlightTicket(formattedValues));

    reset();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={2}>
        {(["flightCode", "date", "capacity"] as Fields[]).map((field) => (
          <Grid item xs={12} key={field}>
            <TextField
              {...register(field)}
              label={getFieldLabel(field)}
              type={
                field === "date"
                  ? "date"
                  : field === "capacity"
                  ? "number"
                  : "text"
              }
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors[field]}
              helperText={errors[field]?.message}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withGuard(FlightTicketForm);
