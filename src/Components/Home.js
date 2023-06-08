import React, { useContext } from "react";
import { Button, Typography } from 'antd';
import { AuthContext } from './Auth/Auth';
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const HomePage = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await logout();
            history.push("/login");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Title style={{ fontSize: '50px', color: '#1890ff' }}>EcoDonate</Title>
            <Title level={2}>Welcome {currentUser.email}</Title>
            <Button type="primary" style={{ margin: '10px' }} onClick={() => history.push("/donations")}>Make a Donation</Button>
            <Button type="primary" style={{ margin: '10px' }} onClick={() => history.push("/mydonations")}>My Donations</Button>
            <Button type="primary" style={{ margin: '10px' }} onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default HomePage;
