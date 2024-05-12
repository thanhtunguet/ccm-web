import {SmileOutlined} from "@ant-design/icons";
import {Button, Col, Form, Input, notification, Row} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "src/config/app-route";
import {Store} from "src/models/Store";
import {storeRepository} from "src/repositories/store-repository";

const StoreDetail = () => {
  // Form initialization
  const [form] = Form.useForm<Store>();
  // State for loading spinner
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // Notification hook
  const [api, contextHolder] = notification.useNotification();
  // Function to display notification
  const openNotification = React.useCallback((message: string) => {
    api.open({
      message: "Notification",
      description: message,
      icon: <SmileOutlined style={{color: "#108ee9"}}/>,
    });
  }, [api]);
  // Navigation hook
  const navigate = useNavigate();

  // Form submit handler
  const onFinish = (values: Store) => {
    setIsLoading(true);
    storeRepository.create(values)
      .pipe()
      .subscribe({
        next() {
          navigate(AppRoute.STORE);
          openNotification("Store created");
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
