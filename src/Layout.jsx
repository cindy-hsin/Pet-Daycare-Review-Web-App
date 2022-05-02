import React from "react";
import { Layout as AntdLayout } from "antd";
import NavBar from "./NavBar";

const { Header } = AntdLayout;

export default function Layout({ children }) {
    return (
      <AntdLayout>
        <Header>
          <NavBar />
        </Header>
        <div className="page-container">
          <div className="page-content">{children}</div>
          <div className="footer">
          </div>
        </div>
      </AntdLayout>
    );
  }