
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Tag } from '../types';
import { Chart } from 'primereact/chart';

type WebsitesTableProps = {
    websites: {
        title: string;
        html: string;
        internalUrlCount: number;
        externalUrlCount: number;
        brokenUrlCount: number;
        loginFormPresent: boolean;
        tags: Tag[];
    }[];
};

const WebsitesTable = ({ websites }: WebsitesTableProps) => {
    return (
        <div className="border-border border-[16px] p-16 pt-4 flex flex-col gap-4">
            <h2 className="text-2xl mb-4">Crawled Websites</h2>

            <DataTable value={websites} stripedRows tableStyle={{ minWidth: '50rem' }} >
                <Column field="title" header="Title" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="internalUrlCount" header="Internal URLs" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="externalUrlCount" header="External URLs" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="brokenUrlCount" header="Broken URLs" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light" />
                <Column field="loginFormPresent" header="Login Form Present" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light"
                    body={(rowData) => rowData.loginFormPresent ? 'Yes' : 'No'} />
                 <Column field="_" header="URL Distribution" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light"
                    body={({internalUrlCount, externalUrlCount, brokenUrlCount}) => (
                        <Chart type="pie" data={{
                              labels: ['Internal', 'External', 'Broken'],
                              datasets: [{
                                data: [internalUrlCount, externalUrlCount, brokenUrlCount],
                                backgroundColor: ['#358C84', '#205B73', '#307B8C']
                              }]
                            }} options={{
                                plugins:{
                                    legend:{
                                        display:false,                
                                    }
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                                layout: {
                                    padding: 20
                                }
                            }} style={{ width: '75px', height: '75px' }} />
                    )} />

                <Column field="tags" header="Tags" headerClassName="bg-border text-text" bodyClassName="text-text bg-border-light"
                    body={({tags}: {tags: Tag[]}) => (
                        <div className="flex flex-wrap gap-2">
                            <Chart type="pie" data={{
                                labels: tags.map(tag => tag.name),
                                datasets: [{
                                    data: tags.map(tag => tag.count),
                                    backgroundColor: tags.map(tag => tag.color)
                                }]
                            }} options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                                layout: {
                                    padding: 20
                                }
                            }} style={{ width: '75px', height: '75px' }} />
                        </div>
                    )} />
            </DataTable>
        </div>
    )
}

export default WebsitesTable