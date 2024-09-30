'use client'

import { useState, useRef } from 'react'
import { Button } from "./button"
import { Progress } from "./progress"
import { Upload, FileIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props{
    onfileupload: (arg: File | null) => void
}
export default function FileUpload({ onfileupload}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File|null>(null);

  // Triggered when a file is selected
  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);  // Save file to state
    onfileupload(selectedFile)
    simulateUpload();
  }

  // Triggered when file input changes (file is selected)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) handleFile(selectedFile)
  }

  // Manages the drag over event
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  // Handles drag leave
  const handleDragLeave = () => {
    setIsDragging(false)
  }

  // Handles drop event for drag and drop
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) handleFile(droppedFile)
  }

  // Simulates an upload with progress
  const simulateUpload = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 50)
  }

  // Remove the uploaded file
  const removeFile = () => {
    setFile(null)
    setProgress(0)
  }

  // Formats file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full max-w-md mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg flex items-center justify-center">
      <AnimatePresence>
        {!file ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              aria-label="File upload"
            />
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">Any file type up to 10MB</p>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()} // Opens file input dialog
              variant="outline" 
              className="mt-4 w-full"
            >
              Select File
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileIcon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile} aria-label="Remove file">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-xs text-gray-500 mt-2 text-center">
              {progress === 100 ? 'Upload complete!' : `Uploading... ${progress}%`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
