import React from 'react'
import Folder from './Folder'

const SubFolder = ({data}) => {
  // if(data?.length) return "- No Folders"
  return (
    <div style={{marginLeft: '20px'}}>
      {data && data.map((item, index)=> {
        return <Folder key={index} item={item} />
      })
      }
      {
        !data?.length && <p> -No Folders</p>
      }
    </div>
  )
}

export default SubFolder