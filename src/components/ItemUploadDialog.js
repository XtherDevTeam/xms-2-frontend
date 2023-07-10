import * as React from 'react'
import * as Mui from '../Components'

import * as Api from '../Api'

export default function ItemUploadDialog(props) {
  let [fileList, setFileList] = React.useState([])

  let uploadItems = () => {
    let formData = new FormData()
    fileList.forEach((file, index) => {console.log("我操你妈：", props.allowMultiFile, index, props.formKey); formData.append(props.allowMultiFile ? toString(index) : props.formKey, file)})

    props.onOk(formData)
  }

  return (
    <Mui.Dialog onClose={() => { props.onCancel() }} open={props.state}>
      <Mui.DialogTitle>{props.title}</Mui.DialogTitle>
      <Mui.DialogContent>
        <Mui.Typography variant='body2'>
          <Mui.FileUpload
            multiFile={props.allowMultiFile} title={props.message} maxFilesContainerHeight={357}
            onFilesChange={(files) => { setFileList([...files]) }}
            showPlaceholderImage={false}
            header="Drag to drop"
            ContainerProps={{ sx: { border: "unset" } }}
            BannerProps={{
              sx: {
                minHeight: "128px",
                minWidth: "500px",
                backgroundImage: `url(${Mui.imgBackground3})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            }}
            onContextReady={(context) => { }}
          ></Mui.FileUpload>
        </Mui.Typography>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => { props.onCancel() }}>Cancel</Mui.Button>
        <Mui.Button onClick={() => { uploadItems() }} autoFocus>
          Upload
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}