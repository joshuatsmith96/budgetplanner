import React, { useState } from 'react';
import './BudgetForm.css';

const BudgetForm = () => {
    //Temporarily stored
    const [expense, setExpense] = useState("");
    const [cost, setCost] = useState(0);

    //Stored in an array
    const [fullExpenses, setFullExpenses] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    // When submit button is clicked, a new array is created.
    // This array is then sent to the 'expenses' array for storage.
    // This function will also clear the temporary
    // 'expense' state, clearing the input.
    function handleSubmit(e) {
        e.preventDefault();

        if (expense === ""){
            alert("Please enter an expense")
        } else if (!isNaN(expense)){
            alert("No numbers")
        } else if (cost === "" || cost === 0){
            alert("Please enter a cost")
        } else {
            document.getElementById("focusMe").focus();

            const newFullExpense = {
                id: "FE" + new Date().getTime(),
                expense: expense,
                number: cost,
            }
    
            setTotalCost(parseInt(totalCost) + parseInt(cost))
    
            setFullExpenses([...fullExpenses].concat(newFullExpense))
            setExpense("")
            setCost("")
        }
    }

    function deleteExpense(id, number) {
        const updatedExpenses = [ ...fullExpenses].filter((fullExpenses) => fullExpenses.id !== id)
        setFullExpenses(updatedExpenses)
        setTotalCost(parseInt(totalCost) - parseInt(number))
      }

    return(
        <div className="BudgetForm">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label>Expense</label>
                    <input id="focusMe" type="text" onChange={(e) => setExpense(e.target.value)} value={expense}></input>
                </div>
                <div className="inputs">
                    <label>Cost</label>
                    <input type="number" onChange={(e) => setCost(e.target.value)} value={cost}></input>
                </div>
                <button type="submit" className="expenseButton">Add Expense</button>
            </form>
                {fullExpenses.map((fullExpense) => <div key={fullExpense.id} className="expenseContainer">
                    <div className = "expenseText">
                        <div>{fullExpense.expense}</div>
                        <div>{"$"+fullExpense.number}</div>
                    </div>
                    <button onClick={() => deleteExpense(fullExpense.id, fullExpense.number)}>Delete</button>
                </div>)}
            <div className="total">
                <p>Total: ${totalCost}</p>
            </div>
        </div>
    )
}

export default BudgetForm;