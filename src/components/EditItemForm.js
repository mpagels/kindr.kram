import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useEditItemForm from '../hooks/useEditItemForm'
import AbortButton from './AbortButton'
import PictureUpload from './PictureUpload'

export default function EditItemForm() {
  const history = useHistory()
  const {
    myWidget,
    uploadedPics,
    register,
    handleSubmit,
    updateEditedItem,
    handleDelete,
    errors,
  } = useEditItemForm()
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit(updateEditedItem)}>
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
        <PictureUpload
          uploadedPics={uploadedPics}
          handleDelete={handleDelete}
          myWidget={myWidget}
        />
        <StyledSendButton>Item aktualisieren</StyledSendButton>
        <AbortButton
          style={{ width: '100%' }}
          onClick={() => history.goBack()}
          label="Abbrechen"
        />
      </StyledForm>
    </FormWrapper>
  )
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
