
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


type URLTableProps = {
    urls: {
        url: string;
        status: 'queued' | 'processing' | 'completed' | 'failed';
    }[];
};

const URLTable = ({ urls }: URLTableProps) => {
    return (
        <div className="border-border border-[16px] p-16 pt-4 flex flex-col gap-4">
            <h2 className="text-2xl mb-4">URLs to crawl</h2>
            <DataTable value={urls} stripedRows tableStyle={{ minWidth: '50rem' }} >
                <Column field="url" header="Link" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />                
                <Column field="status" header="Status" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="action" header="Action" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light"
                    body={({ status }) => (
                        <div className="flex gap-2">
                            <Button label="Retry" icon="pi pi-refresh" className="p-button-sm" disabled={status !== 'failed'} />
                            <Button label="Delete" icon="pi pi-trash" className="p-button-sm" />
                        </div>
                    )} />
            </DataTable>
        </div>
    )
}

export default URLTable