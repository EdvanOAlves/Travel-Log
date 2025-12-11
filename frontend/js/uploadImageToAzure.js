"use strict"

const TOKEN_PROFILE = "sp=c&st=2025-12-11T00:16:34Z&se=2025-12-20T03:00:00Z&sv=2024-11-04&sr=c&sig=6UGm0MDrT0lNu4o6Lx2RXBw5do5yk6g5SFes3rFM4c4%3D"
const TOKEN_LOG = "sp=c&st=2025-12-11T00:37:42Z&se=2025-12-20T03:00:00Z&spr=https&sv=2024-11-04&sr=c&sig=iLcABEgTFCqBVhJ7FZNQhHieVnrL%2FBHgGEkqQvCoRQg%3D"
const TOKEN_VIAGEM = "sp=c&st=2025-12-11T00:38:51Z&se=2025-12-20T03:00:00Z&sv=2024-11-04&sr=c&sig=eO5Hmlf0Kj5q9yUcp%2F9MUnefJGThjZI%2FWNeH5zzdfM4%3D"

export async function uploadImageToAzure(uploadParams) {
    
    const { storageAccount, containerName, file, sasToken } = uploadParams

    const fileName = `${Date.now()}-${file.name}`

    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${fileName}`

    const uploadUrl = `${baseUrl}?${sasToken}`

    const options = {
        method: "PUT",
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'application/octet-stream'
        },
        body: file
    }

    const response = await fetch(uploadUrl, options)
    if (response.ok) {
        return baseUrl
    }

}   
