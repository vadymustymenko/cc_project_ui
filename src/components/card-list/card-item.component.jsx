import React from 'react';
import Cards from 'react-credit-cards';

const CardItem = ({ cvc, expiry, name, number }) => {
    return (
        <div id="PaymentForm">
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused=""
                name={name}
                number={number}
            />
        </div>
    );
}

export default CardItem;