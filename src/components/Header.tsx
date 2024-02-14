import React from "react";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const items = [
  {
    path: "/",
    key: 1,
    label: <Link to="/">Clientes </Link>,
  },
  {
    path: "/vendas",
    key: 2,
    label: <Link to="/vendas">Vendas</Link>,
  },
  {
    path: "/relatorio",
    key: 3,
    label: <Link to="/relatorio">Relatório</Link>,
  },
  {
    path: "/relatorio-clientes",
    key: 4,
    label: <Link to="/relatorio-clientes">Relatório Clientes</Link>,
  },
  {
    path: "/login",
    key: 5,
    label: <Link to="/relatorio-clientes">Deslogar</Link>,
  },
];

const CustomHeader: React.FC = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key == "5") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={true}
          onClick={onClick}
          selectedKeys={[
            String(items.filter((item) => item.path == currentPath)[0]?.key),
          ]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item key="mail">Navigation One</Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default CustomHeader;
