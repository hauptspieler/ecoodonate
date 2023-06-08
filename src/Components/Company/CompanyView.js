import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, deleteDoc, query } from "firebase/firestore";
import { db } from "../firebase";
import { Table, Typography, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const { Title, Text } = Typography;

function CompanyView() {
    const [donations, setDonations] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "donations"));
        setDonations(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "donations", id));
        fetchData();
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Donation Type',
            dataIndex: 'donation',
            key: 'donation',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm title="Are you sure to delete this donation?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
                        <Button type="primary" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Title style={{ fontSize: '50px', color: '#1890ff' }}>EcoDonate<Text style={{ fontSize: '20px', color: 'red' }}> Admin Panel</Text></Title>
            <Title level={2}>Donations View </Title>
            <Table dataSource={donations} columns={columns} rowKey="id" />
            <Button type="primary" onClick={() => history.push("/")}>Back to Home</Button>
        </div>
    );
}

export default CompanyView;
