// selected row
let row = null;

// Show form div 
const addEmployee = () =>{
  let x = document.getElementById("formsection");

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  let dropDown = document.getElementById("country");  
  dropDown.selectedIndex = 0;  
}

// On Form Submit
const onFormSubmit = () => {
  if (validateFormData()) {
      let formData = getFormData();
      if (row == null)
          insertNewRecord(formData);
      else
          onUpdate(formData);
      resetValue();
    } else{            
       addemployee();
  } 
}

// Object for storing Form data
const getFormData = () => {
    const formdata = {
    name : document.getElementById("name").value,
    address : document.getElementById("address").value,
    country : document.getElementById("country").value,
    contactNumber : document.getElementById("contactNumber").value,
    };
return formdata;
}

// Add record in table 
const insertNewRecord = (formData) => {
  let table = document.getElementById("myTable");
  let newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);

  cell1.innerHTML = formData.name;
  cell2.innerHTML = formData.address;
  cell3.innerHTML = formData.country;
  cell4.innerHTML = formData.contactNumber;
  cell5.innerHTML = '<input id="edit" onclick="editDetails(this)" type="button" value="Edit" />' + ' | ' + '<input id="delete" onclick="deleteDetails(this)" type="button" value="Delete" />' ;

  displayMessage();
  document.getElementById("formsection").style.display="none";  
}

// OnClick Edit button
const editDetails = (formData) => { 
  document.getElementById("formsection").style.display="block";  
  document.getElementById("submit").style.display="none";
  document.getElementById("update").style.display="block";

  row = (formData.parentNode.parentNode.cells);

  document.getElementById("name").value = row[0].outerText;
  document.getElementById("address").value = row[1].outerText;
  document.getElementById("country").value = row[2].outerText;
  document.getElementById("contactNumber").value = row[3].outerText;
}

// Update the Record in table 
const onUpdate = (formData) => {
  row[0].innerHTML = formData.name;
  row[1].innerHTML = formData.address;
  row[2].innerHTML = formData.country;
  row[3].innerHTML = formData.contactNumber;

  displayMessage();

  document.getElementById("submit").style.display="block";
  document.getElementById("update").style.display="none";
  document.getElementById("formsection").style.display="none";
}

// Delete selected table row
const deleteDetails = (del) => {
    let val = del.parentNode.parentNode;
    val.parentNode.removeChild(val);
    displayDeleteMessage();
}

// Success message display
const displayMessage = () => {
    document.getElementById("smsg").innerHTML = 'Record saved successfully';
    setTimeout(function(){document.getElementById("smsg").innerHTML = '';}, 5000);    
}

// Deletion message display
const displayDeleteMessage = () => {
    document.getElementById("smsg").innerHTML = 'Record deleted successfully';
    setTimeout(function(){document.getElementById("smsg").innerHTML = '';}, 5000);    
}

//Reset values
const resetValue = () =>{
    document.getElementById("name").value = null;
    document.getElementById("address").value = null;
    document.getElementById("country").value = null;
    document.getElementById("contactNumber").value = null;
    row = null;
}

// Validate Form
const validateFormData = () =>{
    isValid = true;
    resetValidation();

    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidate").style.display="block";
    } 
    if (document.getElementById("address").value == "") {
        isValid = false;
        document.getElementById("addressValidate").style.display="block";
    }
    if (document.getElementById("country").value == "") {
        isValid = false;
        document.getElementById("countryValidate").style.display="block";
    } 
    if (document.getElementById("contactNumber").value == "") {
        isValid = false;
        document.getElementById("conNumberValidate").style.display="block";
    }
    if(document.getElementById("contactNumber").value != ""){
        validateContactNumber(document.getElementById("contactNumber").value);
    }

    return isValid;
}

// Validate Contact Number 
const validateContactNumber = () => {
    let text = document.getElementById("contactNumber").value;
    let regx = /^[0-9]\d{9}$/ ;
    if(!regx.test(text)){
      isValid = false;
      document.getElementById("conNumberValidate").style.display="block";
    }
}

//Reset error message 
const resetValidation = () =>{
    document.getElementById("nameValidate").style.display="none";
    document.getElementById("addressValidate").style.display="none";
    document.getElementById("countryValidate").style.display="none";
    document.getElementById("conNumberValidate").style.display="none";
}