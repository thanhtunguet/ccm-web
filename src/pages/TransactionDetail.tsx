import {Button, Col, Form, Input, Row, Select} from "antd";
import {AppRoute} from "src/config/app-route";
import {Transaction} from "src/models/Transaction";
import {transactionRepository} from "src/repositories/transaction-repository";
import {useDetails} from "src/services/use-details.ts";
import {useMaster} from "src/services/use-master.ts";
import {Card, Store} from "src/models";
import {cardRepository} from "src/repositories/card-repository.ts";
import {storeRepository} from "src/repositories/store-repository.ts";

const {Option} = Select;

const TransactionDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Transaction>(
    transactionRepository.get,
    transactionRepository.create,
    transactionRepository.update,
    AppRoute.TRANSACTION,
  );

  const [cards] = useMaster<Card>(
    cardRepository.list,
    cardRepository.count,
  );

  const [stores] = useMaster<Store>(
    storeRepository.list,
    storeRepository.count,
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleCreate}
    >
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
            name={nameof(Transaction.prototype.fee)}
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
