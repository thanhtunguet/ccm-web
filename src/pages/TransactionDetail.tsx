import {PlusOutlined} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from 'antd';
import React from 'react';
import {AppRoute} from 'src/config/app-route';
import {Card, Store, TransactionStatus} from 'src/models';
import {CardFilter} from 'src/models/Card';
import {StoreFilter} from 'src/models/Store';
import {Transaction} from 'src/models/Transaction';
import {cardRepository} from 'src/repositories/card-repository.ts';
import {storeRepository} from 'src/repositories/store-repository.ts';
import {transactionRepository} from 'src/repositories/transaction-repository';
import {useDetails} from 'src/services/use-details.ts';
import {useMaster} from 'src/services/use-master.ts';
import {useQuickCreate} from 'src/services/use-quick-create';

const {Option} = Select;

const TransactionDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Transaction>(
    transactionRepository.get,
    transactionRepository.create,
    transactionRepository.update,
    AppRoute.TRANSACTION,
  );

  const [cards, , , handleRefreshCard] = useMaster<Card, CardFilter>(
    cardRepository.list,
    cardRepository.count,
    {
      ...new CardFilter(),
      take: 10000,
    },
  );

  const [stores, , , handleRefreshStore] = useMaster<Store, StoreFilter>(
    storeRepository.list,
    storeRepository.count,
    {
      ...new StoreFilter(),
      take: 10000,
    },
  );

  const [cardNumber, handleChangeCardNumber, handleCreateCard] =
    useQuickCreate<Card>(
      cardRepository.create,
      (value) => {
        const card = Card.create<Card>();
        card.number = value;
        return card;
      },
      handleRefreshCard,
    );

  const [storeName, handleChangeStoreName, handleCreateStore] =
    useQuickCreate<Store>(
      storeRepository.create,
      (value) => {
        const store = Store.create<Store>();
        store.code = value;
        return store;
      },
      handleRefreshStore,
    );

  const handleRecalculateFee = React.useCallback(
    (
      _:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLElement>
        | null
        | undefined,
    ) => {
      const amount = form.getFieldValue(nameof(Transaction.prototype.amount));
      const fee = form.getFieldValue(nameof(Transaction.prototype.fee));

      const selectedStoreId = form.getFieldValue(
        nameof(Transaction.prototype.storeId),
      );
      const selectedStore = stores.find(
        (store) => store.id === selectedStoreId,
      );

      if (selectedStore != null) {
        const posFeeRate = selectedStore.fee ?? 0;
        const posFee = (amount * posFeeRate) / 100;
        const profit = amount - posFee - fee;
        form.setFieldValue(nameof(Transaction.prototype.posFee), posFee);
        form.setFieldValue(nameof(Transaction.prototype.profit), profit);
      }
    },
    [form, stores],
  );

  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        onFinish={handleCreate}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="code"
              label="Mã GD"
              rules={[{required: true, message: 'Vui lòng nhập mã'}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="storeId"
              label="Cửa hàng">
              <Select
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider className="my-2" />
                    <Space className="my-1 mx-2 d-flex w-100">
                      <Input
                        placeholder="Vui lòng nhập mã cửa hàng"
                        value={storeName}
                        className="flex-grow-1 justify-content-start"
                        onChange={handleChangeStoreName}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={handleCreateStore}>
                        Thêm cửa hàng
                      </Button>
                    </Space>
                  </>
                )}>
                {stores.map((store) => (
                  <Option
                    key={store.id}
                    value={store.id}>
                    {store.name} ({store.code})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="cardId"
              label="Mã thẻ">
              <Select
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider className="my-2" />
                    <Space className="my-1 mx-2 d-flex w-100">
                      <Input
                        placeholder="Vui lòng nhập số thẻ"
                        value={cardNumber}
                        className="flex-grow-1 justify-content-start"
                        onChange={handleChangeCardNumber}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={handleCreateCard}>
                        Thêm thẻ
                      </Button>
                    </Space>
                  </>
                )}>
                {cards.map((card) => (
                  <Option
                    key={card.id}
                    value={card.id}>
                    {card.name ?? 'Chưa có tên'} - {card.number}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="amount"
              label="Số tiền">
              <Input
                type="number"
                step="0.01"
                onChange={handleRecalculateFee}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={nameof(Transaction.prototype.fee)}
              label="Phí">
              <Input
                type="number"
                step="0.01"
                onChange={handleRecalculateFee}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={nameof(Transaction.prototype.posFee)}
              label="Phí máy">
              <Input
                type="number"
                step="0.01"
                disabled
                placeholder="Tính tự động"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name={nameof(Transaction.prototype.profit)}
              label="Lợi nhuận">
              <Input
                type="number"
                step="0.01"
                disabled
                placeholder="Tính tự động"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Đã nhận tiền"
              hidden
              name={nameof(Transaction.prototype.statusId)}></Form.Item>
            <Form.Item label="Đã nhận tiền">
              <Switch
                defaultChecked={
                  form.getFieldValue(nameof(Transaction.prototype.statusId)) ==
                  TransactionStatus.DONE
                }
                onChange={(value) => {
                  form.setFieldValue(
                    nameof(Transaction.prototype.statusId),
                    value ? TransactionStatus.DONE : TransactionStatus.PENDING,
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item>
              <Button
                className="mr-2"
                type="primary"
                htmlType="submit"
                loading={isLoading}>
                Nhập
              </Button>

              <Button
                className="mx-2"
                type="default"
                htmlType="button"
                onClick={handleRecalculateFee}>
                Tính lại phí
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default TransactionDetail;
