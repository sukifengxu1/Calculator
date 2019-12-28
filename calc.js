const AC = 0;
const DIGIT = 1;
const OP = 2;
const EQ = 3;

var state = AC;

var display = "";
var expression = [];

function calculator(operands, operator) {
	switch (operator) {
		case "addButton":
			return operands[0] + operands[1];
		case "subtractButton":
			return operands[0] - operands[1];
		case "multiplyButton":
			return operands[0] * operands[1];
		case "divideButton":
			return operands[0] / operands[1];
	}
}

 $(function() {
 	$(".digit").click(function() {
 		if (state == DIGIT) {
 			display += $(this).val(); // current operand as a string
 		} else {
 			display = "" + $(this).val();
 		}
 		$("#display").val(display); // display current operand as a string
 		state = DIGIT;
 	});

 	$(".operator").click(function() {
 		if (state == AC) {
 			expression = [0];
 			expression.push(this.id);
 		} else if (state == OP) {
 			expression[1] = this.id;
 		} else if (state == EQ) {
 			expression = [Number(display)];
 			expression.push(this.id);
 		} else if (expression.length == 2) {
 			expression.push(Number(display));
 			var operands = [expression[0], expression[2]];
 			expression = [calculator(operands, expression[1])];
 			expression.push(this.id);
 			display = "" + expression[0];
 		} else {
 			expression = [Number(display)];
 			expression.push(this.id);
 		}
 		$("#display").val(display);
 		state = OP;	
 	});

 	$("#equalsButton").click(function() {
 		if (state == DIGIT) {
 			if (expression.length == 2) {
 				expression.push(Number(display));
 				var operands = [expression[0], expression[2]];
 				expression.push(calculator(operands, expression[1]));
 				display = "" + expression[3];
 			} else {
 				expression = [Number(display)];
 			}
 		} else if (state == EQ) {
 			var operands = [expression[3], expression[2]];
 			expression[3] = calculator(operands, expression[1]);
 			display = "" + expression[3];
 		}
 		$("#display").val(display);
 		state = EQ;
 	});

 	$("#clearButton").click(function() {
 		display = "";
 		$("#display").val(display);
 		state = AC;
 	});

 });