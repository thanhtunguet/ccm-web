import {Button, Col, Form, Input, notification, Row, Select} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "src/config/app-route";
import {Card} from "src/models/Card";
import {Store} from "src/models/Store";
import {Transaction} from "src/models/Transaction";
import {cardRepository} from "src/repositories/card-repository";
import {storeRepository} from "src/repositories/store-repository";
import {transactionRepository} from "src/repositories/transaction-repository";
import {useMaster} from "src/services/use-master.ts";
import {SmileOutlined} from "@ant-design/icons";

const {Option} = Select;

const TransactionDetail = () => {
  const [form] = Form.useForm<Transaction>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = React.useCallback((message: string) => {
    api.open({
      message: "Notification",
      description: message,
      icon: <SmileOutlined style={{color: "#108ee9"}}/>,
    });
  }, [api]);

  const [cards] = useMaster<Card>(
    cardRepository.list,
    cardRepository.count,
  );

  const [stores] = useMaster<Store>(
    storeRepository.list,
    storeRepository.count,
  );

  const onFinish = (values: Transaction) => {
    setIsLoading(true);
    transactionRepository.create(values)
      .pipe()
      .subscribe({
        next() {
          navigate(AppRoute.TRANSACTION);
          openNotification("Transaction created");
        },
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {contextHolder}
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Code"
            rules={[{required: true, message: "Please enter the code"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={12}>

        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="storeId"
            label="Store"
            rules={[{required: true, message: "Please select the store"}]}
          >
            <Select>
              {stores.map((store) => (<Option key={store.id} value={store.id}>{store.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cardId"
            label="Card ID"
            rules={[{required: true, message: "Please select the card ID"}]}
          >
            <Select>
              {cards.map((card) => (<Option key={card.id} value={card.id}>{card.name}</Option>))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{required: true, message: "Please enter the amount"}]}
          >
            <Input type="number" step="0.01"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={nameof(Transaction.prototype.transactionFee)}
            label="Fee"
            rules={[{required: true, message: "Please enter the fee"}]}
          >
            <Input type="number" step="0.01"/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionDetail;
