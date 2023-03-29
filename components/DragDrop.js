// import { useDropzone } from 'react-dropzone';

// export default function DragDrop(){

//     const {getRootProps, getInputProps, isDragActive} = useDropzone({
//         onDrop: acceptedFiles => {
//             setFiles(acceptedFiles)
//         },
//         multiple: true,
//         accept: 'image/*, .pdf ',
//     })
// // .doc, .docx, .xls, .xlsx, .csv
//     return ( 
//         <>
//         <div {...getRootProps()} style={{padding: '20px', border: '2px dashed #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '20px 0'}}>
//         <input {...getInputProps()} />
//         {isDragActive ? 
//             <p>Drop the files here ...</p> :
//             <p>Drag 'n' drop some files here, or click to select files</p>
//         }
//     </div>

//     {files && files.map(file => (
//         <p key={file.name}>{file.name}</p>
//     ))}
//     </>
//     )
// }