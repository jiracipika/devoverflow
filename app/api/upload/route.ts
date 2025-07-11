import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: "dljbjggfj",
  api_key: "466515553717172",
  api_secret: "stVpF0GCUUi-nvEpzgy2dtaAQwA",
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "devoverflow",
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        .end(buffer)
    })

    return NextResponse.json({
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ message: "Upload failed" }, { status: 500 })
  }
}
