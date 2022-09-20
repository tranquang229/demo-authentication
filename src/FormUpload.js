import React, { useState } from 'react';
import axios from 'axios';

const FormUpload = () => {
  const [fileSelected, setFileSelected] = useState();

  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const importFile = async (e) => {
    const formData = new FormData();
    formData.append('file', fileSelected);
    try {
      // const res = await axios.post("https://localhost:6002/api/admin/Sample/read", formData);
      const result = await axios({
        method: 'post',
        url: `http://localhost:6002/api/Course/import`,
        data: formData,
      });
    } catch (ex) {
      const errors = ex.response.data.errors;
      const regex = /[^{\}]+(?=})/g;
      const listError = [];
      for (let i = 0; i < errors.length; i++) {
        const arr = errors[i].key.match(regex);
        const sheetName = arr[0];
        const row = arr[1].split('_')[0];
        const column = arr[1].split('_')[1];
        const value = arr[2];
        const field = errors[i].field;
        const message = errors[i].message;
        listError.push({ tabName: sheetName, row, column, value, field, message });
      }
      console.log(
        '🚀 ~ file: FormUpload.js ~ line 36 ~ importFile ~ listError',
        listError
      );
    }
  };

  return (
    <>
      <input type='file' onChange={saveFileSelected} />
      <input type='button' value='upload' onClick={importFile} />
    </>
  );
};

export default FormUpload;
