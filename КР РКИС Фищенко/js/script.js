const host = "http://apiweb.api-web-tech.local"
const content = document.querySelector(".content")
var token = '';


function _get (params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('GET', `${params.url}`);
    http_request.send();
    http_request.onreadystatechange = function () {
        if (http_request.readyState == 4) {
            callback(http_request.response);
        }
    };
}

function _post (params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('POST', `${params.url}`);
    http_request.send(params.data);
    http_request.onreadystatechange = function () {
        if (http_request.readyState == 4){
            callback(http_request.response)
        }
    }
}


function _elem(selector) {
    return document.querySelector(selector)
}
LoadPageAuth () 
/*Мoдуль авторизации*/
function LoadPageAuth () {
    _get ({url:'/modules/authorization.html'}, function(response) {
        content.innerHTML = response;
        OnloadAuth()
    })
}

/*Кнопка авторизации*/ 
function OnloadAuth() {
    _elem ('.authorization').addEventListener('click', function (){
        console.log('click')
        let edata = new FormData()
        let email = _elem('input[name="email"]').value
        let password = _elem('input[name="password"]').value
        edata.append('email',email)
        edata.append('password',password)
        
        _post({url: `${host}/authorization`, data: edata}, function(response) {
            response = JSON.parse(response)
            console.log(response);
            if (response.success) {
                token = response.token
                console.log(token)
                LoadPageData ();
                
            } else {
                alert("login failed")
            }
        })
    })   
}

function LoadPageData() {
let rdata = new FormData();
rdata.append('token',token)
let xhr = new XMLHttpRequest();
xhr.open('POST', `${host}/data`);
xhr.send(rdata);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        console.log(this.responseText)
        if (xhr.status == 200) {
            //document.body.innerHTML = xhr.responseText
            let response = JSON.parse(xhr.responseText)
            MakeTableData(response)
        }
        if (xhr.status == 401) {
            let response = JSON.parse(xhr.responseText)
            alert(response.message)
        }
    }
}
} 

function LoadPageData (){
    _get ({url:'data.html'}, function(response) {
        content.innerHTML = response;
        _elem('.exit').addEventListener('click', function (){
            LoadPageAuth ()

         })
    })

    let rdata = new FormData();
    rdata.append('token', token)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${host}/data`);
    xhr.send(rdata);
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        console.log(this.responseText)
        if (xhr.status == 200) {
            //document.body.innerHTML = xhr.responseText
            let response = JSON.parse(xhr.responseText)
            let table = document.querySelector('.user-files tbody')
            MakeTableData(response)
        }
        if (xhr.status == 401) {
            let response = JSON.parse(xhr.responseText)
            alert(response.message)
        }
    }
}

function MakeTableCell(content) {
    let cell = document.createElement('td')
    cell.textContent = content;
    return cell;
}


function MakeTableData (data) {
    
    let files_table=data
    for(i=0;i<files_table.length;i++){
        const element = files_table[i]
       let row = document.createElement('tr')
       row.append(MakeTableCell(element.name))
       row.append(MakeTableCell(element.gender))
       row.append(MakeTableCell(element.age))
       row.append(MakeTableCell(element.eyeColor))
       row.append(MakeTableCell(element.balance))
       row.append(MakeTableCell(element.company))
       row.append(MakeTableCell(element.email))
       row.append(MakeTableCell(element.phone))
       row.append(MakeTableCell(element.address))
       row.append(MakeTableCell(element.favoriteFruit))
    
       table.append(row)
    };
} 

   /*Таблица данных*/

} 



    /*function OnClickLogout() { 
        //Кнопка выход
        _elem ('.data head button').addEventListener('click', function (){
    let rdata = new FormData();
    rdata.append('token',token)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${host}/logout`);
    xhr.send(rdata);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log(this.responseText)
           // content.innerHTML = xhr.responseText
            if (xhr.status == 200) {
                //document.body.innerHTML = xhr.responseText
            }
            if (xhr.status == 403) {
                let response = JSON.parse(xhr.responseText)
                alert(response.message)
            }
        }
    }
})
}*/