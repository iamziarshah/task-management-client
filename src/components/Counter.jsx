import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../store/slices/counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);

  const handleIncrementClick = () => {
    dispatch(increment());
  };
  const handleDecrementClick = () => {
    dispatch(decrement());
  };
  const handleResetClick = () => {
    dispatch(reset());
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={handleDecrementClick}>
          Decrement
        </Button>
        <Typography variant="h5" style={{ color: "black", fontWeight: "bold" }}>
          {counter}
        </Typography>
        <Button variant="contained" onClick={handleIncrementClick}>
          Increment
        </Button>
        <Button variant="outlined" onClick={handleResetClick}>
          Reset
        </Button>
      </Box>
    </>
  );
};

export default Counter;
