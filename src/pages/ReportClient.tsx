import React, { useEffect, useState } from "react";
import CustomLayout from "../components/Layout";
import { TableProps, Space, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { format } from "date-fns";
import api from "../api/api";
import CustomTable from "../components/Table";
import ListItemsModal from "../components/modal/listItemsModal";
import { getClients } from "../utils/apiRequests";
import moment from "moment";

const ReportClient: React.FC = () => {
  const [clientsData, setClientsData] = useState([]);

  const columns: TableProps["columns"] = [
    {
      title: "Nome",
      dataIndex: "des_nome",
      key: "des_nome",
      sorter: {
        compare: (a, b) => a.des_nome.localeCompare(b.des_nome),
        multiple: 2,
      },
    },
    {
      title: "Valor de Venda Acumulado",
      dataIndex: "val_venda_acumulado",
      key: "val_venda_acumulado",
      sorter: {
        compare: (a, b) => a.val_venda_acumulado - b.val_venda_acumulado,
        multiple: 3,
      },
    },
    {
      title: "Data do último pedido",
      dataIndex: "dta_ult_pedido",
      key: "dta_ult_pedido",
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) =>
          new Date(a.dta_ult_pedido).getTime() -
          new Date(b.dta_ult_pedido).getTime(),
        multiple: 1,
      },
      render: (date: any) => <p>{format(new Date(date), "dd/MM/yyyy")}</p>,
    },
  ];

  useEffect(() => {
    handleGetClients();
  }, []);

  const handleGetClients = () => {
    getClients().then((res) => setClientsData(res));
  };

  return (
    <CustomLayout>
      <Flex gap={"large"} justify="center" vertical>
        <Flex justify="space-between" align="center">
          <Title level={2}>Relatório de Vendas por Cliente</Title>
        </Flex>
        <CustomTable dataTable={clientsData} columns={columns} />
      </Flex>
    </CustomLayout>
  );
};

export default ReportClient;
