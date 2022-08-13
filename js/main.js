const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function getTableHeaders(obj) {                      //creating a function to get Table Headers   -- callign this in our function WritetoDocument 
    var tableHeaders = [];                          //variable to hold the values

    Object.keys(obj).forEach(function(key) {                  //using the object.keys to iterate through
        tableHeaders.push(`<td>${key}</td>`)                   //push to our tableheaders array we created so adding the key returned - using template literals (back tick)
    });

    return `<tr>${tableHeaders}</tr>`;                              //then creating to out put all of the above. 
}

function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        var tableRows = [];                                     //empty array to hold ALL records.. 
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);           //?? callign gettableheaders a passign the first object in the array --  but not quite sure

        data.forEach(function(item) {
            var dataRow = [];                                          //empty array to hold each row and buld the table 
            Object.keys(item).forEach(function(key) {                       //use built in object.ikeys to iterate over 
                dataRow.push(`<td>${item[key]}</td>`);                        //creating a table cell for each item, and then a row called DataRow the {item[key]} means get the value rathenr than the key...             
            });
            tableRows.push(`<tr>$(dataRow)</tr>`);                                       //we push each row to build the table  so its gets pushed into our TableRows array 
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;            //outputting the table headers results, and tablerows results  when button is clicked returns headers contains keys from say the film object..
    });
}