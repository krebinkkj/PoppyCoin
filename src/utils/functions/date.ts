import dayjs = require("dayjs")

export function formatDate(date: Date | number | dayjs.Dayjs): string {
    return dayjs(date).format("D MMM YYYY").toLowerCase()
}

export function daysAgo(date: Date | number): number {
    date = new Date(date)
    const ms = Math.floor(Date.now() - date.getTime())

    return Math.floor(ms /(24 * 60 * 60 * 1000))
}

export function daysUntil(date: Date | number): number {
    date = new Date(date)
    const ms = Math.floor(date.getTime() - Date.now())

    return Math.floor(ms / (24 * 60 * 60 * 1000))
}

export function MStoTime(ms: number, long = false) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const dayms = ms % (24 * 60 * 60 * 1000)
    const hours = Math.floor(dayms / ( 60 * 60 * 1000))
    const hoursms = ms % ( 60 * 60 * 1000)
    const minutes = Math.floor(hoursms / (60 * 1000))
    const minutesms = ms % (60 * 1000)
    const sec = Math.floor(minutesms / 1000)

    let output = ""

    if (days > 0) {
        output = output + days
        if (long) {
            output += ` hora${hours == 1 ? "" : "s"}`
        } else {
            output += "h "
        }
    }

    if (minutes > 0) {
        output = output + minutes
        if (long) {
            output += `minuto${minutes == 1 ? "" : "s"} `
        } else {
            output += "m "
        }
    }

    if (sec > 0) {
        output = output + sec
        if (long) {
            output += ` segundo${sec == 1 ? "" : "s"} `
        } else {
            output += "s "
        }
    }

    return output.trim()
}