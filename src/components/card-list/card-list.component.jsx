import { Col, Row } from 'antd';
import React from 'react';
import CardItem from './card-item.component';
import "./card-list.styles.css";

const CardList = (props) => {

    return (
        props.cards.map(item => {
            return (
                <Row key={`${item.name}_${item.cvc}`} className="card-item-row">
                    <Col span={24}>
                        <CardItem {...item} />
                    </Col>
                </Row>
            );
        })
    );
}

export default CardList;