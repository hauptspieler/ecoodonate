import React, { useCallback, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Auth/Auth";
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const SignIn = ({ history }) => {
    const handleLogin = useCallback(
        async values => {
            const { email, password } = values;
            try {
                await signInWithEmailAndPassword(getAuth(), email, password);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Title style={{ fontSize: '50px', color: '#1890ff' }}>EcoDonate</Title> {/* Aqui está o logo de texto */}
            <Form onFinish={handleLogin} style={{ width: '300px' }}>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Sign In</Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/register">First time? Register Here!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default withRouter(SignIn);
