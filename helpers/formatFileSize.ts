export const formatFileSize = (sizeInBytes: number) :string=>{
    const units = ["bytes", "KB","MB","GB","TB"]
    const conversionNumber = 1024
    let unitIndex = 0
    while (sizeInBytes >= conversionNumber && unitIndex <= units.length-1){
        sizeInBytes /= conversionNumber
        unitIndex++
    }
    return `${sizeInBytes.toFixed(2)}${units[unitIndex]}`

}