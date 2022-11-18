import React, { useState } from "react";
import styled from "styled-components";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import Folder from "./Folder";

const SidebarLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 24px;
  color: #414544;
  cursor: pointer;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled.div`
  height: 60px;
  padding-left: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #414544;
  font-size: 22px;
  cursor: pointer;
`;

const Root = () => {
  const [subnav, setSubnav] = useState(false);
  const [data, setData] = useState();

  const showSubnav = () => {
    setSubnav(!subnav);

    axios.get("http://localhost:9090/folder/all").then((response) => {
      if (response) {
        setData(response.data.filter((folder) => !folder.parentFolder));
      } else {
        console.log("Failed to save Comment");
      }
    });
    console.log(data);
  };
  return (
    <>
      <SidebarLink>
        <div onClick={showSubnav}>
          {!subnav ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
          <SidebarLabel>Root</SidebarLabel>
        </div>
        <div
          style={{
            dispaly: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <GrFormAdd />
          New
        </div>
      </SidebarLink>
      {(subnav && data?.length) && data.map((item, index) => {
        return <Folder key ={index} item={item} />
      })}
    </>
  );
};

export default Root;
