export function isMobile(userAgent) {
    return userAgent.indexOf('Mobile') >= 0 && userAgent.indexOf('iPad') < 0;
}
