import * as Api from "../Api";
import React from "react";
import * as Mui from '../Components';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import mime from 'mime';
import ContentEditor from './ContentEditor';
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

function TextFilePreviewer({ file_path, file_attrs, open, setOpen, setAlertOpen, setAlertDetail }) {
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [fileMime, setFileMime] = React.useState(null);

  React.useEffect(() => {
    if (file_path && open) {
      setLoading(true);
      setFileMime(file_attrs?.mime);
      Api.driveFetchFile(file_path)
        .then(response => {
          setContent(typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2));
          setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
    }
  }, [file_path, file_attrs, open]);

  const handleSave = () => {
    Api.driveUpdateFile(file_path, content)
      .then(response => {
        if (response.data.ok) {
          setAlertDetail({ type: 'success', title: 'Success', message: 'File saved successfully' });
          setAlertOpen(true);
        } else {
          setAlertDetail({ type: 'error', title: 'Error', message: 'Failed to save: ' + response.data.data });
          setAlertOpen(true);
        }
      })
      .catch(error => {
        setAlertDetail({ type: 'error', title: 'Error', message: 'Network error or server error' });
        setAlertOpen(true);
      });
  };

  return (
    <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <Mui.DialogTitle>Editing {file_attrs?.filename}</Mui.DialogTitle>
      <Mui.DialogContent sx={{ height: '70vh', padding: 0 }}>
        {loading ? (
          <Mui.Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Mui.Typography>Loading...</Mui.Typography>
          </Mui.Box>
        ) : (
          <ContentEditor
            language={mime.getExtension(fileMime) || 'text'}
            value={content}
            onChange={setContent}
            height={'100%'}
            width={'100%'}
            mode={Mui.theme().palette.mode}
          />

        )}
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => setOpen(false)}>Close</Mui.Button>
        <Mui.Button variant="contained" onClick={handleSave}>Save</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

function ImageFilePreviewer({ file_url, open, setOpen }) {
  const dummyRef = React.useRef(null);

  React.useEffect(() => {
    if (open && dummyRef.current) {
      dummyRef.current.click();
    }
  }, [open])

  return (
    <PhotoProvider onVisibleChange={(visible) => {
      if (!visible) {
        setOpen(false);
      }
    }} index={0}>
      <PhotoView src={file_url} >
        <img key={0} src={file_url} style={{ display: 'none' }} ref={dummyRef} alt=""></img>
      </PhotoView>
    </PhotoProvider>
  )
}

function MediaFilePreviewer({ file_attrs, file_url, open, setOpen }) {
  return (
    <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <Mui.DialogTitle>Preview {file_attrs?.filename}</Mui.DialogTitle>
      <Mui.DialogContent sx={{ textAlign: 'center' }}>
        {file_attrs?.mime?.startsWith('video') ? (
            <video controls src={file_url} style={{ maxWidth: '100%', maxHeight: '70vh' }} />
        ) : (
            <audio controls src={file_url} style={{ width: '100%', marginTop: '20px' }} />
        )}
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => setOpen(false)}>Close</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

function PdfRenderer({ file_url, open, setOpen }) {
  const [numPages, setNumPages] = React.useState(null);
  const [isLandscape, setIsLandscape] = React.useState(false);

  async function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);
    try {
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });
      setIsLandscape(viewport.width > viewport.height);
    } catch (e) {
      console.error('Failed to get page dimensions', e);
    }
  }

  return (
    <Document
      file={file_url}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={(error) => alert('PDF Load Error: ' + error.message + '\n\nStack:\n' + error.stack)}
      style={{ width: '100%', height: '100%' }}
    >
      <Mui.Grid container justifyContent="center">
         {Array.from(new Array(numPages), (el, index) => (
          <Mui.Grid key={`page_${index + 1}`} item xs={12} md={isLandscape ? 12 : 6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Page pageNumber={index + 1} renderTextLayer renderAnnotationLayer />
          </Mui.Grid>
        ))}
      </Mui.Grid>
      
    </Document>    
  )
}

function DocumentFilePreviewer({ file_path, file_attrs, file_url, open, setOpen }) {
  const [pdfUrl, setPdfUrl] = React.useState(null);

  React.useEffect(() => {
    if (file_attrs?.mime === "application/pdf") {
      setPdfUrl(file_url);
    } else {
      setPdfUrl(Api.getConvertPdfPath(file_path));
    }
  }, [file_attrs, file_url, file_path]);

  return (
    <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <Mui.DialogTitle>Preview {file_attrs?.filename}</Mui.DialogTitle>
      <Mui.DialogContent sx={{ height: '85vh', padding: 0 }}>
        {pdfUrl && <PdfRenderer file_url={pdfUrl} />}
      </Mui.DialogContent> 
      <Mui.DialogActions>
        <Mui.Button onClick={() => setOpen(false)}>Close</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

export default function FilePreviewer({ file_path, file_attrs, open, setOpen, setAlertOpen, setAlertDetail }) {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [fileMime, setFileMime] = React.useState(null);
  const [fileRendererType, setFileRendererType] = React.useState(null);

  React.useEffect(() => {
    if (file_path && open) {
      const url = Api.getDownloadPath(file_path);
      setFileUrl(url);
      
      let mime_query = file_attrs?.mime ? file_attrs.mime : mime.getType(file_path) || 'application/octet-stream';
      setFileMime(mime_query);

      const documentMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];

      const documentExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

      if (mime_query.startsWith('image')) {
        setFileRendererType('image');
      } else if (mime_query.startsWith('audio') || mime_query.startsWith('video') || 
                 ['application/mp4', 'application/ogg', 'application/x-msvideo', 'application/x-flv'].some(m => mime_query.startsWith(m))) {
        setFileRendererType('media');
      } else if (mime_query.startsWith('text') || 
                 ['.js', '.json', '.css', '.html', '.md', '.py', '.c', '.cpp', '.java'].some(ext => file_path.toLowerCase().endsWith(ext))) {
        setFileRendererType('text');
      } else if (documentMimeTypes.includes(mime_query) || documentExtensions.some(ext => file_path.toLowerCase().endsWith(ext))) {
        setFileRendererType('document');
      } else {
        setFileRendererType('unknown');
      }
    }
  }, [file_path, file_attrs, open]);


  if (!open) return null;

  return (
    <>
      {fileRendererType === 'image' && <ImageFilePreviewer file_url={fileUrl} open={open} setOpen={setOpen} />}
      {fileRendererType === 'media' && <MediaFilePreviewer file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
      {fileRendererType === 'text' && <TextFilePreviewer file_path={file_path} file_attrs={file_attrs} open={open} setOpen={setOpen} setAlertOpen={setAlertOpen} setAlertDetail={setAlertDetail} />}
      {fileRendererType === 'document' && <DocumentFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
      {fileRendererType === 'unknown' && (
        <Mui.Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={6000}>
            <Mui.Alert severity="error" onClose={() => setOpen(false)}>
                Unsupported file type: {fileMime}
            </Mui.Alert>
        </Mui.Snackbar>
      )}
    </>
  );
}
