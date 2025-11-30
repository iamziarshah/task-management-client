import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { deleteTodo, addTodo } from "../store/slices/todoSlice";
import { useState } from "react";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [todoText, setTodoText] = useState("");
  return (
    <>
      <Box mt={4}>
        <Box display="flex" gap={1} mb={2}>
          <TextField
            size="small"
            sx={{ flexGrow: 1 }}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <Button
            size="small"
            variant="contained"
            onClick={() => dispatch(addTodo({ text: todoText }))}
          >
            Add Todo
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Todo</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        dispatch(deleteTodo(row.id));
                        setTodoText("");
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Todos;
