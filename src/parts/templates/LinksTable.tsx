
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { Link, } from '../../types';

type LinksTableProps = {
    links: Link[];
};

const LinksTable = ({ links }: LinksTableProps) => {
    return (
        <div className="p-4 flex flex-col gap-4">
            <h2 className="text-2xl">Links</h2>

           
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Link</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {links.map(({ link, status, type }, linkIndex) => (
                            <TableRow
                                key={linkIndex}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{link}</TableCell>
                                <TableCell>{status}</TableCell>
                                <TableCell>{type}</TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default LinksTable