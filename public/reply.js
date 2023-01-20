function encode(content, password) {

    var raw = content
    var aseKey = password;
    var key = CryptoJS.enc.Hex.parse(CryptoJS.SHA512(password).toString());
    var iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(password).toString())
    //加密
    var encrypt = CryptoJS.AES.encrypt(JSON.stringify(raw), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypt.toString();//加密后的数据
}

function decode(content, password) {
    var key = CryptoJS.enc.Hex.parse(CryptoJS.SHA512(password).toString());
    var iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(password).toString())

    var decrypt = CryptoJS.AES.decrypt(content, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    try {
        var data3 = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return null;
    }
    //解密后的数据
    return data3;
}

var new_context = "";

function get_reply(word, context){
    new_context = context + "new";
    image = "<img src=\"https://img1.imgtp.com/2023/01/21/t1SQmY0N.png\" alt=\"4.4.2.png\" title=\"4.4.2.png\" />";
    return "I am replaying for "+word + "context is" + context + image;
}

function get_new_context(){
    return new_context;
}

