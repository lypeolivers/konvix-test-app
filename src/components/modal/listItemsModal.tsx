import React, { useState } from "react";
import { Button, Modal, TableProps } from "antd";
import CustomTable from "../Table";

interface ListItemsProps {
  record: any;
}

const ListItemsModal: React.FC<ListItemsProps> = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps["columns"] = [
    {
      title: "Código do Item",
      dataIndex: "cod_item",
      key: "cod_item",
    },
    {
      title: "Nome do Produto",
      dataIndex: "des_produto",
      key: "des_produto",
    },
    {
      title: "Valor Unitário",
      dataIndex: "val_unitario",
      key: "val_unitario",
    },
    {
      title: "Quantidade",
      dataIndex: "qtd_itens",
      key: "qtd_itens",
    },
    {
      title: "Valor Total",
      dataIndex: "val_total",
      key: "val_total",
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ver Itens
      </Button>
      <Modal
        title={`Venda Código ${record.cod_venda}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CustomTable columns={columns} dataTable={record.salesItems} />
      </Modal>
    </>
  );
};

export default ListItemsModal;
