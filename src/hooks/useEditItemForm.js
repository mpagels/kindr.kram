import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function useNewItemForm() {
  let history = useHistory()
  const { id } = useParams()
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
    reset,
  } = useForm()

  useEffect(() => {
    fetch('/api/item/' + id, {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        reset({
          itemName: data.name,
          price: data.price,
          description: data.description,
        })
      })
  }, [])

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

  return {
    myWidget,
    uploadedPics,
    register,
    handleSubmit,
    createNewItem,
    handleDelete,
    errors,
  }
}
