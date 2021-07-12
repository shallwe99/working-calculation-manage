import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon } from '@iconify/react';
// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Stack from '@material-ui/core/Stack';
import UpArrowFill from '@iconify/icons-eva/arrow-upward-fill';
import XLSX from 'xlsx';

function ExcelToJSON(callback, targetSheetName) {
  this.parseExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) => {
        if (targetSheetName === sheetName) {
          // Here is your object
          const XLRowJSONArr = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          const jsonStr = JSON.stringify(XLRowJSONArr);
          if (jsonStr.length > 2) {
            // 检查是否有重复的数据
            // const tempSet = new Set();
            // XLRowJSONArr.forEach((row) => {
            //   // tempSet.add(row.)
            // });
            callback(XLRowJSONArr);
            // console.log(JSON.parse(jsonObj));
          } else {
            alert('没有要导入的数据');
          }
        }
        // jQuery('#xlx_json').val(json_object);
      });
    };

    reader.onerror = function (ex) {
      // console.log(ex);
      alert(`加载数据过程中遇到错误,具体如下：\n${JSON.stringify(ex)}`);
    };

    reader.readAsBinaryString(file);
  };
}

const Input = styled('input')({
  display: 'none'
});

export default function UploadButton(props) {
  const { text, showUploadForm, importSheetName } = props;
  const handleFileSelect = (evt) => {
    const { files } = evt.target; // FileList object
    if (files[0].name.indexOf('.xlsx') === -1 && files[0].name.indexOf('.xls') === -1) {
      alert('Your select file has wrong format.\n\nThe right format of import file is excel.');
      return;
    }
    const xl2json = new ExcelToJSON(showUploadForm, importSheetName);
    xl2json.parseExcel(files[0]);
  };
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <label htmlFor="contained-button-file">
        <Input
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          id="contained-button-file"
          type="file"
          onChange={handleFileSelect}
          onClick={(e) => (e.target.value = '')}
        />
        <Button variant="contained" component="span" startIcon={<Icon icon={UpArrowFill} />}>
          {text}
        </Button>
      </label>
      {/* <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> */}
    </Stack>
  );
}
