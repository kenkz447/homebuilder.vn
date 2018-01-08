
export const required = value => {
    return value ? undefined : 'Required'
}

export const requiredWithMessage = (message) => (value) => {
    return value ? undefined : message
}

export const maxLength = max => value => {
    return value && value.length > max ? `Must be ${max} characters or less` : undefined
}

export const minLength = min => value => {
    return value && value.length < min ? `Must be ${min} characters or more` : undefined
}

export const noSpace = (message = 'Space not allowed') => (value: string) => {
    return value.includes(' ') ? message : undefined
}