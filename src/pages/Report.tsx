// src/About.tsx
import React, { useState } from "react";
import CustomLayout from "../components/Layout";
import { DatePicker, DatePickerProps, Flex, Space, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { Dayjs } from "dayjs";
import api from "../api/api";
import axios from "axios";
import { format } from "date-fns";
import CustomTable from "../components/Table";
import ListItemsModal from "../components/modal/listItemsModal";
const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const Report: React.FC = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      let datesFilter = {
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      };
      handleGetReport(datesFilter);
    } else {
      console.log("Clear");
    }
  };

  const handleGetReport = async (datesFilter: any) => {
    try {
      const res = await api.post("report", datesFilter);
      setSalesData(res.data);
      return res;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "Código da Venda",
      dataIndex: "cod_venda",
      key: "cod_venda",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Data da Venda",
      dataIndex: "dta_venda",
      key: "dta_venda",
      responsive: ["md"],
      render: (date: any) => <p>{format(new Date(date), "dd/MM/yyyy")}</p>,
    },
    {
      title: "Valor total da venda",
      dataIndex: "val_total_venda",
      key: "val_total_venda",
    },
    {
      title: "Código do Cliente",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
      render: (cod_cliente) => `${cod_cliente.cod_cliente}`,
    },
    {
      title: "Nome",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
      render: (cod_cliente) => `${cod_cliente.des_nome}`,
    },
    {
      title: "Cidade",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
      render: (cod_cliente) => `${cod_cliente.des_cidade}`,
    },
    {
      title: "UF",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
      render: (cod_cliente) => `${cod_cliente.des_uf}`,
    },
    {
      title: "Telefone",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
      render: (cod_cliente) => `${cod_cliente.des_telefone}`,
    },
    {
      title: "Lista de Items",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <ListItemsModal record={record} />
        </Space>
      ),
    },
  ];

  return (
    <CustomLayout>
      <Flex gap={"large"} justify="center" vertical>
        <Flex justify="space-between" align="center">
          <Title level={2}>Relatório de Vendas</Title>
          <RangePicker
            onChange={onRangeChange}
            placeholder={["Data início", "Data fim"]}
            style={{ width: 250 }}
          />
        </Flex>
        <CustomTable dataTable={salesData} columns={columns} />
      </Flex>
    </CustomLayout>
  );
};

export default Report;
