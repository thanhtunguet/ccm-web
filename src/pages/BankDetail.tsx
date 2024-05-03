import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { AppRoute } from "src/config/app-route";
import { Bank } from "src/models/Bank";
import { bankRepository } from "src/repositories/bank-repository";
import { useDetails } from "src/services/use-details.ts";

const BankDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Bank>(
    bankRepository.get,
    bankRepository.create,
    bankRepository.update,
    AppRoute.BANK,
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
            name={nameof(Bank.prototype.code)}
            label="Bank code"
            rules={[{ required: true, message: "Please enter the bank code" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* First name field */}
          <Form.Item
            name={nameof(Bank.prototype.name)}
            label="Bank Name"
            rules={[{ required: true, message: "Please enter the bank name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Last name field */}
          <Form.Item
            name={nameof(Bank.prototype.englishName)}
            label="English Name"
            rules={[{ required: true, message: "Please enter the English name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          {/* Email field */}
          <Form.Item
            name={nameof(Bank.prototype.shortName)}
            label="Short name"
            rules={[{ required: true, message: "Please enter the short name" }]}
          >
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={nameof(Bank.prototype.cardLength)}
            label="Card length"
            rules={[{ required: true, message: "Please enter the card length" }]}
            initialValue={16}
          >
            <InputNumber max={30} className="w-100" />
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

export default BankDetail;
