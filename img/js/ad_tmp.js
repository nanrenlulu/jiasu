function getEvalData(key) {
    try {
        if (dataTablesMin) {
            let result = dataTablesMin[key];
            if (typeof result == "string") {
                return eval("(" + result + ")");
            } else {
                return result;
            }
        } else {
            return "";
        }
    } catch (e) {
        console.log(e.message); //sojson is undefined
    }
}
var shouyehengfu = getEvalData("shouyehengfu");
var neiyehengfu = getEvalData("neiyehengfu");
var zuoyoupiaofu = getEvalData("zuoyoupiaofu");
var neiyedibu = getEvalData("neiyedibu");
var xiaoshuowenzi = getEvalData("xiaoshuowenzi");
var dianyingfangkuai = getEvalData("dianyingfangkuai");
var dainyingwenzi = getEvalData("dainyingwenzi");
var neirongdatu = getEvalData("neirongdatu");
var neironghengfu = getEvalData("neironghengfu");
var dibupiaofu = getEvalData("dibupiaofu");
var jingcaineirong = getEvalData("jingcaineirong");
var entertiao = getEvalData("entertiao");
var livezhuanu = getEvalData("livezhuanu");
var maomiqixia = getEvalData("maomiqixia");
var tesezhuanqu = getEvalData("tesezhuanqu");
