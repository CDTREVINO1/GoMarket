"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign, Upload, X } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Controller, useForm } from "react-hook-form"

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
import { Textarea } from "@/components/ui/textarea"

import { getSignature, handleCreateProduct, saveToDatabase } from "./actions"

export default function CreateProductForm({ setOpen }) {
  const form = useForm({ resolver: zodResolver(ProductSchema) })
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const router = useRouter()
  const isAddingImages = files.length > 0

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
      formData.append("folder", "products")

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

  const onSubmit = async (data) => {
    const newProduct = { ...data }

    if (files.length > 0) {
      const images = await uploadImages()
      newProduct.images = images
    }

    await handleCreateProduct(newProduct)
    router.refresh()
    setOpen(false)
    // form.reset()
  }

  return (
    <form
      id="form-create-product"
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-4"
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-product-title">Title</FieldLabel>
              <Input
                {...field}
                id="form-create-product-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-product-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="form-create-product-description"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
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
              <FieldLabel htmlFor="form-create-product-price">Price</FieldLabel>
              <Input
                {...field}
                id="price"
                type="number"
                step="0.01"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <CategorySelect control={form.control} />

        <Field>
          <FieldLabel htmlFor="images">Images (Optional):</FieldLabel>
          <Card
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <CardContent className="flex flex-col items-center justify-center gap-4 py-10">
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

        {/* Preview */}
        {(files.length > 0 || rejected.length > 0) && (
          <section className="mt-10">
            <div className="flex gap-4">
              <h2 className="title text-3xl font-semibold">Preview</h2>
              <button
                type="button"
                onClick={removeAll}
                className="mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold tracking-wider text-stone-500 uppercase transition-colors hover:bg-rose-400 hover:text-white"
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
                  <button
                    type="button"
                    className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                    onClick={() => removeFile(file.name)}
                  >
                    <X />
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
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
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
                    className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold tracking-wider text-stone-500 uppercase transition-colors hover:bg-rose-400 hover:text-white"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="text-center">
          <Button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-700"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className={`ml-2 rounded px-4 py-2 text-white ${
              !isAddingImages && !form.formState.isDirty
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="submit"
            disabled={!isAddingImages && !form.formState.isDirty}
          >
            Create Product
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
