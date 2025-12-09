"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import placeholderPic from "@/public/placeholder.png"

import { Button } from "@/components/ui/button"

const Slider = ({ products }) => {
  const slideWidth = 400
  const [offset, setOffset] = useState(0)
  const [autoSlide, setAutoSlide] = useState(true)

  const moveNext = useCallback(() => {
    if (offset >= (products.length - 1) * slideWidth) {
      setOffset(0)
    } else {
      setOffset((prevOffset) => prevOffset + 10)
    }
  }, [offset, products.length])

  const jumpNext = () => {
    setAutoSlide(false)
    if (offset >= (products.length - 1) * slideWidth) {
      setOffset(0)
    } else {
      setOffset((prevOffset) => prevOffset + slideWidth)
    }
    setTimeout(() => setAutoSlide(true), 3000)
  }

  const jumpPrevious = () => {
    setAutoSlide(false)
    if (offset <= 0) {
      setOffset((products.length - 1) * slideWidth)
    } else {
      setOffset((prevOffset) => prevOffset - slideWidth)
    }
    setTimeout(() => setAutoSlide(true), 3000)
  }

  useEffect(() => {
    if (autoSlide) {
      const intervalId = setInterval(moveNext, 100)
      return () => clearInterval(intervalId)
    }
  }, [offset, autoSlide, moveNext])

  return (
    <div
      className="relative mb-6 overflow-hidden"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      <div
        style={{
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.1s linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...products, ...products].map((product, index) => {
          const linkPath = `/product/${product.handle}`

          return (
            <div
              key={index}
              className="inline-block min-h-fit w-80 p-4"
              style={{ flexShrink: 0 }}
            >
              <div className="flex h-full flex-col items-center justify-center space-y-8 rounded-xl border bg-card p-8 text-center">
                <Image
                  height={200}
                  width={200}
                  src={product.images[0] || placeholderPic}
                  alt={product.title}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <blockquote className="mx-4 text-wrap">
                  <h3>{product.title}</h3>
                </blockquote>
                <Button asChild>
                  <Link
                    href={linkPath}
                    className="transform rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105"
                  >
                    View Product
                  </Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={jumpPrevious}
        className="absolute top-1/2 left-2 rounded-full bg-blue-600 p-2 text-white"
      >
        ←
      </button>
      <button
        onClick={jumpNext}
        className="absolute top-1/2 right-2 rounded-full bg-blue-600 p-2 text-white"
      >
        →
      </button>
    </div>
  )
}

export default Slider
