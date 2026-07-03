"use client"

import { useRef, useState } from "react"

interface FormValues {
  name: string
  email: string
  body: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type Toast = {
  type: "success" | "error"
  message: string
}

const initialValues: FormValues = {
  name: "",
  email: "",
  body: "",
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const toastTimeoutRef = useRef<number | null>(null)

  const validate = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nextValues.name.trim()) {
      nextErrors.name = "Add your name."
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = "Add your email."
    } else if (!emailPattern.test(nextValues.email.trim())) {
      nextErrors.email = "Use a valid email address."
    }

    if (!nextValues.body.trim()) {
      nextErrors.body = "Write a short message."
    }

    return nextErrors
  }

  const updateValue = (field: keyof FormValues, value: string) => {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)

    if (submitted || errors[field]) {
      setErrors(validate(nextValues))
    }
  }

  const showToast = (nextToast: Toast) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current)
    }

    setToast(nextToast)
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 5000)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setToast(null)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      showToast({ type: "error", message: "Please fix the highlighted fields." })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          body: values.body.trim(),
        }),
      })

      const result = (await response.json().catch(() => null)) as { message?: string } | null

      if (!response.ok) {
        throw new Error(result?.message ?? "Could not send the message.")
      }

      setValues(initialValues)
      setSubmitted(false)
      setErrors({})
      showToast({ type: "success", message: "Message sent. I will get back to you soon." })
    } catch (error) {
      showToast({
        type: "error",
        message: error instanceof Error ? error.message : "Could not send the message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field: keyof FormValues) =>
    `border-0 border-b bg-transparent px-0 py-3 font-mono text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white ${
      errors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-gray-200 dark:border-gray-800"
    }`

  const errorClass = "mt-2 font-mono text-xs text-red-500 dark:text-red-400"

  return (
    <form noValidate onSubmit={handleSubmit} className="relative flex flex-col gap-6">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-50 w-[calc(100%-3rem)] max-w-sm -translate-x-1/2 rounded-md px-4 py-3 font-mono text-sm shadow-lg md:left-auto md:right-6 md:translate-x-0 ${
            toast.type === "success"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={(event) => updateValue("name", event.target.value)}
          className={inputClass("name")}
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className={errorClass}>{errors.name}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={(event) => updateValue("email", event.target.value)}
          className={inputClass("email")}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className={errorClass}>{errors.email}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="body" className="mb-2 font-mono text-sm text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          required
          id="body"
          name="body"
          rows={3}
          value={values.body}
          onChange={(event) => updateValue("body", event.target.value)}
          className={`${inputClass("body")} resize-none`}
          placeholder="How can I help you?"
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? "body-error" : undefined}
        />
        {errors.body && <p id="body-error" className={errorClass}>{errors.body}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-fit cursor-pointer border-b border-black pb-1 font-mono text-sm text-black transition-[color,opacity] hover:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:text-white dark:hover:text-gray-400"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  )
}
