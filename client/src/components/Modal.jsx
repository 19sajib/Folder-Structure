import React from 'react'
import axios from "axios";
import styled from "styled-components";


const ModalBox = styled.div`
    border: 3px solid black;
`

const Input = styled.input`
  padding: 10px 15px;
  margin: 10px;
  width: 80%;
  border: 2px solid blue;
  border-radius: 2px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 10px;
  border: 2px solid black;
  border-radius: 4px; 

  &:hover {
    border-color: blue;
  }
`;

const Modal = ({item, setModalOpen, actionType, setRefresh}) => {

  console.log(actionType)
  const [folderName, setFolderName] = React.useState('')

  const handleChange = () => {

  }

  const addFolder = () => {

    if(!folderName) {
      return alert('please type folder name')
    }
    const body = {
      folderName: folderName,
      ...(item) && {parentFolder: item._id}
    }
    axios.post("https://folder-structure-one.vercel.app/folder/create", body).then((response) => {
      if (response) {
        console.log(response.data)
        setRefresh(true)
        setModalOpen(false)
      } else {
        console.log("Failed to create new folder");
      }
    });
  }

  const deleteFolder = () => {
    axios.delete("https://folder-structure-one.vercel.app/folder/delete",{ data: {
      _id: item._id
    }}).then((response) => {
      if (response) {
        console.log(response.data)
        setRefresh(true)
        setModalOpen(false)
      } else {
        console.log("Failed to delete folder");
      }
    });
  }


  return (
    <ModalBox>
      {!item ? <h1>Add folder in Root Folder</h1> : actionType=== 'add' ? 
      <h1>Add folder in {item.folderName}</h1> :
      <h1>Delete {item.folderName}</h1>
      }
      {(actionType=== 'add' || !item) &&
      <Input
        type='text'
        placeholder='Folder Name'
        onChange={(e) => setFolderName(e.target.value)}
        required
      />}
      <div >
      <Button onClick={()=> setModalOpen(false)}>Cancel</Button>
      {actionType==='remove' ? 
      <Button onClick={deleteFolder}>Delete</Button> :
      <Button onClick={addFolder}>Create</Button>
      }
      </div>
    </ModalBox>
  )
}

export default Modal