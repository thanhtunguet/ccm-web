import {Button, Col, Form, Input, Row} from "antd";
import {AppRoute} from "src/config/app-route";
import {useDetails} from "src/services/use-details.ts";
import {Store} from "src/models";
import {storeRepository} from "src/repositories/store-repository.ts";

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
        <Col span={12}>
          {/* Code field */}
          <Form.Item
            name="code"
            label="Code"
            rules={[{required: true, message: "Please enter the code"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={12}>
          {/* Name field */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{required: true, message: "Please enter the name"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      {/* Address field */}
      <Form.Item
        name="address"
        label="Address"
        rules={[{required: true, message: "Please enter the address"}]}
      >
        <Input.TextArea/>
      </Form.Item>
      {/* Submit button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreDetail;
