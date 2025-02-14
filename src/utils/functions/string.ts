import * as CryptoJS from "crypto-js"

export function cleanString(string: string): string {
    return string.replace(/[^A-z0-9\s]/g, "").toLowerCase()
}

export function encrypto(content: string): string {
    let ciphertext

    try {
        ciphertext = CryptoJS.AES.encrypt(content, process.env.ENCRYPT_KEY)
    } catch {
        return "noencrypt:@:"
    }

    return ciphertext.toString()
}

export function decrypt(ciphertext: string): string {
    if (ciphertext.startsWith("noencrypt:@:")) {
        return ciphertext.split("noencrypt:@:")[1]
    }

    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPT_KEY)
    
    return bytes.toString(CryptoJS.enc.Utf8)
}

export function getZeroWidth() {
    return ""
}

export function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 MB"

    const k = 1000
    const sizes = ["MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const minimumUnitIndex = 0
    
    let i =Math.floor(Math.log(bytes) / Math.log(k))

    if (i < minimumUnitIndex + 2) {
        i = minimumUnitIndex + 2
    }

    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2))
    return `${value} ${sizes[ i - 2]}`
}

export function getOrdinalSuffix(num: number): string {
    const lastDigit = num % 10
    const lastTwoDigits = num % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return "th";
    }

    switch (lastDigit) {
        case 1:
            return "st"
        case 2:
            return "nd"
        case 3: 
            return "rd"
        default:
            return "th"
    }
}

export function FormatTime(ms: number) {
    const minutes = Math.floor(ms / 60000)
    let seconds = ((ms % 60000) / 1000).toFixed(2)

    if (minutes > 0) {
        seconds = Math.round((ms % 60000) / 1000).toString()
    }

    return `${minutes > 0 ? `${minutes}m` : ""}${seconds}s`
}