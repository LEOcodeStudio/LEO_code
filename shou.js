/**
 * Syc <github.com/SycAlright>
 * Beast_SDK JavaScript
 */

const beastDictArr = ['嗷', '呜', '啊', '~']

function encode(rawStr) {
    let charArr = rawStr.split("")
    let unicodeHexStr = ""
    for (let i = 0; i < charArr.length; i++) {
        let charHexStr = charArr[i].charCodeAt(0)
            .toString(16)
        while (charHexStr.length < 4) {
            charHexStr = "0" + charHexStr
        }
        unicodeHexStr += charHexStr
    }
    let k = 0
    let unicodeHexStrArr = unicodeHexStr.split("")
    let beastStr = ""
    for (let i = 0; i < unicodeHexStrArr.length; i++) {
        let unicodeHexCharValue = parseInt("0x" + unicodeHexStrArr[i])
        k = unicodeHexCharValue + (i % 0x10)
        if (k >= 0x10) {
            k = k - 0x10;
        }
        beastStr += beastDictArr[parseInt(k / 4)] + beastDictArr[(k % 4)]
    }
    return beastStr
}

function decode(beastStr) {
    let unicodeHexStr = ""
    let beastStrArr = beastStr.split("")
    for (let i = 0; i <= (beastStr.length - 2); i += 2) {
        let beastCharStr = ""
        let pos1 = 0
        beastCharStr = beastStrArr[i];
        for (; pos1 <= 3; pos1++) {
            if (beastCharStr == beastDictArr[pos1]) {
                break
            }
        }
        let pos2 = 0
        beastCharStr = beastStrArr[i + 1]
        for (; pos2 <= 3; pos2++) {
            if (beastCharStr == beastDictArr[pos2]) {
                break;
            }
        }
        let k = (pos1 * 4) + pos2;
        let unicodeHexCharValue = k - (parseInt(i / 2) % 0x10);
        if (unicodeHexCharValue < 0) {
            unicodeHexCharValue += 0x10;
        }
        unicodeHexStr += unicodeHexCharValue.toString(16)
    }
    let rawStr = ""
    let start = 0
    let end = 4
    while (end <= unicodeHexStr.length) {
        let charHexStr = unicodeHexStr.substring(start, end);
        let charStr = String.fromCharCode(parseInt("0x" + charHexStr))
        rawStr += charStr
        start += 4
        end += 4
    }
    return rawStr
}

function focusNextInput(thisInput) {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        // 如果是最后一个，则焦点回到第一个
        if (i == (inputs.length - 1)) {
            inputs[0].focus();
            break;
        } else if (thisInput == inputs[i]) {
            inputs[i + 1].focus();
            break;
        }
    }
}
var title = document.getElementById('title');
var set = document.getElementById('set').onclick = function(){
    var content = document.getElementById('content');
    if(!content.value){
        title.innerText = '请输入需要加/解密的内容';
        alert('请输入需要加密的内容');
        return false;
    }else{
        content.value = encode(content.value);
        title.innerText = '加密结果';
        //alert('加密完成');
        var userreturn = confirm('加密完成是否复制？');
        if(userreturn){
            content.select();
            document.execCommand('copy');
            window.getSelection().empty();
            return true;
        }
        return true;
    }
}
var setto = document.getElementById('setto').onclick = function(){
    var content = document.getElementById('content');
    if(!content.value){
        title.innerText = '请输入需要加/解密的内容';
        alert('请输入需要解密的内容');
        return false;
    }else{
        content.value = decode(content.value);
        title.innerText = '解密结果';
        //alert('解密完成');
        var userreturn = confirm('解密完成是否复制？');
        if(userreturn){
            content.select();
            document.execCommand('copy');
            window.getSelection().empty();
            return true;
        }
        return true;
    }
}
var content = document.getElementById('content');
content.oninput = function(){
    if(!content.value){
        title.innerText = '请输入需要加/解密的内容';
        return true;
    }
    return false;
}
