import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";
import SubFolder from "./SubFolder";
import Modal from "./Modal";

const FolderName = styled.span`
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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState('')
  const [refresh, setRefresh] = useState(false)

  function fetchData () {
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
  }

  const showSubnav = () => {
    setSubnav(!subnav);
  };

  React.useEffect(()=>{
    fetchData()
    console.log(refresh)
    setRefresh(false)
  },[refresh,subnav])

  const handleModal = (e) => {
    setModalAction(e)
    setModalOpen(true)
  }


  return (
    <div> 
      {modalOpen ? 
      <Modal item={item} setModalOpen={setModalOpen} actionType={modalAction} setRefresh={setRefresh} /> :
          <>
            <DropdownLink >
              <div onClick={showSubnav}>
                {!subnav ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
                <FolderName>{item.folderName}</FolderName>
              </div>
              <CiCircleRemove onClick={()=>handleModal('remove')} />
              <div onClick={()=>handleModal('add')}>
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
      }
      </div>
  );
};
export default Folder;
