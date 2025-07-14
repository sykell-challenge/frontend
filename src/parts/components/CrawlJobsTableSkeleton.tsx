import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CrawlJobsTable: React.FC = () => {
  const skeletonTemplate = () => {
    return <Skeleton />;
  };

  const jobs = Array.from({ length: 4 }, () => ({}));

  return (
    <div className="w-full">
      <TableContainer
        component={Paper}
        sx={{ minWidth: 650 }}
        aria-label="crawl jobs table"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((_, jobIndex) => (
              <TableRow
                key={jobIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{skeletonTemplate()}</TableCell>
                <TableCell>{skeletonTemplate()}</TableCell>
                <TableCell>{skeletonTemplate()}</TableCell>
                <TableCell>{skeletonTemplate()}</TableCell>
                <TableCell>{skeletonTemplate()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CrawlJobsTable;
