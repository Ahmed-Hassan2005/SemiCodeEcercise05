// <-----------------------------Form inputs----------------------------->

let FirstName = document.getElementById("FirstName");
let LastName = document.getElementById("LastName");
let Email = document.getElementById("Email");
let Age = document.getElementById("Age");
let Phone = document.getElementById("Phone");
let FormInputs = [FirstName , LastName , Email , Age , Phone];

// <-----------------------------Form errors----------------------------->

let Error1 = document.getElementById("Error1");
let Error2 = document.getElementById("Error2");
let Error3 = document.getElementById("Error3");
let Error4 = document.getElementById("Error4");
let Error5 = document.getElementById("Error5");
let Error = [Error1, Error2, Error3, Error4, Error5];

//input icons
let s7 = document.querySelectorAll("#Form #FormContainer #Row2 .col form .input .indicationIcon i.s7");
let wrong = document.querySelectorAll("#Form #FormContainer #Row2 .col form .input .indicationIcon i.wrong");

// <-----------------------------regex----------------------------->

let FirstNameRegex = /^[a-zA-Z]{3,12}$/;
let LastNameRegex = /^[a-zA-Z]{3,12}$/;
let EmailRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,20}@(gmail|yahoo)\.(com|org)$/;
let AgeRegex = /^[0-9]{1,2}$/;
let PhoneRegex = /^(\+20|0)(10|11|12|15)[0-9]{8}$/;
let Regex = [FirstNameRegex , LastNameRegex , EmailRegex , AgeRegex , PhoneRegex];

// <-----------------------------buttons----------------------------->

let Add = document.getElementById("Add");
let Edit = document.getElementById("Edit");
let Back = document.getElementById("Back");
let FormButtons = [Add, Edit, Back];

// <-----------------------------table----------------------------->

let Messege = document.getElementById("Messege");
let Table = document.getElementById("Table");
let TableBody = document.getElementById("TableBody");
let TableRows = document.querySelectorAll("#Form #FormContainer #Row4 .col table tbody tr");

// <-----------------------------variables----------------------------->

let id = localStorage.length > 0 ? localStorage.length : 0;
let Students = [];
let currentStudentIndex;
let ignoreBlur = false;

// <-----------------------------search----------------------------->

let SearchLabel = document.getElementById("SearchLabel");
let SearchInput = document.getElementById("SearchInput");

// <-----------------------------functions----------------------------->

addEventsToInputs();
addEventsToButtons();
addEventsToSearch();
updateStudents();
updateMessegeAndTable();
updateTable();