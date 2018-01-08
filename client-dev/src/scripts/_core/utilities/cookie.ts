/**
 * Store the value
 * @param cname Cookie name
 * @param cvalue Cookie value
 * @param exp Expiration date, in mili second
 */
export function setCookie(cname, cvalue, exp) {
    const date = new Date()
    date.setTime(date.getTime() + exp)
    const expires = date.toUTCString()
    document.cookie = `${cname}=${cvalue};expires=${expires}`
}

/**
 * function that returns the value of a specified cookie
 * @param cname Cookie name
 */
export function getCookie(cname) {
    const name = `${cname}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
}