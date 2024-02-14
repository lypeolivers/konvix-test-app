// src/Home.tsx
import React, { useEffect, useState } from "react";

import CustomLayout from "../components/Layout";
import { Button, Flex, TableProps } from "antd";
import CustomTable from "../components/Table";
import { getClients, getSales } from "../utils/apiRequests";
import Title from "antd/es/typography/Title";
import CreateSaleModal from "../components/modal/createSaleModal";
import { format } from "date-fns";

const Sale: React.FC = () => {
  const [salesData, setSalesData] = useState([]);
  const [clientsData, setClientsData] = useState([]);

  const columns: TableProps["columns"] = [
    {
      title: "#",
      dataIndex: "cod_venda",
      key: "cod_venda",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Cliente",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
      render: (cod_cliente) => `${cod_cliente.des_nome}`,
      responsive: ["md"],
    },
    {
      title: "Data",
      dataIndex: "dta_venda",
      key: "dta_venda",
      responsive: ["md"],
      render: (date: any) => <p>{format(new Date(date), "dd/MM/yyyy")}</p>,
    },
    {
      title: "Total",
      dataIndex: "val_total_venda",
      key: "val_total_venda",
    },
  ];

  useEffect(() => {
    handleGetClients();
    handleGetSales();
  }, []);

  const handleGetClients = () => {
    getClients().then((res) => setClientsData(res));
  };

  const handleGetSales = () => {
    getSales().then((res) => setSalesData(res));
  };

  return (
    <CustomLayout>
      <Flex gap={"large"} justify="center" vertical>
        <Flex justify="space-between" align="center">
          <Title level={2}>Vendas</Title>
          <CreateSaleModal
            clients={clientsData}
            handleGetSales={handleGetSales}
          />
        </Flex>

        <CustomTable dataTable={salesData} columns={columns} />
      </Flex>
    </CustomLayout>
  );
};

export default Sale;
