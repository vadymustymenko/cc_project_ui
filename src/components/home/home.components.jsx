import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import CardList from '../card-list/card-list.component';
import CardManage from '../card-manage/card-manage.component';
import CardsService from '../../services/cards.service';

const Home = (props) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onCardAdded = async (newCard) => {
        setIsLoading(true);

        await CardsService.insert({
            holderName: newCard.name,
            cardNumber: newCard.number,
            expiry: newCard.expiry,
            cvc: newCard.cvc
        });

        const cards = await CardsService.getAll();

        setCards(cards.data.data.map(item => {
            return {
                number: item.cardNumber,
                name: item.holderName,
                expiry: item.expiry,
                cvc: item.cvc
            };
        }));

        setIsLoading(false);
    };

    useEffect(async () => {
        const cards = await CardsService.getAll();

        setCards(cards.data.data.map(item => {
            return {
                number: item.cardNumber,
                name: item.holderName,
                expiry: item.expiry,
                cvc: item.cvc
            };
        }));
    }, [])

    return (
        isLoading ? (
            <div className="loader-location">
                <Spin />
            </div>
        ) : (
            <Row className="card-manage-layout">
                <Col offset={5} span={7}>
                    <CardManage onCardAdded={onCardAdded} />
                </Col>
                <Col span={7}>
                    <CardList cards={cards} />
                </Col>
            </Row>
        )

    )
}

export default Home;