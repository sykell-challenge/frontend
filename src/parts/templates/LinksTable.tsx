
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Link, } from '../../types';

type LinksTableProps = {
    links: Link[];
};

const LinksTable = ({ links }: LinksTableProps) => {
    return (
        <div className="p-4 flex flex-col gap-4">
            <h2 className="text-2xl">Links</h2>

            <DataTable value={links} stripedRows tableStyle={{ minWidth: '20rem' }} >
                <Column field="link" header="Link" headerClassName="" bodyClassName="" 
                body={({link}) => (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {link}
                    </a>
                )}
                />
                <Column field="type" header="Type"  />
                <Column field="status" header="Status" />
            </DataTable>
        </div>
    )
}

export default LinksTable