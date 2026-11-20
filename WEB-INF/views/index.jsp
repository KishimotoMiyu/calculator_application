<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
  <title>電卓</title>
  
  <link rel="stylesheet" href="css/calculator.css"> 
</head>
<body>
  <div class="calculator">
    <div class="display">
      <div class="history"></div>
      <div class="result-display">
        <!-- 計算結果画面表示 -->
        <div id="displayCalc" class="displayCalc">${displayCalc}</div>
        <div id="inputValue" class="inputValue">${result}</div>
        <!-- サーバーから返却された計算履歴（例: 1000 + 500 や 1000 税込(10%)）を表示する
        サーバーから返却された計算結果、または入力中の数値を大きく表示する。エラー発生時は赤文字でエラー内容を表示する。初期値は 0とする -->
      </div>
    </div>
    <div>
      <div class="keypad">
        <button type="submit" class="btn-red span-2" onclick="send_allClear()">全消去 (AC)</button>
        <button type="button" class="btn-dark span-2" onclick="get_clear()">⌫ 1文字削除</button>

        <button type="button" class="btn-green span-2" onclick="send_taxIn()">税込 (10%)</button>
        <button type="button" class="btn-green span-2" onclick="send_taxOut()">税抜 (10%)</button>

        <button type="button" class="btn-blue" value="÷" onclick="get_operand(this)">÷</button>
        <button type="submit" class="btn-white" value="7" onclick="get_calc(this)">7</button>
        <button type="submit" class="btn-white" value="8" onclick="get_calc(this)">8</button>
        <button type="submit" class="btn-white" value="9" onclick="get_calc(this)">9</button>

        <button type="button" class="btn-blue" value="×" onclick="get_operand(this)">×</button>
        <button type="submit" class="btn-white" value="4" onclick="get_calc(this)">4</button>
        <button type="submit" class="btn-white" value="5" onclick="get_calc(this)">5</button>
        <button type="submit" class="btn-white" value="6" onclick="get_calc(this)">6</button>

        <button type="button" class="btn-blue" value="-" onclick="get_operand(this)">-</button>
        <button type="submit" class="btn-white" value="1" onclick="get_calc(this)">1</button>
        <button type="submit" class="btn-white" value="2" onclick="get_calc(this)">2</button>
        <button type="submit" class="btn-white" value="3" onclick="get_calc(this)">3</button>

        <button type="button" class="btn-blue" value="+" onclick="get_operand(this)">+</button>
        <button type="submit" class="btn-white" value="0" onclick="get_calc(this)">0</button>
        <button type="submit" class="btn-white" value="." onclick="get_calc(this)">.</button>
        <button type="submit" class="btn-dark" onclick="send_equal()">=</button>


      </div>
    </div>
  </div>
  <script type="text/javascript" src="js/calculator.js"></script>
</body>
</html>