import React, { useState, useCallback } from 'react'
import { useDropzone } from "react-dropzone"
import Avatar from 'components/avatar'
import Error from 'components/error'

const UploadImage = function UploadImage(props: any) {
  const { src, cb, avatar, 
          validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'],
          ...rest
        } = props
  const [newSrc, setNewSrc] = useState(src as string)
  const [error, setError] = useState('')
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (validTypes.indexOf(file.type) === -1) {
      setError(`Invalid file type ${file.type} not supported`)
      return false
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => setError('File upload failed')
    reader.onload = () => {
      // @ts-ignore
      setNewSrc(reader.result)
      cb && cb(reader.result)
    }
  }, [cb, validTypes])

  const child = avatar ? <Avatar src={newSrc} {...rest} /> : null
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  
  return (
    <div {...getRootProps()} style={{
      cursor: 'pointer', width: '10px', height: '60px', borderColor: 'red', borderRadius: '100%'}} id="ok">
      <input {...getInputProps()} />
        {child}
        {error && <Error message={error}/>}
    </div>
  )
}

export default UploadImage