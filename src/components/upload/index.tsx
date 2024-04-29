import { ChangeEvent } from "react"

type UploadProps = {
  onFileChange: (file: File) => void
}

const Upload = ({ onFileChange }: UploadProps) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if(selectedFile) {
      onFileChange(selectedFile)
    }
  }

  return(
    <>
      <div className="flex justify-between">
        <div className="flex items-center w-full">
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-center w-full"
          >
            Procurar
          </label>
        </div>
      </div>
    </>
  )
}

export { Upload }