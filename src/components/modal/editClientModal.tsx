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
  clientObject: iClient;
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const EditClientModal: React.FC<CreateClientProps> = ({
  handleGetClients,
  clientObject,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fields, setFields] = useState<FieldData[]>([
    { name: ["des_nome"], value: "RECEBENDO PROPS" },
  ]);

  const [form] = Form.useForm();

  const showModal = () => {
    let fieldsTemp: any[] = [];
    let entries = Object.entries(clientObject);
    entries.map(([key, val]) => {
      fieldsTemp.push({ name: [`${key}`], value: `${val}` });
    });
    setFields(fieldsTemp);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async (values: any) => {
    setConfirmLoading(true);

    try {
      const res = await api.patch(
        `clients/${clientObject.cod_cliente}`,
        values
      );
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
      <Button
        type="primary"
        style={{ backgroundColor: "orange" }}
        onClick={showModal}
      >
        Editar
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
        okText="Salvar"
        cancelText="Cancelar"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          fields={fields}
          name="complex-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Nome">
            <Space>
              <Form.Item name="des_nome" rules={[{ required: true }]} noStyle>
                <Input
                  placeholder={"José Ricardo"}
                  variant="filled"
                  style={{ width: "100%" }}
                />
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

export default EditClientModal;
