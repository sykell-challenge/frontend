
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import type { Link, } from '../../types';

type LinksTableProps = {
    links: Link[];
};

const columns: GridColDef[] = [
    { field: 'link', headerName: 'Link', flex: 1 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'status', headerName: 'Status Code', width: 150 },
];
const paginationModel = { page: 0, pageSize: 5 };

const LinksTable = ({ links }: LinksTableProps) => {

    return (

        <DataGrid
            label='Links Table'
            rows={links.map((link, index) => ({
                id: index,
                ...link
            }))}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            autoPageSize
        />

    )
}

export default LinksTable