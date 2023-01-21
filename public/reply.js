function get_message_id_from_context(context){
    var hashed_context = CryptoJS.MD5(context).toString();
    if(hashed_context == '237e4a15d0cb938c0e73eef93365852f'){
        return 1;
    }
    if(hashed_context == 'dbe81c79e014504b8fe17d39e53b0647'){
        return 2;
    }
    if(hashed_context == '88b5f7a3f7beac8dfaee54f6e0320a89'){
        return 3;
    }
    if(hashed_context == '938352b16eb7f4c08e08de37ca383b47'){
        return 4;
    }
    if(hashed_context == '7a70646ec092059a7ad6c545204811ae'){
        return 5;
    }
    if(hashed_context == '38cb346e557376e3ee63bee9cbd8e208'){
        return 6;
    }
    if(hashed_context == '2ad3b960adf57852d5a3d13c40e1dca3'){
        return 7;
    }
    if(hashed_context == 'c0e0a0e8dea1e3e75bb3538d1c53852a'){
        return 8;
    }
    return -1;
    
}

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

var initial_hint = "【重要操作指引】<br>请在旭岽的微博中，找到一串以in8g开头，m1pf结尾的字符串。把它输入到下方文本框中，点击context。这样才能开始本部分的闯关。<br>另外，context会在闯关过程中自动更新。如果你中途退出，请记录输入框下方的context, 并在重新进入时输入，并点击context键。<br>重要提示：context本身是随机生成的，目的只是为了防止抢跑和避免跳关，在任何谜题的解答中都不应当参考。在你尝试解答迷题时，只需要输入答案到文本框中，然后点击send按钮。"
var train1 = "一辆列车驶来，将你送回了最开始的洞口。"
var train2 = "一辆列车驶来，将你送往到了公众号“叨科学”，这里有一个洞口。"
var train3 = "一辆列车驶来，将你送往到了“旭岽叨科学”，你找到了一个杂物箱。"
var train4 = "一辆列车驶来，绕了一大圈后，又把你送回了这里。"
var train5 = "一辆列车驶来，将你送往到了公众号“天文茶餐厅”，这里有一个洞口。"


var train = [train1, train2, train3, train4, train5];

var encoded = [
"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"
];

var last_action = Date.now();

function get_reply(word, context){
    console.log(Date.now() - last_action)
    if(Date.now() - last_action < 500){
        last_action = Date.now()
        
        return "操作过于频繁"
    }
    last_action = Date.now()

    if(word == "我要乘坐原样号列车前往其他洞口"){
        var time = Date.now();
        if (time > 20_0000_0000){
            time = Math.round(time / 1000);
        }
        var index =time % 5;
        console.log(index);
       
        return train[index];
    }

    if(context == "blank"){
        return initial_hint;
    }

    

    var message_id = get_message_id_from_context(context);
    console.log("message",message_id);
    if(message_id > 0 ){
        data = decode(encoded[message_id -1 ], context + word);
        if(data){
            new_context = data.next_context
            console.log(data.id)
            return "ok"+data.text
        }else{
           
            return "再试试别的答案吧！";
        }
    }else{
       
       
          
            return initial_hint;
        
    }
    
}

function get_new_context(){
    console.log(new_context);
    return new_context;
}






