"use client"

import React, {useEffect, useState} from "react";

function getSavedValue(key: string, initialValue: any) {
  if (typeof window === "undefined") {
    return typeof initialValue === "function"
      ? initialValue()
      : initialValue
  }

  const savedValue = localStorage.getItem(key)

  if (savedValue !== null) {
    return savedValue
  }

  return typeof initialValue === "function"
    ? initialValue()
    : initialValue
}


export default function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        const storedValue = localStorage.getItem(key)
        if (storedValue) {
            setValue(storedValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("name", value)
    }, [value])

    return [value, setValue]
}