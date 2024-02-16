const previousOperationText=document.querySelector('.previous-operation');
const currentOperationText=document.querySelector('.current-operation');
const buttons=document.querySelectorAll('.buttons-conteiner button');

class calculator{
    constructor(previousOperationText,currentOperationText){
        this.previousOperationText =previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }

    //add digit to calculator screen
    addDigit(digit) {
        //check if current digit already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;   
        }
        console.log(digit);
        this.currentOperation = digit;
        this.updateScreen();
    }
    // process all calculator operations
    processOperation(operation){
        // check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //change operation
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return
        }
        //getting current and previous value
        let operationValue;
        const current = +this.currentOperationText.innerText;
        const previous = +this.previousOperationText.innerText.split(" ")[0];

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue,operation,current,previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue,operation,current,previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue,operation,current,previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue,operation,current,previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "CE":
                this.processClearOperation();
                break;
            case "=":
                    this.processEqualOperation();
                    break;
        
            default:
                return;
        }
    }


    //change values of the calculator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
       
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
            
        }else{
            // check if value is zero, if it is just current value
            if (previous == 0) {
                operationValue = current;    
            }
            //add current value to previuos
            this.previousOperationText.innerText =`${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
    //change math operation
    changeOperation(operation){
        const mathOperation = ["+","-","/","*"];
        if (!mathOperation.includes(operation)) {
           return; 
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //clear the current operation
    processClearOperation(){
        this.currentOperationText.innerText = "";
    }

    //clear all operation
    processClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText  = "";
    }

    //equal operation
    processEqualOperation(){
        const operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) =>{
    btn.addEventListener('click',(e) =>{
        const value=e.target.innerText;

       if (+value >= 0 || value ===".") {
        calc.addDigit(value);
        
       }else{
        calc.processOperation(value);
       }

    });
});