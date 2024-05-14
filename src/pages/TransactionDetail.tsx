import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { AppRoute } from "src/config/app-route";
import { Card, Store } from "src/models";
import { Transaction } from "src/models/Transaction";
import { cardRepository } from "src/repositories/card-repository.ts";
import { storeRepository } from "src/repositories/store-repository.ts";
import { transactionRepository } from "src/repositories/transaction-repository";
import { useDetails } from "src/services/use-details.ts";
import { useMaster } from "src/services/use-master.ts";
import { useQuickCreate } from "src/services/use-quick-create";

const {Option} = Select;

const TransactionDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Transaction>(
    transactionRepository.get,
    transactionRepository.create,
    transactionRepository.update,
    AppRoute.TRANSACTION,
  );

  const [cards,,,handleRefreshCard] = useMaster<Card>(
    cardRepository.list,
    cardRepository.count,
  );

  const [stores, , , handleRefreshStore] = useMaster<Store>(
    storeRepository.list,
    storeRepository.count,
  );

  const [cardNumber, handleChangeCardNumber, handleCreateCard] = useQuickCreate<Card>(
    cardRepository.create,
    (value) =>  {
      const card = Card.create<Card>();
      card.number = value;
      return card;
    },
    handleRefreshCard,
  );

  const [storeName, handleChangeStoreName, handleCreateStore] = useQuickCreate<Store>(
    storeRepository.create,
    (value) =>  {
      const store = Store.create<Store>();
      store.code = value;
      return store;
    },
    handleRefreshStore,
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
            <Select 
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider className="my-2"/>
                  <Space className="my-1 mx-2 d-flex w-100">
                    <Input
                      placeholder="Please enter store TID"
                      value={storeName}
                      className="flex-grow-1 justify-content-start"
                      onChange={handleChangeStoreName}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="text" icon={<PlusOutlined/>} onClick={handleCreateStore}>
                                            Add store
                    </Button>
                  </Space>
                </>
              )}
            >
              {stores.map((store) => (<Option key={store.id} value={store.id}>{store.name} ({store.code})</Option>))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cardId"
            label="Card ID"
            rules={[{required: true, message: "Please select the card ID"}]}
          >
            <Select
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider className="my-2"/>
                  <Space className="my-1 mx-2 d-flex w-100">
                    <Input
                      placeholder="Please enter card number"
                      value={cardNumber}
                      className="flex-grow-1 justify-content-start"
                      onChange={handleChangeCardNumber}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="text" icon={<PlusOutlined/>} onClick={handleCreateCard}>
                                          Add card
                    </Button>
                  </Space>
                </>
              )}
            >
              {cards.map((card) => (<Option key={card.id} value={card.id}>{card.name ?? "Chưa có tên"} - {card.number}</Option>))}
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
