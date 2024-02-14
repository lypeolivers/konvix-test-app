import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import CustomLayout from "../components/Layout";
import { Button, Flex, Space, TableProps } from "antd";
import CustomTable from "../components/Table";
import { getClients } from "../utils/apiRequests";
import CreateClientModal from "../components/modal/createClientModal";
import Title from "antd/es/typography/Title";
import EditClientModal from "../components/modal/editClientModal";
import api from "../api/api";
import { iClient } from "../interfaces/Client";

const Client: React.FC = () => {
  const [clientsData, setClientsData] = useState([]);

  const columns: TableProps["columns"] = [
    {
      title: "#",
      dataIndex: "cod_cliente",
      key: "cod_cliente",
    },
    {
      title: "Nome",
      dataIndex: "des_nome",
      key: "des_nome",
    },
    {
      title: "Qtd Pedidos",
      dataIndex: "qtd_venda_pedidos",
      key: "qtd_venda_pedidos",
    },
    {
      title: "Valor de Venda Acumulado",
      dataIndex: "val_venda_acumulado",
      key: "val_venda_acumulado",
    },
    {
      title: "Data do último pedido",
      dataIndex: "dta_ult_pedido",
      key: "dta_ult_pedido",
      render: (date: any) => <p>{format(new Date(date), "dd/MM/yyyy")}</p>,
    },
    {
      title: "Endereço",
      dataIndex: "des_endereco",
      key: "des_endereco",
    },

    {
      title: "Ações",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditClientModal
            clientObject={record}
            handleGetClients={handleGetClients}
          />
          <Button danger onClick={() => handleDeleteClients(record)}>
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetClients();
  }, []);

  const handleGetClients = () => {
    getClients().then((res) => setClientsData(res));
  };

  const handleDeleteClients = async (client: iClient) => {
    await api.delete(`clients/${client.cod_cliente}`);
    handleGetClients();
    return;
  };

  return (
    <CustomLayout>
      <Flex gap={"large"} justify="center" vertical>
        <Flex justify="space-between" align="center">
          <Title level={2}>Clientes</Title>
          <CreateClientModal handleGetClients={handleGetClients} />
        </Flex>
        <CustomTable dataTable={clientsData} columns={columns} />
      </Flex>
    </CustomLayout>
  );
};

export default Client;
