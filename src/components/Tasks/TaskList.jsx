import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useDeleteTask } from "../../hooks/tasks/useDeleteTask";
import { useChangeTaskStatus } from "../../hooks/tasks/useChangeTaskStatus";
import { selectTask, openTaskForm } from "../../store/slices/uiSlice";

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTaskId, setMenuTaskId] = useState(null);
  const deleteTask = useDeleteTask();
  const changeStatus = useChangeTaskStatus();

  if (!tasks || tasks.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography align="center" color="textSecondary">
          No tasks found. Create your first task!
        </Typography>
      </Paper>
    );
  }

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleMenuOpen = (e, taskId) => {
    setAnchorEl(e.currentTarget);
    setMenuTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuTaskId(null);
  };

  const handleEdit = (task) => {
    dispatch(selectTask(task.id));
    dispatch(openTaskForm());
    handleMenuClose();
  };

  const handleDelete = (taskId) => {
    deleteTask.mutate(taskId);
    handleMenuClose();
  };

  const handleStatusChange = (taskId, status) => {
    changeStatus.mutate({ id: taskId, status });
    handleMenuClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "info";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedTasks.length > 0 &&
                  selectedTasks.length < tasks.length
                }
                checked={selectedTasks.length === tasks.length}
                onChange={(e) =>
                  setSelectedTasks(
                    e.target.checked ? tasks.map((t) => t.id) : []
                  )
                }
              />
            </TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              selected={selectedTasks.includes(task.id)}
              sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleSelectTask(task.id)}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {task.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {task.description?.substring(0, 50)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={task.status}
                  color={getStatusColor(task.status)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {task.due_date &&
                  formatDistanceToNow(new Date(task.due_date), {
                    addSuffix: true,
                  })}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, task.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => handleEdit(tasks.find((t) => t.id === menuTaskId))}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(menuTaskId, "in_progress")}>
          Start
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(menuTaskId, "completed")}>
          Complete
        </MenuItem>
        <MenuItem
          onClick={() => handleDelete(menuTaskId)}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default TaskList;
