import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarItem, SidebarDropdown, SidebarLink, Container, Content, UserProfile, UserName } from "./StyledApp";

const DashboardPage = () => {
  return (
    <Container> 
      <Sidebar>
        <UserProfile>
          <img src="https://via.placeholder.com/50" alt="Profile" />
          <UserName>Nama User</UserName>
        </UserProfile>
        <SidebarItem>
          <SidebarLink to="/dashboard">Dashboard</SidebarLink>
          <SidebarDropdown>
            <SidebarLink to="/dashboard/tambah-layanan">Tambah Layanan</SidebarLink>
            <SidebarLink to="/dashboard/tambah-teknisi">Tambah Teknisi</SidebarLink>
            <SidebarLink to="/dashboard/kelola-user">Kelola User</SidebarLink>
            <SidebarLink to="/dashboard/pesanan">Pesanan</SidebarLink>
          </SidebarDropdown>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="/dashboard/about-us">About Us</SidebarLink>
        </SidebarItem>
      </Sidebar>
      <Content>
        <Outlet /> {/* This renders the matched child route */}
      </Content>
    </Container>
  );
};

export default DashboardPage;
