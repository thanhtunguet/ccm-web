import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { AppRoute } from "src/config/app-route";
import { CardClass } from "src/models/CardClass";
import { useDetails } from "src/services/use-details.ts";
import { cardClassRepository } from "src/repositories/card-class-repository.ts";
import { useMaster } from "src/services/use-master.ts";
import { Bank } from "src/models";
import { bankRepository } from "src/repositories/bank-repository.ts";

const CardClassDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<CardClass>(
    cardClassRepository.get,
    cardClassRepository.create,
    cardClassRepository.update,
    AppRoute.CARD_CLASSES,
  );

  const [banks] = useMaster<Bank>(
    bankRepository.list,
    bankRepository.count,
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleCreate}
    >
      <Row gutter={12}>
        <Col span={8}>
          {/* Display name field */}
          <Form.Item
            name={nameof(CardClass.prototype.bankId)}
            label="Bank"
            rules={[{ required: true, message: "Please select the bank" }]}
          >
            <Select>
              {banks.map((bank) => (
                <Select.Option key={bank.id} value={bank.id}>
                  {bank.shortName} - {bank.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Display name field */}
          <Form.Item
            name={nameof(CardClass.prototype.code)}
            label="CardClass code"
            rules={[{ required: true, message: "Please enter the cardClass code" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* First name field */}
          <Form.Item
            name={nameof(CardClass.prototype.name)}
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          {/* Last name field */}
          <Form.Item
            name={nameof(CardClass.prototype.statementDate)}
            label="Statement Date"
            rules={[{ required: true, message: "Please enter the statement date" }]}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Email field */}
          <Form.Item
            name={nameof(CardClass.prototype.dueDate)}
            label="Due date"
            rules={[{ required: true, message: "Please enter the due date" }]}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={nameof(CardClass.prototype.freePeriod)}
            label="Free period (days)"
            rules={[{ required: true, message: "Please enter the free period" }]}
            initialValue={45}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      {/* Submit button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CardClassDetail;
