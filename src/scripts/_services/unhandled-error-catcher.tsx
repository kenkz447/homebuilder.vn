import { ShowNotificationBind } from 'scripts/_services/antd-notification'

window.onerror = function (msg, url, line, col, error) {
    if (!window['__DEV__'])
        return
    
    // Note that col & error are new to the HTML 5 spec and may not be 
    // supported in every browser.  It worked for me in Chrome.
    var extra = !col ? '' : '\ncolumn: ' + col
    extra += !error ? '' : '\nerror: ' + error
    ShowNotificationBind
    // You can view the information in an alert to see things working like this:
    ShowNotificationBind({
        notifyType: 'error',
        message: 'Unhandled error catched!',
        description: 'Error: ' + msg + '\nurl: ' + url + '\nline: ' + line + extra
    }, )
 
    // TODO: Report this error via ajax so you can keep track
    //       of what pages have JS issues
 
    const suppressErrorAlert = true
    // If you return true, then error alerts (like in older versions of 
    // Internet Explorer) will be suppressed.
    return suppressErrorAlert
 }