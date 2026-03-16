export const generateSecurePassword = (length: number = 16): string => {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    return Array.from(array)
        .map(x => chars[x % chars.length])
        .join("")
}

export const passwordStrength = (form: { newPassword: any }) => {
    const pwd = form.newPassword
    let score = 0

    if (pwd.length > 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++

    return score
}