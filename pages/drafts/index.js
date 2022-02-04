import styles from '../../styles/Drafts.module.scss'
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import Image from 'next/image';

export default function Drafts() {

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  const columns = [
    {
      cell: row => <Image width='40px' height='40px' src={'https://images-na.ssl-images-amazon.com/images/I/' + row.images.split(',')[0]}/>,
      grow: 0,
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
        wrap: true,
    },
    {
        button: true,
        cell: row => (
          <button className={['ant-btn ' + styles.import]} onClick={() => handleImport(row.id)}>Import</button>
        ),
    },
  ];

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      await fetch('/api/drafts')
      .then(response => response.json())
      .then(data => {
        setData(data.result)
      })   
    }

    fetchData();
  }, [])

  async function handleImport(id) {
    console.log(id)

    await fetch('/api/drafts/import/' + id)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    }) 
  }

  return (
    <main className='main'>   
      <div className={styles.cFZvyK}>
        <div className='ant-row'>
          <div className='ant-col ant-col-xl-12 ant-col-xxl-14'>
            <h2>Upload ({data.length}) </h2>
          </div>
        </div>
      </div>   
      <div className={styles.zrVas}>
        <DataTable
          pagination
          columns={columns}
          data={data}
          selectableRows
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </main>
  )
}
