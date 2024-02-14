import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import exp from "constants";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface CustomTableProps {
  columns: any;
  dataTable: any;
  expandable?: any;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  dataTable,
  expandable,
}) => (
  <Table
    size="small"
    columns={columns}
    dataSource={dataTable}
    style={{ width: "100%" }}
    expandable={expandable}
    rowSelection={undefined}
  />
);

export default CustomTable;
