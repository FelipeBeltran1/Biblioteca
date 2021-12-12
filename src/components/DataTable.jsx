import React, { useState, useEffect } from 'react'
import { Button, Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Modal from './Modal';
import ExportToExcel from './ExportToExcel';
const DataTable = () => {
    const [books, setBooks] = useState([]);
    const fileName = "Books";

    const getBooks = async () => {
        await fetch('https://api.itbook.store/1.0/new')
            .then(response => response.json())
            .then(data => setBooks(data.books.map(row => ({
                Title: row.title,
                Subtitle: row.subtitle,
                Isbn13: row.isbn13,
                Price: row.price,
                Image: row.image,
                Url: row.url,
            }))))
    };

    useEffect(() => {
        getBooks();
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState("");

    const openModal = (url) => {
        console.log("ur", url)
        setIsOpen(true)
        setUrl(url)
    };
    const closeModal = () => setIsOpen(false);



    const columns = [
        {
            title: 'Title',
            dataIndex: 'Title',
            key: 'title',

            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Search title"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}>
                        </Input>
                        <Button onClick={() => {
                            confirm();
                        }} type="primary">Search</Button>
                        <Button onClick={() => {
                            clearFilters();
                        }} type="danger">Reset</Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.Title.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Subtitle',
            dataIndex: 'Subtitle',
            key: 'subtitle',
        },
        {
            title: 'Isbn13',
            dataIndex: 'Isbn13',
            key: 'isbn13',
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'Image',
            key: 'image',
            render: fila =><a type="text" onClick={()=>openModal(fila)}>{fila}</a>
        },
        {
            title: 'Url',
            dataIndex: 'Url',
            key: 'url',
        },
    ];

    return (
        <div>
            <Modal 
                isOpen={isOpen}
                closeModal={closeModal} 
                url={url}>
            </Modal>
            <ExportToExcel apiData={books} fileName={fileName}/>
            <Table
                bordered
                size="middle"
                style={{ display: 'flex', flex: 1, margin: 10 }}
                columns={columns}
                dataSource={books}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20'] }}
            />
        </div>
    )
}

export default DataTable
