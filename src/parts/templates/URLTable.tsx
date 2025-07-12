
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
        <div className=" p-16 pt-4 flex flex-col gap-4">
            <h2 className="text-2xl mb-4">URLs to crawl</h2>
            <DataTable value={urls} stripedRows tableStyle={{ minWidth: '20rem' }} >
                <Column field="url" header="Link" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="status" header="Status" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="action" header="Action" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light"
                    body={({ status }) => (
                        <div className="flex gap-2">
                            {status === 'queued' && <Button text label="Start" icon="pi pi-play" className='text-text'/>}
                            {status === 'processing' && <Button text label="Stop" icon="pi pi-stop" className='text-text'/>}
                            {status === 'failed' && <Button text label="Retry" icon="pi pi-refresh" className='text-text'/>}
                        </div>
                    )} />
            </DataTable>
        </div>
    )
}

export default URLTable