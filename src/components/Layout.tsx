import React, { ReactNode } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

interface CustomLayoutProps {
  children?: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Content
        style={{
          padding: "24px 48px",
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            background: "#fff",
            minHeight: 280,
            padding: 24,
            borderRadius: 14,
            height: "100%",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default CustomLayout;
