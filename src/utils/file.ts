export const generateFileName = (imgFile: File) => {
  let fileName = ''
  if (imgFile) {
    const fileType = imgFile.type
    let fileExt = fileType.split('/').pop()
    if (fileExt === 'jpeg') {
      fileExt = 'jpg'
    }
    fileName = `image.${fileExt}`
  }

  return fileName
}
