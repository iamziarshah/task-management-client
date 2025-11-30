import React from 'react';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import { useTaskStatistics } from '../hooks/tasks/useTaskStatistics';
import { useUpcomingTasks } from '../hooks/tasks/useUpcomingTasks';
import Loading from '../components/Common/Loading';
import ErrorAlert from '../components/Common/ErrorAlert';

const DashboardPage = () => {
  const { data: statistics, isLoading: statsLoading, error: statsError } = useTaskStatistics();
  const { data: upcomingTasks, isLoading: tasksLoading } = useUpcomingTasks();

  if (statsLoading) return <Loading />;
  if (statsError) return <ErrorAlert message="Failed to load statistics" />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Tasks
            </Typography>
            <Typography variant="h4">
              {statistics?.total || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary" gutterBottom>
              Completed
            </Typography>
            <Typography variant="h4" sx={{ color: 'success.main' }}>
              {statistics?.completed || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary" gutterBottom>
              In Progress
            </Typography>
            <Typography variant="h4" sx={{ color: 'info.main' }}>
              {statistics?.in_progress || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary" gutterBottom>
              Pending
            </Typography>
            <Typography variant="h4" sx={{ color: 'warning.main' }}>
              {statistics?.pending || 0}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upcoming Tasks
        </Typography>
        {tasksLoading ? (
          <Loading />
        ) : upcomingTasks && upcomingTasks.length > 0 ? (
          <Box>
            {upcomingTasks.map(task => (
              <Box key={task.id} sx={{ py: 1, borderBottom: '1px solid #eee' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {task.title}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography color="textSecondary">No upcoming tasks</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default DashboardPage;