"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleX, DollarSign, Upload, X } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Controller, useForm } from "react-hook-form"

import { clientEnv } from "@/env/client"
import { ProductSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CategorySelect from "@/components/ui/category-select"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/ui/shadcn-io/icon-button"
import { Textarea } from "@/components/ui/textarea"

import {
  deleteImageFromDatabase,
  getSignature,
  handleUpdateProduct,
  saveToDatabase,
} from "./actions"

export default function EditProductForm({ product, onClose }) {
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    },
  })
  const router = useRouter()
  const [productImages, setProductImages] = useState(product.images)
  const [deletedImages, setDeletedImages] = useState([])
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const isEditingImages = files.length > 0 || deletedImages.length > 0

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ])
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 10,
    onDrop,
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
  }

  async function uploadImages() {
    // get a signature using server action
    const { timestamp, signature } = await getSignature()

    // upload to cloudinary using the signature
    const formData = new FormData()
    let images = []

    for (let file of files) {
      formData.append("file", file)
      formData.append("api_key", clientEnv.NEXT_PUBLIC_CLOUDINARY_KEY)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("folder", "products")

      const endpoint = clientEnv.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
      const data = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then((res) => res.json())
      const image = { public_id: data.public_id, url: data.secure_url }
      images.push(image)

      // write to database using server actions
      await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id,
      })
    }
    return images
  }

  const handleDeletedImage = (index) => {
    const updatedImages = [...productImages]
    const deletedImage = updatedImages.splice(index, 1)[0]
    setProductImages(updatedImages)
    setDeletedImages((prevDeletedImages) => [
      ...prevDeletedImages,
      deletedImage,
    ])
  }

  async function deleteImages() {
    // Create formData
    const formData = new FormData()

    // for each image of deletedImages, delete image from cloudinary, then from MongoDB
    for (let image of deletedImages) {
      const { timestamp, signature } = await getSignature(image.public_id)
      formData.append("public_id", image.public_id)
      formData.append("signature", signature)
      formData.append("api_key", env.NEXT_PUBLIC_CLOUDINARY_KEY)
      formData.append("timestamp", timestamp)

      const endpoint = env.NEXT_PUBLIC_CLOUDINARY_DESTROY_URL
      const data = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then((res) => res.json())

      console.log(data)
      await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id,
      })

      await deleteImageFromDatabase(product._id, image._id)
    }
  }

  const onSubmit = async (data) => {
    const updatedProduct = { ...data, _id: product._id }
    if (files.length > 0) {
      const images = await uploadImages()
      updatedProduct.images = images
    }
    if (deletedImages.length > 0) await deleteImages()
    await handleUpdateProduct(updatedProduct)
    router.refresh()
    onClose()
  }

  return (
    <form
      id="form-edit-product"
      className="p-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-edit-product-title">
                Title (required):
              </FieldLabel>
              <Input
                {...field}
                id="form-edit-product-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="text-sm"
              />
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-edit-product-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="form-edit-product-description"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="text-sm"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-edit-product-price">Price</FieldLabel>
              <div className="relative">
                <DollarSign className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
                <Input
                  {...field}
                  id="price"
                  type="number"
                  step="0.01"
                  aria-invalid={fieldState.invalid}
                  className="pl-8"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <CategorySelect control={form.control} />

        {/* Current Product Images */}
        <div className="flex flex-wrap border outline-dashed">
          {productImages.map((imageUrl, index) => (
            <div key={index} className="w-1/6 p-2">
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt={`Product Image ${index + 1}`}
                  width={200}
                  height={200}
                  layout="responsive"
                  className="rounded-lg"
                />
                <IconButton
                  className="absolute bottom-6 left-6 text-destructive"
                  onClick={() => handleDeletedImage(index)}
                  icon={CircleX}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add images */}
        <Field>
          <FieldLabel htmlFor="images">Images (Optional):</FieldLabel>
          <Card
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <Input {...getInputProps({ name: "file" })} />
              <div className="flex flex-col items-center justify-center gap-4">
                <Upload />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop files here, or click to select files</p>
                )}
              </div>
            </CardContent>
          </Card>
        </Field>

        {/* Preview Selected Images */}
        <section className="mt-4">
          <div className="flex flex-row justify-between">
            <h2 className="title text-3xl font-semibold">Preview</h2>
            <Button
              variant="outline"
              disabled={files.length === 0}
              onClick={removeAll}
              className="uppercase"
            >
              Remove all files
            </Button>
          </div>

          {/* Accepted files */}
          <h3 className="border-b font-semibold">Accepted Files</h3>
          <ul className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                  className="h-full w-full rounded-md object-contain"
                />
                <IconButton
                  icon={X}
                  onClick={() => removeFile(file.name)}
                  className="absolute -top-4 -right-4 bg-destructive text-white hover:bg-red-600"
                />
                <p className="mt-2 text-[12px] font-medium text-stone-500">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Rejected Files */}
          <h3 className="mt-24 border-b pb-3 font-semibold">Rejected Files</h3>
          <ul className="mt-6 flex flex-col">
            {rejected.map(({ file, errors }) => (
              <li key={file.name} className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-sm font-medium text-stone-500">
                    {file.name}
                  </p>
                  <ul className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <IconButton
                  icon={X}
                  className="bg-destructive text-white hover:bg-red-600"
                  onClick={() => removeRejected(file.name)}
                />
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-row justify-end gap-2">
          <Button className="bg-destructive hover:bg-red-600" onClick={onClose}>
            Cancel
          </Button>

          <Button
            className={`${
              !isEditingImages && !form.formState.isDirty
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="submit"
            disabled={!isEditingImages && !form.formState.isDirty}
          >
            Save changes
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
