const ATMDeposit = ({ onChange, isDeposit, isValid}) => {

  const choice = ['Deposit', 'Cash Back'];
  //console.log(`ATM isDeposit: ${isDeposit}`);
  //console.log(`ATM valiTransaction: ${isValid}`); 
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  console.log(`Account Rendered with validTransaction: ${validTransaction}`);

  

  const handleChange = (event) => {
    
    setValidTransaction(true);
    if (event.target.value <= 0) setValidTransaction(false);
    console.log(`handleChangeValidTransaction ${validTransaction}`);
    if (atmMode === 'Cash Back' && event.target.value > totalState) setValidTransaction(false);
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };

   const resetValue = () => {
    if (document.getElementById("number-input"))
      document.getElementById("number-input").value = "";
  }

  const handleSubmit = (event) => { 
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    resetValue();
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    
    let atm = e.target.value;
    setAtmMode(atm);
    if (atm === 'Deposit') setIsDeposit(true); 
    if (atm === "Cash Back") setIsDeposit(false);
    setValidTransaction(false);
    
    //e.preventDefault();
    console.log('handleModeSelect: ' + isDeposit);
    console.log('handleValid: ' + validTransaction);
  }

  const h2Style = {
    padding: "10px 20px",
    textAlign: "center",
    color: "blue",
    fontSize: "32px"
  }

  const formStyle = {
    padding: "10px 20px",
    textAlign: "center"
  }

   const labelStyle = {
    fontSize: "18px" 
  }

  return (
   
    <form style={ formStyle} onSubmit={handleSubmit}>
    <>
        <h2 id="total" style={h2Style}>{status}</h2>
        <label style={labelStyle}>Select an action below to continue</label>
              
              <div>
                <button type='button' id="deposit-selection" value='Deposit' onClick = {(e) => handleModeSelect(e)}>Deposit</button>
                <button type='button' id="cashback-selection" value='Cash Back' onClick={(e) => handleModeSelect(e)}>Cash Back</button> 
              </div>
              
      { atmMode && (<ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>)}
      </>
      </form>
    
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
