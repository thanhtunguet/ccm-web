import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { AppRoute } from "src/config/app-route";
import { filterFunc } from "src/helpers/select.ts";
import { Bank } from "src/models";
import { BankFilter } from "src/models/Bank";
import { CardClass } from "src/models/CardClass";
import { bankRepository } from "src/repositories/bank-repository.ts";
import { cardClassRepository } from "src/repositories/card-class-repository.ts";
import { useDetails } from "src/services/use-details.ts";
import { useMaster } from "src/services/use-master.ts";

const CardClassDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<CardClass>(
    cardClassRepository.get,
    cardClassRepository.create,
    cardClassRepository.update,
    AppRoute.CARD_CLASSES,
  );

  const [banks] = useMaster<Bank, BankFilter>(
    bankRepository.list,
    bankRepository.count,
    new BankFilter(),
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleCreate}
    >
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.bankId)}
            label="Ngân hàng"
          >
            <Select showSearch={true} filterOption={filterFunc} placeholder="Tìm kiếm theo tên ngắn">
              {banks.map((bank) => (
                <Select.Option key={bank.id} value={bank.id} searchValue={bank.shortName}>
                  {bank.shortName} - {bank.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.code)}
            label="Mã lớp thẻ"
            rules={[{ required: true, message: "Vui lòng nhập mã lớp thẻ" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.name)}
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.statementDate)}
            label="Ngày sao kê"
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.dueDate)}
            label="Ngày đến hạn"
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.freePeriod)}
            label="Thời gian miễn lãi (ngày)"
            initialValue={45}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.bin)}
            label="BIN"
          >
            <Input className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CardClassDetail;
