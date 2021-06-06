import styled from 'styled-components'
import { Image } from 'cloudinary-react'
import Upload from '../assets/pngs/upload.png'

export default function PictureUpload({
  uploadedPics,
  handleDelete,
  myWidget,
}) {
  return (
    <PictureUploadWrapper>
      <UploadedPictures>
        {uploadedPics.length > 0 &&
          uploadedPics.map((image, index) => (
            <Wrapper>
              <DeleteButton
                type="button"
                className="Delete_btn"
                onClick={() => handleDelete(image.delete_token, index)}
              >
                ❌
              </DeleteButton>
              <Image
                cloudName="martinpagels-dev"
                publicId={image.public_id}
                width="70"
                crop="scale"
              />
            </Wrapper>
          ))}
      </UploadedPictures>
      <UploadButton
        type="button"
        id="upload_widget"
        onClick={() => myWidget.open()}
        class="cloudinary-button"
      >
        <img src={Upload} alt="upload-botton" />
      </UploadButton>
    </PictureUploadWrapper>
  )
}

const PictureUploadWrapper = styled.div`
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
`

const UploadButton = styled.button`
  all: unset;
  cursor: pointer;
  margin-right: 20px;
  opacity: 0.6;
`

const UploadedPictures = styled.div`
  width: 100%;
  position: relative;
  margin: 5px;
  padding: 10px;
  display: inline-block;
`

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 10px;
`

const DeleteButton = styled.button`
  all: unset;
  position: absolute;
  cursor: pointer;
  top: -10px;
  right: -10px;
`
