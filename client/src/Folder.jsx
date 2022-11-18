import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";
import SubFolder from "./SubFolder";

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

const Folder = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [subData, setSubData] = useState();
  const showSubnav = () => {
    const body = {
        parentFolder: item._id
    }
    axios.post("http://localhost:9090/folder/sub", body).then((response) => {
      if (response) {
        setSubData(response.data);
        console.log(response.data)
      } else {
        console.log("Failed to save Comment");
      }
    });
    setSubnav(!subnav);
  };
  return (
    <>
            <DropdownLink >
              <div onClick={showSubnav}>
                {!subnav ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
                <SidebarLabel>{item.folderName}</SidebarLabel>
              </div>
              <CiCircleRemove />
              <div>
                <GrFormAdd />
                New
              </div>
            </DropdownLink>
      {subnav && (
        <>
          <SubFolder data={subData} />
        </>
      )}
    </>
  );
};
export default Folder;
