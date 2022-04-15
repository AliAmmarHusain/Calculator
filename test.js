let mapArray = []
let history = []
let variables = []
let historyId = 0;
let variablesId = 0;

function showHistory(){

  var table = document.getElementById("history")

  for(var i = table.rows.length - 1; i > 0; i--)
  {
      table.deleteRow(i);
  }

  for(let i = 0; i < history.length; i++){
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = history[i].id;
    cell2.innerHTML = history[i].input;
    cell3.innerHTML = history[i].output;
    cell4.innerHTML = `<button onclick="deleteHistory(${history[i].id})"><i class="fa-solid fa-trash-can"></i></button>`;
  }
}

function addVariable(){
  let name = document.getElementById("varName").value;
  let value = document.getElementById("varValue").value;
  if(!isNaN(value)){
    if(name >= 'a' && name <= 'z' || name >= 'A' && name <= 'Z'){
      variables.push({ "id": variablesId++, [name] : value, "name" : name, "value": value})
    }
  }
  document.getElementById("varName").value = "";
  document.getElementById("varValue").value = "";
  showVariables()
}
function showVariables(){
  var table = document.getElementById("variables")


  for(var i = table.rows.length - 1; i > 0; i--)
  {
      table.deleteRow(i);
  }

  for(let i = 0; i < variables.length; i++){
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = variables[i].id;
    cell2.innerHTML = variables[i].name;
    cell3.innerHTML = variables[i].value;
    cell4.innerHTML = `<button onclick="deleteVariable(${variables[i].id})"><i class="fa-solid fa-trash-can"></i></button>`;
  }
}

function deleteHistory(id){
  for(let i = 0; i < history.length; i++ ){
    if(history[i].id == id){
      history.splice(i, 1);
    }
  }
  showHistory()
}
function deleteVariable(id){
  for(let i = 0; i < variables.length; i++ ){
    if(variables[i].id == id){
      variables.splice(i, 1);
    }
  }
  showVariables()
}

function dis(val){
    document.getElementById("result").value+=val
}

//function that evaluates the digit and return result
function solve(){
    let x = document.getElementById("result").value
    validateString(x)
    // let y = eval(x)
    // document.getElementById("result").value = y
}

//function that clear the display
function clr(){
    document.getElementById("result").value = ""
}



// Created an empty array
var stackarr = [];

// Variable topp initialized with -1
var topp = -1;

// Push function for pushing
// elements inside stack
function push(e) {
	topp++;
	stackarr[topp] = e;
}

// Pop function for returning top element
function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

// Function to check whether the passed
// character is operator or not
function operator(op) {
	if (op == '+' || op == '-' ||
		op == '^' || op == '*' ||
		op == '/' || op == '(' ||
		op == ')' || op == '!' ||
    op == '~' || op == '_') {
		return true;
	}
	else
		return false;
}

//search value for specific index in array
function search(nameKey, mapArray){
  for (var i=0; i < mapArray.length; i++) {
    if (mapArray[i][nameKey] != undefined) {
        return mapArray[i][nameKey];
    }
  }
  window.alert("Error in Expression")
}

// Function to return the precedency of operator
function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	}
	else if (pre == '+' || pre == '-') {
		return 2;
	}
	else if (pre == '/' || pre == '*') {
		return 3;
	}
	else if (pre == '^') {
		return 4;
	}
  else if(pre =='!' || pre =='~' || pre =='_'){
    return 5;
  }
	else
		return 0;
}

// Function to convert Infix to Postfix
function InfixtoPostfix(value) {

	// Postfix array created
	var postfix = [];
	var temp = 0;
	push('@');
	infixval = value;

	// Iterate on infix string
	for (var i = 0; i < infixval.length; i++) {
		var el = infixval[i];

		// Checking whether operator or not
		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop();
				}
				pop();
			}

			// Checking whether el is ( or not
			else if (el == '(') {
				push(el);
			}

			// Comparing precedency of el and
			// stackarr[topp]
			else if (precedency(el) > precedency(stackarr[topp])) {
				push(el);
			}
			else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop();
				}
				push(el);
			}
		}
		else {
			postfix[temp++] = el;
		}
	}

	// Adding character until stackarr[topp] is @
	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	// String to store postfix expression
	var st = "";
	for (var i = 0; i < postfix.length; i++)
		st += postfix[i];

	// To print postfix expression in HTML
  calculate(st)
}
function calculate(st){
  let i = 0;
  values = []
  while (true){

    if(st[i] >= 'a' && st[i] <= 'z'){
      values.push((st[i]))
    }else if(st[i] == '-' || st[i] == '+' || st[i] == '*' || st[i] == '/' || st[i] == '!' || st[i] == '^' || st[i] == '~' || st[i] == '_'){
      if(st[i] == '+' ){
        let second = values.pop() ;
        let first = values.pop();
        first = first ? first : 0;

        if(typeof(second) == 'number'){
          second = parseFloat(second)
        }else{

          second = parseFloat(search(second,mapArray))
        }
        if(typeof(first) == 'number'){
          first = parseFloat(first)
        }else{
          first = parseFloat(search(first,mapArray))
        }
        let result = first + second
        values.push(result)
      }else if(st[i] == '-' ){
        let second = values.pop() ;
        let first = values.pop()
        first = first ? first : 0;

        if(typeof(second) == 'number'){
          second = parseFloat(second)
        }else{

          second = parseFloat(search(second,mapArray))
        }
        if(typeof(first) == 'number'){
          first = parseFloat(first)
        }else{
          first = parseFloat(search(first,mapArray))
        }
        let result = first - second
        values.push(result)
      }else if(st[i] == '*' ){
        let second = values.pop() ;
        let first = values.pop();

        if(typeof(second) == 'number'){
          second = parseFloat(second)
        }else{

          second = parseFloat(search(second,mapArray))
        }
        if(typeof(first) == 'number'){
          first = parseFloat(first)
        }else{
          first = parseFloat(search(first,mapArray))
        }
        let result = first * second
        values.push(result)
      }else if(st[i] == '/' ){
        let second = values.pop() ;
        let first = values.pop();

        if(typeof(second) == 'number'){
          second = parseFloat(second)
        }else{

          second = parseFloat(search(second,mapArray))
        }
        if(typeof(first) == 'number'){
          first = parseFloat(first)
        }else{
          first = parseFloat(search(first,mapArray))
        }
        if(second == 0){
          window.alert('Error : Devidec by 0 ')
        }
        let result = first / second
        values.push(result)
      }else if(st[i] == '^' ){
        let second = values.pop()
        let first = values.pop()
        if(typeof(second) == 'number'){
          second = parseFloat(second)
        }else{
          second = parseFloat(search(second,mapArray))
        }
        if(typeof(first) == 'number'){
          first = parseFloat(first)
        }else{
          first = parseFloat(search(first,mapArray))
        }
        let result = Math.pow(first, second)
        values.push(result)
      }else if(st[i] == '!' ){
        let first = values.pop()
        if(typeof(first)=='number'){
          first = parseFloat(first)
        }else{
          first =  parseFloat(search(first,mapArray))
        }
        values.push(parseFloat(Math.sin(first)));
      }else if(st[i] == '~' ){
        let first = values.pop()
        if(typeof(first)=='number'){
          first = parseFloat(first)
        }else{
          first =  parseFloat(search(first,mapArray))
        }
        values.push(parseFloat(Math.cos(first)));
      }else if(st[i] == '_' ){
        let first = values.pop()
        if(typeof(first)=='number'){
          first = parseFloat(first)
        }else{
          first =  parseFloat(search(first,mapArray))
        }
        values.push(parseFloat(Math.tan(first)));
      }
    }
    if(st[i+1] == undefined){

      document.getElementById("resultshow").value = values[0]
      history.push({id: historyId++, input: document.getElementById("result").value, output : values[0]})
      values = []
      mapArray = []
      break;
    }
    i++;
  }
}

function validateString(str){
  let index = str.indexOf("sin")
  if(index >= 0)
    str = str.substring(0,index) + '!' + str.substring(index+3)
  index = str.indexOf("cos")
  if(index >= 0)
    str = str.substring(0,index) + '~' + str.substring(index+3)
  index = str.indexOf("tan")
  if(index >= 0)
    str = str.substring(0,index) + '_' + str.substring(index+3)
  str = str.replace(/\s/g, '');
  newstr = str.split('')
  for(let i = 0; i < newstr.length; i++){
    if(newstr[i] >= 'a' && newstr[i] <= 'z' || newstr[i] >= 'A' && newstr[i] <= 'Z'){
      newstr[i] = search(newstr[i], variables)
      str = newstr.join('')
    }
  }
  // find invalid characters
  for(let i = 0; i < str.length; i++){
    if(i+1 < str.length && str[i] == ')' && !isNaN(str[i+1])){
      str = str.substring(0, i+1) + "*" + str.substring(i+1);

    }
    if(i-1 >= 0 && str[i] == '(' && !isNaN(str[i-1])){
      str = str.substring(0, i) + "*" + str.substring(i);
    }
    if( (str[i] >= '0' && str[i] <= '9') || str[i] == '+' ||
    str[i] == '-' || str[i] == '*' || str[i] == '/' ||
    str[i] == '(' || str[i] == ')' || str[i]== '^' ||
    str[i] == '.' || str[i] == '_' || str[i] == '!' ||
    str[i] == '~'){
      // do nothing
    }else{
      return false;
    }
  }

  // add spacing
  str = str.split('+').join(' + ')
  str = str.split('-').join(' - ')
  str = str.split('*').join(' * ')
  str = str.split('/').join(' / ')
  str = str.split('^').join(' ^ ')
  str = str.split('(').join(' ( ')
  str = str.split(')').join(' ) ')
  str = str.split('!').join(' ! ')
  str = str.split('~').join(' ~ ')
  str = str.split('_').join(' _ ')
  str = str.split('  ').join(' ')
  replaceNum(str)
}

function replaceNum(strr){
  strVal = strr.split(' ')
  let j=0;
  for(let i = 0; i < strVal.length; i++){
    if(strVal[i] == '+' || strVal[i] == '-' ||
      strVal[i] == '*' || strVal[i] == '/' ||
      strVal[i] == '^' || strVal[i] == '!' ||
      strVal[i] == '~' || strVal[i] == '_' ||
      strVal[i] == '(' || strVal[i] == ')' || strVal[i] == ''){

      }else{
      mapArray.push({[(j+10).toString(36)]:strVal[i]})
      strVal[i] = (j+10).toString(36)
      j++;
    }
  }

  InfixtoPostfix(strVal.join(''))
}


// InfixtoPostfix(strr);
