import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Form, Input, Button, Typography } from 'antd';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../Auth/Auth';

const { Title } = Typography;

function UserDonation() {
    const [message, setMessage] = useState('');
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        try {
            values.email = currentUser.email;
            const docRef = await addDoc(collection(db, "donations"), values);
            setMessage("Donation submitted successfully!");
            history.push("/mydonations");
        } catch (e) {
            console.error("Error adding document: ", e);
            setMessage("Failed to submit the donation.");
        }
    }

    const handleHome = () => {
        history.push("/");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Title style={{ fontSize: '50px', color: '#1890ff' }}>EcoDonate</Title>
            <Title level={2}>User Donation Page</Title>
            <Form onFinish={onFinish} style={{ width: '300px' }}>
                <Form.Item name="name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                    <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
                    <Input placeholder="Address" />
                </Form.Item>
                <Form.Item name="donation" rules={[{ required: true, message: 'Please input your donation type!' }]}>
                    <Input placeholder="Donation Type" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            <p>{message}</p>
            <Button type="primary" style={{ margin: '10px' }} onClick={handleHome}>Back to Home</Button>
        </div>
    );
}

export default UserDonation;
