export const azx = () => { }

export const getDate = (dateString: Date | number | string | undefined) => {
    if (dateString) {
        const date = new Date(dateString)
        if (date.getHours() === 24) date.setHours(0)
        return date.toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    }
}

export const chunkArray = (arr: any[], chunkSize: number) => {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize))
    }
    return result
}

export const sortArray = (arr: any[], key: string | number, order?: boolean) => {
    return arr.slice().sort((a: any, b: any) => {
        const aValue = a[key]
        const bValue = b[key]
        if (typeof aValue !== 'number' && !aValue) return 1
        if (typeof bValue !== 'number' && !bValue) return -1
        return order ? aValue < bValue ? 1 : -1 : aValue < bValue ? -1 : 1
    })
}

export const filterArray = (arr: any[], key: string | number, filter: string) => {
    if (key === 'name') return arr.filter(element => element.name?.toLocaleLowerCase().includes(filter))
    if (key === 'office') return arr.filter(element => element.office?.toLocaleLowerCase().includes(filter))
    return arr
}

export const goToUrl = (url: string) => {
    const anchor = document.createElement('a')
    anchor.target = '_blank'
    anchor.href = url
    anchor.click()
}

export const getTimeOption = (arr: any[], value: number) => {
    return arr.find(item => item.value === value) || { name: '', value: '' }
}

export const isTooBright = (color: string | undefined) => {
    color = color === 'gray' ? '#808080' :
        color === 'lightgray' ? '#d3d3d3' : color === 'black' ? '#000000' : color === 'white' ? '#ffffff' : color
    if (!color || !color.includes('#')) return false
    const hexToRgb = (hex: string) =>
        hex.match(/[A-Za-z0-9]{2}/g)?.map((v) => parseInt(v, 16))
    const [r, g, b] = hexToRgb(color) || []
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255)
    const threshold = 0.5
    return luminance > threshold
}

export const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => position, (error) => { console.error("Error getting location:", error) }
        );
    } else {
        console.error("Geolocation is not supported by this browser")
    }
}

export const toHex = (str: string) => {
    var result = ''
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16)
    }
    return result
}

export const getUser = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}

export const parseDateTime = (time: Date) => {
    const string = time ?
        getDate(time)
        : 'No data'
    return string ? string.split(' ').join(' - ') : ''
}

export const getDateWithGivenHour = (hour: number) => {
    /* Build dates with given hours passed */
    const today = new Date()
    today.setMinutes(0)
    today.setSeconds(0)
    today.setHours(today.getHours() - hour)
    return today.toLocaleString()
}

export const getDomain = (url: string) => {
    const match = url.match(/https?:\/\/(?:www\.)?(?:[a-zA-Z0-9]+\.)?([a-zA-Z0-9]+)\./);
    const domain = match ? match[1] : null
    return domain || ''
}

export const emailIsValid = (email: string) => {
    if (
        !email ||
        !email.includes('@') ||
        !email.split('@')[1].includes('.') ||
        email.split('@')[1][0] === '.' ||
        email.length < 5
    ) return false
    return true
}

export const retryWithDelay = async <T>(fn: () => Promise<T>, maxAttempts: number, delayMs = 1000): Promise<T> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    let attempts = 0
    while (attempts < maxAttempts) {
        try {
            const result = await fn()
            if (result) {
                return result
            }
        } catch (err: any) {
            console.error(`Attempt ${attempts + 1} failed: ${err.message}`)
        }
        attempts++
        await delay(delayMs)
    }
    throw new Error(`Maximum retry attempts reached (${maxAttempts})`)
}

export const pause = (miliseconds?: number) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds || 1000))
}
