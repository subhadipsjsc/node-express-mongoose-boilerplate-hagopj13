function base64UrlEncode (str){
    str  = str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');;
    return str
}

module.exports =  base64UrlEncode