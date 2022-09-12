import React, { useState } from 'react'
import axios from 'axios';

const FormUpload = () => {
    const [fileSelected, setFileSelected] = useState();

    const saveFileSelected= (e) => {
      //in case you wan to print the file selected
      //console.log(e.target.files[0]);
      setFileSelected(e.target.files[0]);
    };
  
    const importFile= async (e) => {
        debugger
      const formData = new FormData();
      formData.append("file", fileSelected);
      try {
        // const res = await axios.post("https://localhost:6002/api/admin/Sample/read", formData);
        axios({
            method: 'post',
            url: `https://localhost:6002/api/admin/Sample/read`,
            data: formData,
          }).then((res) => {
            debugger
            console.log(res.data);
          });


      } catch (ex) {
        console.log(ex);
      }
    };
  
    return (
      <>
        <input type="file" onChange={saveFileSelected} />
        <input type="button" value="upload" onClick={importFile} />
      </>
    );
}

export default FormUpload