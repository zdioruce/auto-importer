import styles from '../../styles/Drafts.module.scss'
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import Link from 'next/link'

export default function Products() {

  const columns = [
    {
      cell: row => (
        <a href={'/products/' + row.id}>
          <Image width='40px' height='40px' src={'https://images-na.ssl-images-amazon.com/images/I/' + row.images.split(',')[0]}/>
        </a>        
      ),
      grow: 0,
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
        wrap: true,
    },    
  ];

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      await fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setData(data.result)
      })   
    }

    fetchData();
  }, [])

  return (
    <main className='main'>   
      <div className={styles.cFZvyK}>
        <div className='ant-row'>
          <div className='ant-col ant-col-xl-12 ant-col-xxl-14'>
            <h2>Products ({data.length}) </h2>
          </div>
        </div>
      </div>   
      <div className={styles.zrVas}>
        <DataTable
          pagination
          columns={columns}
          data={data}
          selectableRows
        />
      </div>
    </main>
  )
}
