import { Col, Row } from 'antd';
import React, { useState } from 'react';
import CardList from '../card-list/card-list.component';
import CardManage from '../card-manage/card-manage.component';

const Home = (props) => {
    const [cards, setCards] = useState([]);

    const onCardAdded = (newCard) => {
        setCards(prev => {
            return [newCard, ...prev];
        });
    };

    return (
        <Row className="card-manage-layout">
            <Col offset={5} span={7}>
                <CardManage onCardAdded={onCardAdded} />
            </Col>
            <Col span={7}>
                <CardList cards={cards} />
            </Col>
        </Row>
    )
}

export default Home;