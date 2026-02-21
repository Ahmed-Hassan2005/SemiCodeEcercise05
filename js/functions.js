function showErrorInForm(index, errorMessege) {
    s7[index].classList.remove("show");
    wrong[index].classList.add("show");
    Error[index].innerHTML = errorMessege;
    Error[index].classList.add("show");
}

function showSuccessInForm(index){
    s7[index].classList.add("show");
    wrong[index].classList.remove("show");
    Error[index].innerHTML = "";
    Error[index].classList.remove("show");
}

function addEventsToInputs(){
    for(let i = 0; i < FormInputs.length; i++){
        FormInputs[i].addEventListener("blur", function () {
            if(ignoreBlur)
                return;
            if(FormInputs[i].value == "")
                showErrorInForm(i,"This field is required");
            else if (!Regex[i].test(FormInputs[i].value))
                showErrorInForm(i,"Invalid Field");
            else 
                showSuccessInForm(i);
        });
    }
}

function addEventsToButtons(){
    for(let i = 0; i < FormButtons.length; i++){
        FormButtons[i].addEventListener("click", function () {
            if(FormButtons[i].id == "Add"){
                if(validateForm()){
                    let student = new Student(id++, FirstName.value, LastName.value, Email.value, Age.value, Phone.value);
                    Students.push(student);
                    updateLocalStorage();
                    clearForm();
                    updateMessegeAndTable();
                }
                else{
                    clearErrorAndSuccess();
                    for(let i = 0; i < FormInputs.length; i++){
                        if(FormInputs[i].value == ""){
                            showErrorInForm(i,"This field is required");
                            break;
                        }
                        else if (!Regex[i].test(FormInputs[i].value)){
                            showErrorInForm(i,"Invalid Field");
                            break;
                        }
                        else 
                            showSuccessInForm(i);
                    }
                }
            }
            else if(FormButtons[i].id == "Edit"){
                if(validateForm()){
                    let student = new Student(currentStudentIndex, FirstName.value, LastName.value, Email.value, Age.value, Phone.value);
                    Students[currentStudentIndex] = student;
                    updateLocalStorage();
                    clearForm();
                    Add.classList.remove("hide");
                    Edit.classList.remove("show");
                    Back.classList.remove("show");
                    document.querySelector("body").classList.remove("edit");
                    enableTableButtons();
                }
                else{
                    clearErrorAndSuccess();
                    for(let i = 0; i < FormInputs.length; i++){
                        if(FormInputs[i].value == ""){
                            showErrorInForm(i,"This field is required");
                            break;
                        }
                        else if (!Regex[i].test(FormInputs[i].value)){
                            showErrorInForm(i,"Invalid Field");
                            break;
                        }
                        else 
                            showSuccessInForm(i);
                    }
                }
            }
            else if(FormButtons[i].id == "Back"){
                clearForm();
                Add.classList.remove("hide");
                Edit.classList.remove("show");
                Back.classList.remove("show");
                document.querySelector("body").classList.remove("edit");
                enableTableButtons();
            }
        });
    }
}

function addEventsToSearch() {
    SearchInput.addEventListener("input", function () {
        if(SearchInput.value == ""){
            updateMessegeAndTable();
            updateTable();
            return;
        }
        let SearchedValue = SearchInput.value.toLowerCase();
        let TableRows = document.querySelectorAll("#Form #FormContainer #Row4 .col table tbody tr");
        let counter = 0;
        for(let i = 0; i < TableRows.length; i++) {
            let Student = JSON.parse(localStorage.getItem(localStorage.key(i)));

            let idExists = Student.id.toString().includes(SearchedValue);
            let FirstNameExists = Student.FirstName.toLowerCase().includes(SearchedValue);
            let LastNameExists = Student.LastName.toLowerCase().includes(SearchedValue);
            let EmailExists = Student.Email.toLowerCase().includes(SearchedValue);
            let AgeExists = Student.Age.toLowerCase().includes(SearchedValue);
            let PhoneExists = Student.Phone.toLowerCase().includes(SearchedValue);

            if(idExists || FirstNameExists || LastNameExists || EmailExists || AgeExists || PhoneExists){
                TableRows[i].classList.remove("hide");
                counter++;
            } 
            else 
                TableRows[i].classList.add("hide");
        }
        if(counter == 0){
            Messege.classList.add("show");
            Table.classList.add("hide");
        }
        else{
            Messege.classList.remove("show");
            Table.classList.remove("hide");
        }
    });
}

function disableTableButtons(){
    for(let i = 0; i < localStorage.length; i++){
       document.querySelectorAll("#Table #TableBody tr td button")[2 * i].setAttribute("disabled", true);
       document.querySelectorAll("#Table #TableBody tr td button")[2 * i + 1].setAttribute("disabled", true);
    }
}

function enableTableButtons(){
    for(let i = 0; i < localStorage.length; i++){
       document.querySelectorAll("#Table #TableBody tr td button")[2 * i].removeAttribute("disabled");
       document.querySelectorAll("#Table #TableBody tr td button")[2 * i + 1].removeAttribute("disabled");
    }
}

class Student{
    id;
    FirstName;
    LastName;
    Email;
    Age;
    Phone;
    constructor(id, FirstName, LastName, Email, Age, Phone){
        this.id = id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Age = Age;
        this.Phone = Phone;
    }
}

function validateForm(){
    for(let i = 0; i < FormInputs.length; i++){
        if(FormInputs[i].value == "")
            return false;
        else if (!Regex[i].test(FormInputs[i].value))
            return false;
    }
    return true;
}

function updateLocalStorage(){
    localStorage.clear();
    updateId();
    for(let i = 0 ; i < Students.length ; i++){
        localStorage.setItem(Students[i].id, JSON.stringify(Students[i]));
    }
    updateTable();
}

function updateTable(){
    TableBody.innerHTML = "";
    for(let i = 0 ; i < Students.length ; i++){
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${Students[i].id + 1}</td>
            <td>${Students[i].FirstName}</td>
            <td>${Students[i].LastName}</td>
            <td>${Students[i].Email}</td>
            <td>${Students[i].Age}</td>
            <td>${Students[i].Phone}</td>
            <td class="d-flex gap-2 flex-nowrap">
                <button class="btn btn-info text-white" onclick="editStudent(${i},this)">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent(${i})">Delete</button>
            </td>
        `;
        TableBody.appendChild(row);
    }
}

function updateStudents(){
    Students = [];
    for(let i = 0 ; i < localStorage.length ; i++)
        Students.push(JSON.parse(localStorage.getItem(i)));
}

function deleteStudent(index){
    Students.splice(index, 1);
    updateLocalStorage();
    updateMessegeAndTable();
}

function updateMessegeAndTable(){
    if(Students.length == 0){
        Messege.classList.add("show");
        Table.classList.add("hide");
    }
    else{
        Messege.classList.remove("show");
        Table.classList.remove("hide");
    }
}

function updateId(){
    for(let i = 0 ; i < Students.length ; i++){
        Students[i].id = i;
    }
}

function editStudent(index){
    clearErrorAndSuccess()
    fillForm(index);
    disableTableButtons();
    Add.classList.add("hide");
    Edit.classList.add("show");
    Back.classList.add("show");
    currentStudentIndex = index;
    document.querySelector("body").classList.add("edit");
}

function fillForm(index){
    FormInputs[0].value = Students[index].FirstName;
    FormInputs[1].value = Students[index].LastName;
    FormInputs[2].value = Students[index].Email;
    FormInputs[3].value = Students[index].Age;
    FormInputs[4].value = Students[index].Phone;
}

function clearForm(){
    for(let i = 0 ; i < FormInputs.length ; i++){
        FormInputs[i].value = "";
    }
    clearErrorAndSuccess();
}

function clearErrorAndSuccess(){
    ignoreBlur = true;
    for(let i = 0 ; i < FormInputs.length ; i++){
        s7[i].classList.remove("show");
        wrong[i].classList.remove("show");
        Error[i].classList.remove("show");
    }
    ignoreBlur = false;
}
