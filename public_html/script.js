
var lstUsers = [];
var usersInLocal;
var listWords = ["APPLE", "ORANGE", "BANANA", "GRAPE", "MANGO", "GINGER", "COFFEE", "PEPPER", "BREAD", "COURSE"];
var listWordsLength;

var loginDetails = {};

var txtUsrName = document.getElementById('userName');
var txtFirstName = document.getElementById('firstName');
var txtLastName = document.getElementById('lastName');
var txtPwd = document.getElementById('pwd');
var txtEmail = document.getElementById('email');
var genders = document.getElementsByName('usrGender');

//Script related to Login page
function userLogin(){
    var uname = document.getElementById("lgnUserName").value;
    var pwd = document.getElementById("lgnPwd").value;
    
    usersInLocal = JSON.parse(localStorage.localUsers);
    
    if(usersInLocal !== null){
        for (var i = 0; i < usersInLocal.length; i++) {
            for (var property in usersInLocal[i]) {
                if(uname === usersInLocal[i]["userName"] && pwd === usersInLocal[i]["password"]){
                    loginDetails.loginName = uname;
                    loginDetails.loginPwd = pwd;
                    navigateToGamesPage();
                }
            }
        }
    }
    uname = "";
    pwd = "";   
}

function isUserLoggedIn(){
    if(loginDetails.loginName !== undefined && loginDetails.loginPwd !== undefined){
        return true;
    }
    return false;
}

function registerUser(){
    var user = {}; 
    user.userName = txtUsrName.value;
    user.firstName = txtFirstName.value;
    user.lastName = txtLastName.value;
    user.password = txtPwd.value;
    user.email = txtEmail.value;
    
    for(var i = 0; i < genders.length; i++){
        if(genders[i].checked){
            user.gender = genders[i].value;
        }
    }
    lstUsers.push(user);
    clearAllFields();
    storeInLocal(lstUsers);
}

function btnCancelClicked(){
    clearAllFields();
}

function clearAllFields(){
    txtUsrName.value = '';
    txtFirstName.value = '';
    txtLastName.value = '';
    txtPwd.value = '';
    txtEmail.value = '';
    document.getElementById('gender').checked = false;
    //gender.
}

//Local Storage
function storeInLocal(lstUsers){
    localStorage.localUsers = JSON.stringify(lstUsers);
    usersInLocal = JSON.parse(localStorage.localUsers);
}

//Script related to Games page
function navigateToGamesPage(){
    if(isUserLoggedIn()){
        window.location = "http://localhost:8383/Priyanka_15400_CS557A_HW3/games.html";
    } else {
        window.location = "http://localhost:8383/Priyanka_15400_CS557A_HW3/login.html";
    }
}

function getRandomWord(){
    listWordsLength = listWords.length;
    return Math.ceil(Math.random() * listWordsLength);   
}

function generateGame(){
    var word = getRandomWord();
    getGameWordBoxes(word);
    getToBeFilledBoxes(word);
    addDragEvents();
}

function getGameWordBoxes(word){
    
   /*var div = document.getElementById("panel");
    if (div) {
        div.parentNode.removeChild(div);
    }*/
    
    
    var shuffledWord = shuffelWord((listWords[word]));
    var divId = 0;
    var oldDiv;
    
    var panelDiv = document.createElement("div");
    panelDiv.id = "panel";
    
    for(var i = 0; i < listWords[word].length; i++){
        var parentDiv = document.createElement("div");
        parentDiv.setAttribute("data-drop-target", "true");
        
        var childDiv = document.createElement("div");
        
        childDiv.className = 'box letter';
        childDiv.setAttribute("draggable", "true");
        childDiv.id = "div" + divId;
        
        oldDiv = document.getElementById("alreadyDiv");
        var newContent = document.createTextNode(shuffledWord[i]); 
        
        childDiv.appendChild(newContent);
        parentDiv.appendChild(childDiv);
        panelDiv.appendChild(parentDiv);
        oldDiv.appendChild(panelDiv);
        divId++;
    }  
}

function getToBeFilledBoxes(word){
    var br1 = document.createElement("br");
    br1.style = "left: 0 px";
    var br2 = document.createElement("br");
    
    var oldDiv;
    oldDiv = document.getElementById("alreadyDiv");
    
    oldDiv.appendChild(br1);
    oldDiv.appendChild(br2);
    
    var panelDiv = document.createElement("div");
    panelDiv.id = "panel";
    
    for(var i = 0; i < listWords[word].length; i++){
        var newDiv = document.createElement("div");
        newDiv.setAttribute("data-drop-target", "true");
        newDiv.setAttribute("class", "droppedPositions");
        var newContent = document.createTextNode(""); 
        newDiv.style = "background-color: lightcoral;top: 100px;";
        
        newDiv.appendChild(newContent);
        panelDiv.appendChild(newDiv);
        oldDiv.appendChild(panelDiv);
    }
}

function shuffelWord (word){
    var shuffledWord = '';
    var charIndex = 0;
    word = word.split('');
    while(word.length > 0){
        charIndex = word.length * Math.random() << 0;
        shuffledWord += word[charIndex];
        word.splice(charIndex,1);
    }
    return shuffledWord;
}

function addDragEvents(){
    var draggable = document.querySelectorAll("[draggable]");
    var targets = document.querySelectorAll("[data-drop-target]");
    
    for (var i = 0; i < draggable.length; i++) {
        draggable[i].addEventListener("dragstart", handleDragStart);
    }
    for (i = 0; i < targets.length; i++) {
        targets[i].addEventListener("dragover", handleOverDrop);
        targets[i].addEventListener("drop", handleOverDrop);
        targets[i].addEventListener("dragenter", handleDragEnterLeave);
        targets[i].addEventListener("dragleave", handleDragEnterLeave);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData("text", this.id);
}
function handleDragEnterLeave(e) {
    if (e.type == "dragenter") {
        this.className = "drag-enter";
    } else {
        this.className = "";
    }
}
function handleOverDrop(e) {
    e.preventDefault();
    
    var draggedId = e.dataTransfer.getData("text");
    var draggedEl = document.getElementById(draggedId);
    if (draggedEl.parentNode == this) {
        return;
    }
    draggedEl.parentNode.removeChild(draggedEl);
    this.appendChild(draggedEl);
    //this.className = "";
    checkIfWon();
}

function checkIfWon(){
    var targets = document.getElementsByClassName("droppedPositions");
    
    for (i = 0; i < targets.length; i++) {
        alert(targets[i].children[0].innerHTML);
        /*targets[i].addEventListener("drop", handleOverDrop);
        targets[i].addEventListener("dragenter", handleDragEnterLeave);
        targets[i].addEventListener("dragleave", handleDragEnterLeave);*/
    }
}