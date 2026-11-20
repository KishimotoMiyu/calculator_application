package controller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.text.DecimalFormat;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

 // @WebServlet("/calculator")
 public class CalculatorServlet extends HttpServlet {
 	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("result", 0); // デフォルトで0を表示
		RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/views/index.jsp");
 		dispatcher.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");

		// フロントエンドから値を受け取る
		String action = ""; 
		double num1 = 0; 
		String operator = ""; 
		double num2 = 0;
		double currentInput = 0; 
		
		double result = 0; 
		String num1Str = ""; 
		String num2Str = ""; 
		String currentInputStr = ""; 
		String strResult = "0";
		String errorMessage = ""; 

		action = (String)request.getParameter("action");
		operator = (String)request.getParameter("operator");
		num1Str = (String)request.getParameter("num1");
		num2Str = (String)request.getParameter("num2");
		currentInputStr = (String)request.getParameter("currentInput");

		if (num1Str != null ) {
		    num1 = Double.parseDouble(num1Str);
		}

		if (num2Str != null ) {
		    num2 = Double.parseDouble(num2Str);
		}

		if (currentInputStr != null ) {
		    currentInput = Double.parseDouble(currentInputStr);
		}

		// 全消去（actionが"clear"の場合）計算結果を"0"にリセットする
		if(action.equals("clear")){
			strResult = "0";
		}

		// 税込（actionが"taxIn"の場合）
		if(action.equals("taxIn")){
			result = num1 * 1.10;
			DecimalFormat decimalFormatNum = new DecimalFormat("0.###");
    		strResult = decimalFormatNum.format(result);
		}

		// 税抜（actionが"taxOut"の場合）
		if(action.equals("taxOut")){
			result = num1 * 0.9;
			DecimalFormat decimalFormatNum = new DecimalFormat("0.###");
    		strResult = decimalFormatNum.format(result);
		}

		// 四則演算（actionが'calc'で、"="ボタン押下時）
		if(action.equals("calc")){

			if(operator.equals("+")){
				result = num1 + num2;
			}

			if(operator.equals("-")){
				result = num1 - num2;
			}

			if(operator.equals("×")){
				result = num1 * num2;
			}

			if(operator.equals("÷")){
				if(num2 == 0){
					errorMessage = "0で割ることはできません";
				} else {
					result = num1 / num2;
				}
			}

			DecimalFormat decimalFormat= new DecimalFormat("0.###");
			strResult = decimalFormat.format(result);

			if(strResult.replace(".", "").length() > 12){
				errorMessage = "値が大きすぎます";
			}
		}

		// 計算結果と計算履歴を画面へ返す
		if(errorMessage != null && !errorMessage.equals("")){
			request.setAttribute("result", errorMessage); // 計算結果
		} else {
			request.setAttribute("result", strResult); // 計算結果
		}

 		RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/views/index.jsp");
 		dispatcher.forward(request, response);
		
	}
}
