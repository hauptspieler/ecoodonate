import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Register = ({ history }) => {
    const handleSignUp = useCallback(async values => {
        const { email, password } = values;
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Title style={{ fontSize: '50px', color: '#1890ff' }}>EcoDonate</Title>
            <Form onFinish={handleSignUp} style={{ width: '300px' }}>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Sign Up</Button>
                </Form.Item>
            </Form>
            <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default withRouter(Register);
