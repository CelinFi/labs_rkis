///eregion 

const host = "http://web-app.api-web-tech.local";
const content = document.querySelector(".content")
var token = '';
///#endregion

function _get (params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('GET',`${params.url}`);
    http_request.send();
    http_request.onreadystatechange = function () {
        if (http_request.readyState == 4){
            callback(http_request.response);
        }
    };
} 


function _post(params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('POST',`${params.url}`)
    http_request.send(params.data)
    http_request.onreadystatechange = function (){
        if(http_request.readyState == 4) {
            callback(http_request.response)

        }
    }
}


function _elem(selector){
    return document.querySelector(selector)
}



         /*Модуль авторизации*/

        _get ({url:'/modules/authorization.html'}, function(response){
            content.innerHTML = response;


            /*Регистрация*/
            _elem('.go-register').addEventListener('click',function(){
                _get({url: '/modules/registration.html'}, function(response){
                    content.innerHTML = response;


                    _elem('.register').addEventListener('click',function(){
               
                        let rdata = new FormData()
                        let first_name = _elem('input[name="first_name"]').value
                        let last_name = _elem('input[name="last_name"]').value
                        let email = _elem('input[name="email"]').value
                        let password = _elem('input[name="password"]').value
                        rdata.append('first_name',first_name)
                        rdata.append('last_name',last_name)
                        rdata.append('email',email)
                        rdata.append('password',password)   
               
                        
                        _post({url: `${host}/registration`, data: rdata}, function(response) {
                           response = JSON.parse(response)
                           
                          if (response.success) {  
                           token = response.token
                           console.log(token)
                           _get({url:'/modules/profile.html'}, function(response){
                               content.innerHTML = response;
                           })
           
                      } else{
                        alert ('login faild')
                      }
                      
                })      
         })
    })
 })

            
            /*Авторизация*/
            _elem('.authorize').addEventListener('click', function () {
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
                    _get({url:'/modules/profile.html'}, function(response){
                        content.innerHTML = response;
                        onLoadpageUpload()
                    })
                
                 } else {
                    _elem('.message-block').innerHTML = "";
                    _elem('.message-block').append(response.message)

                 }

            
                 })
            })
        })

/*Кнопка загрузить файлы*/
        function loadPageUpoad (){
            let xhr = new XMLHttpRequest ();
            xhr.open('GET', '/modules/upload.html')
            xhr.send();
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    content.innerHTML = xhr.responseText;
                }
            }
       }


        function onLoadpageUpload() {
            _elem('.btn-upload-file').addEventListener('click', function () {
            //_elem('.upload-file').addEventListener('click', function () {
                loadPageUpoad()
            })
            //})
        }








           /* function LoadPageData (){
                _get ({url:'modules/profile.html'}, function(response) {
                    content.innerHTML = response;
                    _elem('.exit').addEventListener('click', function (){
                        LoadPageAuth ()
                     })
                })
            
                let rdata = new FormData();
                rdata.append('token', token)
                let xhr = new XMLHttpRequest();
                xhr.open('POST', `${host}/modules/profile.html`);
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
            } */


             /*Таблица данных*/
/*function MakeTableCell(content) {
    let cell = document.createElement('td')
    cell.textContent = content;
    return cell;
}


function MakeTableData (data) {
    data.forEach(element => {
       let row = document.createElement('tr')
       row.append(MakeTableCell(element.id))
       row.append(MakeTableCell(element.name))
       row.append(MakeTableCell(element.download))
       row.append(MakeTableCell(element.delete))
       row.append(MakeTableCell(element.change))
       row.append(MakeTableCell(element.change_permissions))
      
       document.querySelector('.user-files tbody').append(row)
    });
} */






/*function onLoadProf() {
    _elem('.btn-upload-file').addEventListener('click',function(){
        _get({url: '/modules/upload.html'}, function(response){
            content.innerHTML = response;


            _elem('.upload-file').addEventListener('click',function(){

            })

            _elem('.btn-to-disk').addEventListener('click',function(){
                _get({url: '/modules/profile.html'}, function(response){
                    content.innerHTML = response;
                })
            })
         })  
    })
}*/


     
         
       
       
 
  


 



