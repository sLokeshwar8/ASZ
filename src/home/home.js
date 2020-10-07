import React from 'react';

import Users from '../users/users';
import Todo from '../todo/todo';
import { Tabs } from 'antd';
import { Row, Col } from 'antd';
const { TabPane } = Tabs;

const Home = () => {
    function callback(key) {
        console.log(key);
    }
    return (
        <div style={{margin : 40}}>
            <Row>
                <Col span={24}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Todos" key="1">
                            <Todo/>
                        </TabPane>
                        <TabPane tab="Users" key="2">
                            <Users/>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
}

export default Home