import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { AppRoute } from "src/config/app-route";
import { Store } from "src/models";
import { storeRepository } from "src/repositories/store-repository.ts";
import { useDetails } from "src/services/use-details.ts";

const StoreDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Store>(
    storeRepository.get,
    storeRepository.create,
    storeRepository.update,
    AppRoute.STORE,
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleCreate}
    >
      <Row gutter={12}>
        <Col span={8}>
          {/* Code field */}
          <Form.Item
            name="code"
            label="Mã"
            rules={[{required: true, message: "Vui lòng nhập mã"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Name field */}
          <Form.Item
            name="name"
            label="Tên"
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Name field */}
          <Form.Item
            name="fee"
            label="Phí quẹt (%)"
          >
            <InputNumber className="w-100" min={0} max={100} />
          </Form.Item>
        </Col>
      </Row>
      {/* Address field */}
      <Form.Item
        name="address"
        label="Địa chỉ"
      >
        <Input.TextArea/>
      </Form.Item>
      {/* Submit button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Nộp
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreDetail;
