import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"
import formidable from "formidable"
import fs from "fs"

export const config = {
  api: {
    bodyParser: false,
  },
}

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID 
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID

if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_DRIVE_FOLDER_ID || !GOOGLE_SHEET_ID) {
  throw new Error("Faltan variables de entorno de Google API")
}

const auth = new google.auth.JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets"
  ]
})

const drive = google.drive({ version: "v3", auth })
const sheets = google.sheets({ version: "v4", auth })

async function parseForm(req: NextApiRequest): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true })
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

async function createDriveFolder(name: string): Promise<string> {
  console.log("📁 Creando carpeta en Drive:", name)

  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [GOOGLE_DRIVE_FOLDER_ID!],
    },
    fields: "id",
  }) as any

  console.log("✅ Carpeta creada con ID:", res.data.id)
  return res.data.id
}

async function uploadFileToFolder(folderId: string, file: any): Promise<string> {
  console.log(`📤 Subiendo archivo "${file.originalFilename}" a carpeta ${folderId}`)

  if (!folderId) throw new Error("❌ folderId vacío")

  const fileMetadata = {
    name: file.originalFilename,
    parents: [folderId],
  }
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.filepath),
  }

  // Validar que el archivo existe
  if (!fs.existsSync(file.filepath)) {
    throw new Error(`❌ Archivo no encontrado en ruta temporal: ${file.filepath}`)
  }

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink",
  }) as any

  console.log(`✅ Archivo subido. ID: ${res.data.id}, Link: ${res.data.webViewLink}`)
  return res.data.webViewLink
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Formulario de asociarse temporalmente deshabilitado
  return res.status(503).json({ 
    error: "El formulario de asociarse está temporalmente deshabilitado. Los permisos de Google Workspace están siendo configurados. Por favor, contacta directamente al club para más información." 
  })
}
