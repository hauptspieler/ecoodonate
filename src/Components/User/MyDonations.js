import React, { useEffect, useState, useContext } from "react";
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Table, Typography, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../Auth/Auth';

const { Title } = Typography;

function MyDonations() {
    const [donations, setDonations] = useState([]);
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const fetchData = async () => {
        const q = query(collection(db, "donations"), where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        console.log(data);
        setDonations(data);
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
            <Title style={{ fontSize: '50px', color: '#1890ff' }}>EcoDonate</Title>
            <Title level={2}>My Donations Page</Title>
            <Table dataSource={donations} columns={columns} rowKey="id" />
            <Button type="primary" onClick={() => history.push("/")}>Back to Home</Button>
        </div>
    );
}

export default MyDonations;
