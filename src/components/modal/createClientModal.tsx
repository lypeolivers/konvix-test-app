import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { iClient } from "../../interfaces/Client";
import { getClients } from "../../utils/apiRequests";
import api from "../../api/api";
const { Text } = Typography;

interface FormData {
  des_produto: string;
  val_unitario: string;
  qtd_itens: string;
}

interface CreateClientProps {
  handleGetClients: Function;
}

const CreateClientModal: React.FC<CreateClientProps> = ({
  handleGetClients,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async (values: any) => {
    setConfirmLoading(true);

    try {
      const res = await api.post("clients", values);
      setConfirmLoading(false);
      setOpen(false);
      handleGetClients();
      return res;
    } catch (error: any) {
      setConfirmLoading(false);
      return console.error(error.message);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Novo Cliente
      </Button>

      <Modal
        title="Novo Cliente"
        open={open}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleOk(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        okText="Criar Cliente"
        cancelText="Cancelar"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="complex-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Nome">
            <Space>
              <Form.Item name="des_nome" rules={[{ required: true }]} noStyle>
                <Input placeholder={"José Ricardo"} variant="filled" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="Endereço" rules={[{ required: true }]}>
            <Space.Compact>
              <Form.Item name="des_endereco" noStyle>
                <Input placeholder={"Rua 7 de setembro"} variant="filled" />
              </Form.Item>
              <Form.Item
                name="num_endereco"
                rules={[{ required: true }]}
                noStyle
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="Nº 123"
                  variant="filled"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Space.Compact>
              <Form.Item name="des_cidade" rules={[{ required: true }]} noStyle>
                <Input placeholder={"Cidade"} variant="filled" />
              </Form.Item>
              <Form.Item name="des_uf" rules={[{ required: true }]} noStyle>
                <Input
                  style={{ width: "50%" }}
                  placeholder={"UF"}
                  variant="filled"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="Telefone">
            <Space.Compact>
              <Form.Item
                name="des_telefone"
                rules={[{ required: true }]}
                noStyle
              >
                <Input placeholder={"(19)9991 9090"} variant="filled" />
              </Form.Item>
              <Form.Item
                name="des_contato"
                rules={[{ required: true }]}
                noStyle
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder={"Contato"}
                  variant="filled"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateClientModal;
