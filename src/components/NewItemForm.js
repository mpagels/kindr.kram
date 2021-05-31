import { useForm } from 'react-hook-form'
import styled from 'styled-components/macro'
import { Image } from 'cloudinary-react'
import { useState } from 'react'
import Upload from '../assets/pngs/upload.png'
import { useHistory } from 'react-router-dom'
export default function NewItemForm() {
  let history = useHistory()
  const [uploadedPics, setUploadedPics] = useState([])
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLODAPRESET,
      sources: ['local', 'camera', 'google_drive'],
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        setUploadedPics((prevUploadedPics) => {
          return [
            ...prevUploadedPics,
            {
              public_id: result.info.public_id,
              delete_token: result.info.delete_token,
            },
          ]
        })
      }
    }
  )

  const {
    register,
    handleSubmit,
    /* watch, */
    formState: { errors },
  } = useForm()
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit(createNewItem)}>
        {/* register your input into the hook by invoking the "register" function */}
        <StyledLabel for="itemName">Itemname:</StyledLabel>
        <StyledInput
          id="itemName"
          name="itemName"
          defaultValue="Kinderwagen 3000"
          {...register('itemName')}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <StyledLabel for="price">Preis:</StyledLabel>
        <StyledInput
          id="price"
          name="price"
          type="number"
          min={0}
          {...register('price', { required: true, min: 0 })}
        />
        {/* errors will return when field validation fails  */}
        {errors.price && <Error>Preis eingeben!</Error>}
        <StyledLabel for="description">Beschreibung</StyledLabel>
        <StyledTextarea
          id="description"
          name="description"
          col="35"
          row="80"
          {...register('description', { required: true })}
        />
        {errors.description && <Error>Beschreibung eingeben!</Error>}

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

        <StyledSendButton>Item speichern</StyledSendButton>
      </StyledForm>
    </FormWrapper>
  )

  function createNewItem(data) {
    const { itemName, price, description } = data
    const newItem = {
      name: itemName,
      price,
      description,
      image_urls: uploadedPics.map((image) => image.public_id),
    }
    fetch('/api/item/create', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          history.push('/')
        }
      })
  }

  function handleDelete(delete_token, index) {
    const dataString = `token=${delete_token}`
    fetch(`https://api.cloudinary.com/v1_1/martinpagels-dev/delete_by_token`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
      body: dataString,
    }) // *GET, POST, PUT, DELETE, etc.)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.result === 'ok') {
          setUploadedPics([
            ...uploadedPics.slice(0, index),
            ...uploadedPics.slice(index + 1),
          ])
        }
      })
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  display: block;
  padding-bottom: 10px;
  font-size: 1.2em;
`
const FormWrapper = styled.div`
  padding: 20px 40px; ;
`
const StyledInput = styled.input`
  border-radius: 10px;
  padding: 10px;
  display: block;
  width: 100%;
`

const Error = styled.span`
  color: red;
  font-size: 0.7em;
`

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  height: 300px;
  resize: none;
`

const StyledSendButton = styled.button`
  all: unset;
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  bottom: 20px;
  left: 30px;
  right: -30px;

  background-color: grey;
`

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
