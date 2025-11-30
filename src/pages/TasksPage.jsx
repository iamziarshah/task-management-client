import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { useTasks } from "../hooks/tasks/useTasks";
import { openTaskForm } from "../store/slices/uiSlice";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import Loading from "../components/Common/Loading";
import ErrorAlert from "../components/Common/ErrorAlert";

const TasksPage = () => {
  const dispatch = useDispatch();
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <Loading />;
  if (error) return <ErrorAlert message="Failed to load tasks" />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => dispatch(openTaskForm())}
        >
          New Task
        </Button>
      </Box>

      <TaskList tasks={tasks} />
      <TaskForm open={false} onClose={() => {}} />
    </Container>
  );
};

export default TasksPage;
