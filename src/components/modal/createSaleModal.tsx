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

interface CreateSaleProps {
  clients: iClient[];
  handleGetSales: Function;
}

interface iSelectOptions {
  value: number;
  label: string;
}

const CreateSaleModal: React.FC<CreateSaleProps> = ({
  clients,
  handleGetSales,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [clientsData, setClientsData] = useState<iClient[]>([]);
  const [cod_cliente, setCodCliente] = useState<number>(0);
  const [optionsSelect, setOptionsSelect] = useState<iSelectOptions[]>([]);
  const [dta_venda, setDataVenda] = useState<String | String[]>("");
  const [sumTotal, setSumTotal] = useState(0);
  const [listItems, setListItems] = useState<FormData[]>([
    { des_produto: "", val_unitario: "", qtd_itens: "" },
  ]);

  useEffect(() => {
    getClients().then((res) => {
      setClientsData(res);
      let options: any[] = [];
      res.map((item: any) => {
        options.push({ value: item.cod_cliente, label: item.des_nome });
      });
      setOptionsSelect(options);
    });
  }, []);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let object = {
      sale: {
        dta_venda: dta_venda,
        cod_cliente: cod_cliente,
        val_total_venda: sumTotal,
      },
      salesItems: listItems,
    };

    try {
      const res = await api.post("sales/final", object);
      setConfirmLoading(false);
      setOpen(false);
      handleGetSales();
      return res;
    } catch (error: any) {
      setConfirmLoading(false);
      return console.error(error.message);
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDataVenda(dateString);
  };
  const handleChange = (value: string) => {
    setCodCliente(parseInt(value));
  };

  const handleAddItem = () => {
    setListItems([
      ...listItems,
      { des_produto: "", val_unitario: "", qtd_itens: "" },
    ]);
  };

  const handleSumTotal = () => {
    let sum = 0;
    listItems.map((item) => {
      if (item.qtd_itens != "" && item.val_unitario != "") {
        console.log("QTD ITENS e VAL: ", item.qtd_itens, item.val_unitario);
        sum += parseInt(item.qtd_itens) * parseInt(item.val_unitario);
      }
    });
    setSumTotal(sum);
    console.log("SUM TOTAL:", sumTotal, sum);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormData = [...listItems];
    newFormData[index][event.target.name as keyof FormData] =
      event.target.value;
    setListItems(newFormData);
    handleSumTotal();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Nova Venda
      </Button>
      <Modal
        title="Nova Venda"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DatePicker
          onChange={onChange}
          style={{ width: "100%" }}
          placeholder="Data da venda"
        />
        <Select
          defaultValue=""
          style={{ width: "100%", marginTop: 12 }}
          onChange={handleChange}
          options={optionsSelect}
        />

        {cod_cliente && cod_cliente != 0 ? (
          <>
            {listItems.map((item, index) => (
              <Flex vertical={false} gap={"small"} style={{ marginTop: 12 }}>
                <Button onClick={() => handleAddItem()}>+</Button>
                <Input
                  placeholder="Nome Produto"
                  variant="filled"
                  name="des_produto"
                  onChange={(e) => handleInputChange(index, e)}
                />
                <Input
                  placeholder="Valor Unitário"
                  variant="filled"
                  name="val_unitario"
                  onChange={(e) => handleInputChange(index, e)}
                />
                <Input
                  placeholder="Qtd Itens"
                  variant="filled"
                  name="qtd_itens"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </Flex>
            ))}
            <Flex
              vertical={false}
              style={{ marginTop: 12 }}
              justify="space-between"
              gap={"large"}
            >
              <Form.Item label="Total" name="total" style={{ width: "100%" }}>
                <Input
                  placeholder={String(sumTotal) + " R$"}
                  value={sumTotal}
                  variant="filled"
                  disabled
                />
              </Form.Item>
            </Flex>{" "}
          </>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default CreateSaleModal;
