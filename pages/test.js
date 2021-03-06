
import { useState } from 'react';
import Image from 'next/image'
import { useS3Upload } from 'next-s3-upload';

export default function UploadTest() {
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async file => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <Image src={imageUrl} alt="Picture l" />} 
      {/* <img src={imageUrl} /> */}
    </div>
  );
}