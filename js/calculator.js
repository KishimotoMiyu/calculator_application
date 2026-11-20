let num1 = ""; // 左辺
let num2 = ""; // 右辺
let operator = ""; // 演算子

/**
 * 数字または小数点ボタン押下時、値を取得
 */
function get_calc(btn) {

    // 演算子に値がなれけばnum1、あればnum2の値を確認する
    if(!operator){ // 演算子がない場合（num1）
        num1 = inputValueSet(num1 , btn);
        // 入力値画面に表示する
        document.getElementById("inputValue").innerHTML = num1;
        
    }else{
        // 入力済みの数値から小数点を除外した純粋な数字の長さを計算し、12桁に達している場合は新たな数字の入力を無視する
        num2 = inputValueSet(num2 , btn);
        // 電卓上部に表示する
        document.getElementById("displayCalc").innerHTML = num1 + operator;
        // 入力値画面に表示する
        document.getElementById("inputValue").innerHTML = num2;
    }
}

/**
 * 演算子ボタン押下時
 */
function get_operand(btn) {
    // num1の末尾が「.」または「-」、またはnum2に既に入力値がある場合は処理終了
    if (num1.endsWith(".") || num1.endsWith("-") || num2) return;
    
    // 入力値が「-」の場合
    if(btn.value == "-"){
        // num1が空値または0の場合は「-」にする
        if(!operator && (!num1 || num1 == "0")){
            num1 = "-";
            document.getElementById("inputValue").innerHTML = num1;
        // num2が空値または0の場合は「-」にする
        }else if( operator &&  (!num2 || num2 == "0")){
             num2 = "-";
             document.getElementById("displayCalc").innerHTML = num1 + operator;
             document.getElementById("inputValue").innerHTML = num2;
        }else{
            if(operator) return;
            operator = btn.value;
            document.getElementById("inputValue").innerHTML = num1 + operator;
        }
    // 入力値が「-」以外の場合
    } else {
      // 既に演算子が入力されている場合、処理終了
        if(operator) return;  
        // num1が空の場合、処理終了
        if(!num1) return;
        console.log("btn.value" , btn.value)
        operator = btn.value;
        // 入力値画面に表示する
        document.getElementById("inputValue").innerHTML = num1 + operator;
    }
}

/**
 * 1文字削除
 * 現在の入力値が2文字以上の場合は末尾の1文字を削除し、1文字だけの場合は '0' に戻す
 */
function get_clear() {

   // 演算子に値がなれけばnum1、あればnum2の値を確認する
   if(!operator){
        // 空値の場合、処理終了
        if(!num1 || num1 =="0" ) return;

        // 最後の一文字を削除した場合、0をセットする
        if(num1.length == 1){
            num1 = 0;
        } else {
            // それ以外の場合は末尾を一文字削除する
            num1 = num1.slice(0, -1);
        }

        console.log(num1)

        // 入力値画面に表示する
        document.getElementById("inputValue").innerHTML = num1;
    } else {
        
        // 空値の場合、処理終了
        if(!num2) return;

        // 最後の一文字を削除した場合、0をセットする
        if(num2.length == 1){
            num2 = 0;
        } else {
            // それ以外の場合は末尾を一文字削除する
            num2 = num2.slice(0, -1);
        }

        // 入力値画面に表示する
        document.getElementById("inputValue").innerHTML = num2;
    }
}

/**
 * イコール押下時、値を設定して送信
 */
function send_equal() {

    // 送信する値のいずれかが空値の場合、処理を終了
    if(!num1 || !num2 || !operator) return;

    // 送信する値のいずれかの末尾が「.」またはnum2の末尾が「-」の場合、処理を終了
    if(num1.endsWith(".") || num2.endsWith(".") || num1.endsWith("-") || num2.endsWith("-")) return;

    const form = createFrom("calculator" , "post"); // フォームを作成  
    const inputNum1 = createInput( num1 , "num1" , "hidden"); // 送信する値(num1)を作成
    const inputNum2 = createInput( num2 , "num2" , "hidden"); // 送信する値(num2)を作成
    const inputOpe = createInput( operator , "operator" , "hidden"); // 送信する値(operator)を作成
    const inputAction = createInput( 'calc' , "action" , "hidden"); // 送信する値(action)を作成

    // 値をセット
    const setValue = [inputNum1 , inputNum2 , inputOpe , inputAction];
    setAppendChildAndSendForm( form , setValue);
}

/**
 * オールクリア
 */
function send_allClear() {
    const form = createFrom("calculator" , "post"); // フォームを作成 
    const inputAction = createInput( "clear" , "action" , "hidden"); // 送信する値(num1)を作成
    const setValue = [inputAction];
    setAppendChildAndSendForm( form , setValue);
}

/**
 * 税込計算をする
 */
function send_taxIn() {
    send_tax("taxIn");
}

/**
 * 税抜計算をする
 */
function send_taxOut() {
    send_tax("taxOut");
}

/**
 * 税率計算にて、入力値に対してバリデーションチェックをしたのち、値をセットして返却
 */
function send_tax(action){
    if(operator) return;
    if(!num1) return;
    if(num1.endsWith(".")) return;
    const form = createFrom("calculator" , "post"); // フォームを作成 
    const inputNum1 = createInput( num1 , "num1" , "hidden"); // 送信する値(num1)を作成
    const inputAction = createInput( action , "action" , "hidden"); // 送信する値(num1)を作成
    const setValue = [inputNum1 , inputAction];
    setAppendChildAndSendForm( form , setValue);
}

/**
 * 入力値に対してバリデーションチェックをしたのち、値をセットして返却
 */
function inputValueSet(num , btn) {
    let returnNum = "";

    // 12文字の場合は処理終了
    if(num && num.replace(".", "").length == 12) return num;

    // 0の連続入力：1桁目に0が入力された場合は2桁目に0が入力不可
    if(num == "0" && btn.value == "0") return num;

    // 既に現在の入力値に小数点が含まれている場合かつ入力値が「.」の場合に処理終了
    if(num.toString().includes(".") && btn.value == ".") return num;

    // 入力値が「0」または空値時に「.」を入力すると、「0.」となる
    if((!num || num == "0") && btn.value == "."){
        returnNum = "0."
    }else{
        if(num == "0"){
            returnNum = btn.value;
        }else{
            // num末尾に入力値を追加する
            returnNum = num + btn.value;
        }
    }
    return returnNum;
}

/**
 * フォームを作成 
 */ 
function createFrom(action , method) {
    let form = ""; // formの初期化
    form = document.createElement('form');
    form.action = action;
    form.method = method;
    return form;
}

/**
 * inputを作成 
 */  
function createInput(value , name ,type) {
    const inputNum = document.createElement('input');
    inputNum.value = value;
    inputNum.name = name;
    inputNum.type = type;
    return inputNum;
}

/**
 * appendChildを作成 
 */  
function setAppendChildAndSendForm( form , setValue) {
    if(setValue.length > 0){
        for  (let i in setValue) {
            form.appendChild(setValue[i]);
        }
    }
    document.body.append(form);
    form.submit();
}