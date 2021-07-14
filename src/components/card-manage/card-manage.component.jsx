import React, { useState } from 'react';
import Cards from 'react-credit-cards';

import './card-manage.styles.css';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const CardManage = (props) => {
    const [paymentForm, setPaymentForm] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: ''
    });

    const [cardForm] = Form.useForm();

    const handleInputChange = (propName, propValue) => {
        setPaymentForm(prev => {
            return {
                ...prev,
                [propName]: propValue
            }
        });
    };

    const handleInputFocus = (propName) => {
        setPaymentForm(prev => {
            return {
                ...prev,
                focus: propName
            }
        });
    };

    const handleCardFormChange = (changedFields, allFields, isInitial) => {
        if (changedFields && changedFields[0] && changedFields[0].name) {
            const propName = changedFields[0].name[0];
            const propValue = changedFields[0].value;

            handleInputFocus(propName);
            handleInputChange(propName, propValue);
        }
    }

    const onCardSubmit = async () => {
        const fields = await cardForm.validateFields();

        await props.onCardAdded(fields);

        await cardForm.resetFields();
        setPaymentForm({
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: ''
        });

        notification["success"]({
            message: 'The Card is successfully added!'
        });
    }

    const getDefaultNumberValidationRule = (fieldLength, propName) => {
        return (_, value) => {
            return value && value.length === fieldLength ? Promise.resolve() : Promise.reject(new Error(`Provide a valid ${propName}!`));
        }
    }

    return (
        <>
            <Row className="card-form-row">
                <Col span={24}>
                    <div id="PaymentForm">
                        <Cards
                            cvc={paymentForm.cvc}
                            expiry={paymentForm.expiry}
                            focused={paymentForm.focus}
                            name={paymentForm.name}
                            number={paymentForm.number}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="card-form-row">
                <Col span={24}>
                    <Form form={cardForm} name="card-form" onFieldsChange={handleCardFormChange}>
                        <Form.Item
                            name="number"
                            rules={[{ validator: getDefaultNumberValidationRule(16, "card number") }]}
                        >
                            <Input placeholder="Card Number" type="number" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Holder Name" type="text" />
                        </Form.Item>
                        <Form.Item
                            name="cvc"
                            rules={[{ validator: getDefaultNumberValidationRule(3, "CVC") }]}
                        >
                            <Input placeholder="CVC" type="number" />
                        </Form.Item>
                        <Form.Item
                            name="expiry"
                            rules={[{ validator: getDefaultNumberValidationRule(4, "expiry date") }]}
                        >
                            <Input placeholder="Expiry" type="number" />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="card-form-row">
                <Col span={24}>
                    <Button onClick={onCardSubmit} size="large" shape="round" icon={<PlusCircleOutlined />}>Submit</Button>
                </Col>
            </Row>
        </>
    );
}

export default CardManage;