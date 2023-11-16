"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductSchema } from "lib/schema"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"

import {
  deleteImageFromDatabase,
  getSignature,
  handleUpdateProduct,
  saveToDatabase,
} from "./actions"

export default function EditProductForm({ product, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
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
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("folder", "next")

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
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
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY)
      formData.append("timestamp", timestamp)

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_DESTROY_URL
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 dark:text-gray-300">
      <label
        htmlFor="name"
        className="block font-semibold text-gray-700 dark:text-gray-300"
      >
        Name (required):
      </label>
      <input
        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800"
        type="text"
        id="name"
        {...register("name")}
      />
      {errors.name?.message && (
        <p className="text-red-600">{errors.name.message}</p>
      )}

      <label
        htmlFor="description"
        className="block mt-4 font-semibold text-gray-700 dark:text-gray-300"
      >
        Description:
      </label>
      <textarea
        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800"
        id="description"
        {...register("description")}
      />
      {errors.description?.message && (
        <p className="text-red-600">{errors.description.message}</p>
      )}

      <label
        htmlFor="price"
        className="block mt-4 font-semibold text-gray-700 dark:text-gray-300"
      >
        Price (required):
      </label>
      <input
        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800"
        type="number"
        id="price"
        step="any"
        {...register("price", { valueAsNumber: true })}
      />
      {errors.price?.message && (
        <p className="text-red-600">{errors.price.message}</p>
      )}

      <label htmlFor="category" className="block font-semibold text-gray-700">
        Category:
      </label>
      <input
        className="w-full rounded-lg border px-3 py-2 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        id="category"
        {...register("category")}
      />
      {errors.category?.message && (
        <p className="text-red-600">{errors.category.message}</p>
      )}

      <div className="mb-6 flex flex-wrap">
        {productImages.map((image, index) => (
          <div key={index} className="w-1/6 p-2">
            <div className="relative">
              <Image
                src={image.url}
                alt={`Product Image ${index + 1}`}
                width={200}
                height={200}
                layout="responsive"
                className="rounded-lg"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-red-500"
                onClick={() => handleDeletedImage(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add images */}
      <label htmlFor="images" className="block font-semibold text-gray-700">
        Images (Optional):
      </label>
      <div
        {...getRootProps({
          className: "dropzone",
        })}
      >
        <input {...getInputProps({ name: "file" })} />
        <div className="flex flex-col items-center justify-center gap-4">
          <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-10">
        <div className="flex gap-4">
          <h2 className="title text-3xl font-semibold">Preview</h2>
          <button
            type="button"
            onClick={removeAll}
            className="mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
          >
            Remove all files
          </button>
        </div>

        {/* Accepted files */}
        <h3 className="title mt-10 border-b pb-3 text-lg font-semibold text-stone-600">
          Accepted Files
        </h3>
        <ul className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {files.map((file) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
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
              <button
                type="button"
                className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className="h-5 w-5 fill-white transition-colors hover:fill-rose-400" />
              </button>
              <p className="mt-2 text-[12px] font-medium text-stone-500">
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h3 className="title mt-24 border-b pb-3 text-lg font-semibold text-stone-600">
          Rejected Files
        </h3>
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
              <button
                type="button"
                className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-700"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className={`ml-2 rounded px-4 py-2 text-white ${
            !isEditingImages && !isDirty
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          type="submit"
          disabled={!isEditingImages && !isDirty}
        >
          Save product
        </button>
      </div>
    </form>
  )
}
