import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as papa from 'papaparse';
import { Http } from '@angular/http'; 

/*
  Generated class for the CsvToJsonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CsvToJsonProvider {

  csvData: any[] = [];
  headerRow: any[] = [];
  whereIndex: any[] = [30,31];
  whereValue: any[] = ["E) Project", "Won"];
  oko=false;
  testvar:any;

  whereIndexValue: any ;

  constructor(public http: Http) {
    console.log('Hello CsvToJsonProvider Provider');

  
   // this.getPartners();

  }


  public selectDataFromCsv(whereIndexRes,whereValueRes) {
    return new Promise(resolve => {
      this.http.get('assets/ExportCSV.csv')
        .subscribe(data => {
          this.testvar = this.extractDataForNextProject(data,whereIndexRes,whereValueRes);         
          resolve(this.testvar);
        });
    });  
  }

  public insertDatafromCsvtoDB() {
    return new Promise(resolve => {
      this.http.get('assets/ExportProjectsselec.csv')
        .subscribe(data => {
          this.testvar = this.insertDataForNextProject(data);
           this.BDinsert(this.testvar,true);
          resolve(this.testvar);
        });
    });  
  }

  /// Insert data into DB against inserted Json Query JsonObject
  public insertDatatoDB(insertjson) {
    return new Promise(resolve => {
      this.http.get('assets/ExportCSV.csv')
        .subscribe(data => {
          this.testvar = this.insertIntoDataBase(data,insertjson);
          console.log('insert value  ',this.testvar);
        //  // Console.Lo
           this.BDinsert(this.testvar,false);
          resolve(this.testvar);
        });
    });  
  }

/// Select data against Query json object (jsonQuery)
  public selectDataFromIndexedDB(jsonQuery) {

    return new Promise(resolve => {
      this.http.get('assets/ExportCSV.csv')
        .subscribe(data => {
         // this.testvar = this.insertDataForNextProject(data);
         //  this.BDinsert(this.testvar);

          // var count =0
          // this.testvar = this.DBopen(jsonQuery);
          // for (var i=0;i<20;i++)
          //     count++;



          // ----------
          var indexedDB = window.indexedDB;
          var jsonObject = {};
          var jsonAarray=[];
      
          // Open (or create) the database
          var open = indexedDB.open("VodaDatabase", 1);
      
         // Create the schema
          open.onupgradeneeded = function() {
              var db = open.result;
              var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
             };
          open.onerror = function() {
            var db = open.result;
            var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
            };
      
          //  var obj = {"ID":"You are welcome"};
            var keys = Object.keys(jsonQuery);
            var values = Object.keys(jsonQuery).map(function (key) { return jsonQuery[key]; });
            console.log( keys[ 0 ] );
            console.log( values[ 0 ] );
         
          open.onsuccess = function() {
              // Start a new transaction
              var db = open.result;
              var tx = db.transaction("VodaObjectStore", "readwrite");
              var store = tx.objectStore("VodaObjectStore");
           
              var cursorRequest = store.openCursor();
      
              cursorRequest.onerror = function(error) {
                console.log(error);
               };
               var count = 0;
              cursorRequest.onsuccess = function(evt) {                    
                var cursor = evt.target.result;
                if (cursor) {
                 // console.log(cursor.value);
                 //   items.push(cursor.value);
                 // getString(keys[0])
               //  console.log(cursor.value[keys[0]]);
                // console.log(cursor.value.ID);


                var temp  = false;
                for (var j=0;j<keys.length;j++){

                  if(typeof cursor.value [ keys[j] ]!== 'undefined' ){

                    if (cursor.value [ keys[j] ]
                    ==(values[j])){   

                    temp=true; 

                    }
                    else{                                        
                      temp=false;
                      break;
                    }    
                  }       
                } 





                 if(temp){
                   // count++; 
                   // console.log(count +"   "+cursor.value);
                   // console.log(cursor.value);
                    
                    jsonAarray.push(cursor.value);
                    jsonObject = {};
                    }
                    cursor.continue();
                }

            

               };
      
              
      
             //  store.clear();
              // Close the db when the transaction is done
              tx.oncomplete = function() {
                    resolve(JSON.stringify(jsonAarray, undefined, 2));
                  db.close();
              };
      
            
          }
       //   return  JSON.stringify(jsonAarray, undefined, 2);

          // ----------  









        
        });
    });  
    // return new Promise(resolve => {
    //   this.http.get('assets/ExportCSV.csv')
    //     .subscribe(data => {
    //       this.testvar = this.DBopen(data,jsonQuery);    
    //       console.log(this.testvar);
    //       resolve(this.testvar);
    //     });
    // });  



    
  }

  



  public updateDataFromIndexedDB(jsonQuery) {
   
    return new Promise(resolve => {
      this.http.get('assets/ExportCSV.csv')
        .subscribe(data => {
         // this.testvar = this.insertDataForNextProject(data);
         //  this.BDinsert(this.testvar);

          // var count =0
          // this.testvar = this.DBopen(jsonQuery);
          // for (var i=0;i<20;i++)
          //     count++;



          // ----------
          var indexedDB = window.indexedDB;
          var jsonObject = {};
          var jsonAarray=[];
      
          // Open (or create) the database
          var open = indexedDB.open("VodaDatabase", 1);
      
         // Create the schema
          open.onupgradeneeded = function() {
              var db = open.result;
              var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
             };
          open.onerror = function() {
            var db = open.result;
            var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
            };
      
          //  var obj = {"ID":"You are welcome"};
            
              console.log( jsonQuery[ 0 ] );
              console.log( jsonQuery[ 1 ] );
            var keys = Object.keys(jsonQuery[0]);
            var values = Object.keys(jsonQuery[0]).map(function (key) { return jsonQuery[0][key]; });
            console.log( keys[ 0 ] );
            console.log( values[ 0 ] );
          
          open.onsuccess = function() {
              // Start a new transaction
              var db = open.result;
              var tx = db.transaction("VodaObjectStore", "readwrite");
              var store = tx.objectStore("VodaObjectStore");
           
              var cursorRequest = store.openCursor();
      
              cursorRequest.onerror = function(error) {
                console.log(error);
               };
               var count = 0;
              cursorRequest.onsuccess = function(evt) {                    
                var cursor = evt.target.result;
                if (cursor) {
                 // console.log(cursor.value);
                 //   items.push(cursor.value);
                 // getString(keys[0])
               //  console.log(cursor.value[keys[0]]);
                // console.log(cursor.value.ID);


                var temp  = false;
                for (var j=0;j<keys.length;j++){

                  if(typeof cursor.value [ keys[j] ]!== 'undefined' ){

                    if (cursor.value [ keys[j] ]
                    ==(values[j])){   

                    temp=true; 

                    }
                    else{                                        
                      temp=false;
                      break;
                    }    
                  }       
                } 





                 if(temp){
                   // count++; 
                   // console.log(count +"   "+cursor.value);
                   // console.log(cursor.value);
                  //   var key = Object.keys(jsonQuery[1]);
                  //   var values = Object.keys(jsonQuery[1]).map(function (key) { return jsonQuery[1][key]; });
                     jsonObject = cursor.value;
       
                  //  for (var j=0;j<key.length;j++){
                  //   // console.log(count +"   "+cursor.value);
                  //   //  console.log(cursor.value);
                  //    //jsonObject[keys[j]] = values[j];
         
                  //  } 

                  var keysnew = Object.keys(jsonQuery[1]);
                  var valuesnew = Object.keys(jsonQuery[1]).map(function (key) { return jsonQuery[1][key]; });
                  
                  for (var j=0;j<keysnew.length;j++){
                    console.log( keysnew[ j ] );
                  console.log( valuesnew[ j ] );
                  jsonObject[keysnew[j]] = valuesnew[j];
                  }

   
                    jsonAarray.push(jsonObject);
                    jsonObject = {};
                    }
                    cursor.continue();
                }

            

               };
      
              
      
             //  store.clear();
              // Close the db when the transaction is done
              tx.oncomplete = function() {

                    //resolve(JSON.stringify(jsonAarray, undefined, 2));
                    resolve(JSON.stringify(jsonAarray, undefined, 2));
                  db.close();
              };
      
            
          }
       //   return  JSON.stringify(jsonAarray, undefined, 2);

          // ----------  









        
        });
    });  
    // return new Promise(resolve => {
    //   this.http.get('assets/ExportCSV.csv')
    //     .subscribe(data => {
    //       this.testvar = this.DBopen(data,jsonQuery);    
    //       console.log(this.testvar);
    //       resolve(this.testvar);
    //     });
    // });  



    
  }



  public deleteDataFromIndexedDB(jsonQuery) {
   
    return new Promise(resolve => {
      this.http.get('assets/ExportCSV.csv')
        .subscribe(data => {
      
          // ----------
          var indexedDB = window.indexedDB;
          var jsonObject = {};
          var jsonAarray=[];
      
          // Open (or create) the database
          var open = indexedDB.open("VodaDatabase", 1);
      
         // Create the schema
          open.onupgradeneeded = function() {
              var db = open.result;
              var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
             };
          open.onerror = function() {
            var db = open.result;
            var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
            };
      
          //  var obj = {"ID":"You are welcome"};
            
              console.log( jsonQuery[ 0 ] );
             
            var keys = Object.keys(jsonQuery[0]);
            var values = Object.keys(jsonQuery[0]).map(function (key) { return jsonQuery[0][key]; });
            console.log( keys[ 0 ] );
            console.log( values[ 0 ] );
          
          open.onsuccess = function() {
              // Start a new transaction
              var db = open.result;
              var tx = db.transaction("VodaObjectStore", "readwrite");
              var store = tx.objectStore("VodaObjectStore");
           
              var cursorRequest = store.openCursor();
      
              cursorRequest.onerror = function(error) {
                console.log(error);
               };
               var count = 0;
              cursorRequest.onsuccess = function(evt) {                    
                var cursor = evt.target.result;
                if (cursor) {
 

                var temp  = false;
                for (var j=0;j<keys.length;j++){

                  if(typeof cursor.value [ keys[j] ]!== 'undefined' ){

                    if (cursor.value [ keys[j] ]
                    ==(values[j])){   

                    temp=true; 

                    }
                    else{                                        
                      temp=false;
                      break;
                    }    
                  }       
                } 





                 if(temp){
                          jsonObject = cursor.value;
                          cursor.delete();
                 
                    }
                    cursor.continue();
                }

            

               };
      
              
      
             //  store.clear();
              // Close the db when the transaction is done
              tx.oncomplete = function() {

                    //resolve(JSON.stringify(jsonAarray, undefined, 2));
                    resolve(JSON.stringify(jsonAarray, undefined, 2));
                  db.close();
              };
      
            
          }
       //   return  JSON.stringify(jsonAarray, undefined, 2);

          // ----------  


        
        });
    });  
  
    
  }







  public get():any{
    return this.testvar;
  }



  public handleError(err) {
    console.log('something went wrong: ', err);
  }


  public extractDataForNextProject(res,whereIndexRes,whereValueRes):any {

    var whereIndex = whereIndexRes;
    var whereValue = whereValueRes;

    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    let parsedData1 = papa.parse(csvData).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;

    var myData = []; 
    var fieldValue = []; 
    var valuesArray = parsedData;
    var fieldNames = this.headerRow;
    var objectsArray = valuesArray.map(function(values){
                                      
                                        var temp  = false;
                                        for (var j=0;j<whereIndex.length;j++){

                                          if(typeof values[whereIndex[j]] !== 'undefined' ){

                                            if (values[whereIndex[j]]
                                            ==(whereValue[j])){   

                                            temp=true; 

                                            }
                                            else{                                        
                                              temp=false;
                                              break;
                                            }    
                                          }       
                                        }       

                                            if(temp){
                                            for (var i = 0; i < values.length; i++) {
                                                myData.push(values[i]);                                               
                                            };                                    
                                            fieldValue.push(myData);
                                            myData = [];                                     
                                           }
                                           temp  = false;                                           
                                        });
                                        
    var onlyField=[0,1,2,3,8,13,30,31,80];

      var jsonObject = {};
      var jsonAarray=[];

      for(var j=0; j<fieldValue.length; j++){
         var dataToJson=fieldValue[j];
              for(var i=0; i<fieldNames.length ; i++){
                 if(onlyField.indexOf(i) > -1) // if exists

                 jsonObject[((((fieldNames[i].replace(/ /g, "")).replace("(", "")).replace(")", ""))).replace(/\//g, "")]
            = dataToJson[i];
  
              } 
          jsonAarray.push(jsonObject);
          jsonObject = {};
      } 
     this.testvar=JSON.stringify(jsonAarray, undefined, 2);
     return  JSON.stringify(jsonAarray, undefined, 2);
  }



  public insertDataForNextProject(res):any {

    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    let parsedData1 = papa.parse(csvData).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;

    var myData = []; 
    var fieldValue = []; 
    var valuesArray = parsedData;
    var fieldNames = this.headerRow;
    var objectsArray = valuesArray.map(function(values){
                                      
                                            for (var i = 0; i < values.length; i++) {
                                                myData.push(values[i]);                                               
                                            };                                    
                                            fieldValue.push(myData);
                                            myData = [];                                     
                                                                            
                                        });
                                        
    var onlyField=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,
                  30,31,32,33,34,35,36,37,38,39,40,
                41,42,43,44,45,46,47,48,49,50,
              51,52,53,54,55,56,57,58,59,60,
            61,62,63,64,65,66,67,68,69,70,
          71,72,73,74,75,76,77,78,79,80,81];

      var jsonObject = {};
      var jsonAarray=[];

      for(var j=0; j<fieldValue.length; j++){
         var dataToJson=fieldValue[j];
              for(var i=0; i<fieldNames.length ; i++){
                 if(onlyField.indexOf(i) > -1) // if exists

                 jsonObject[((((fieldNames[i].replace(/ /g, "")).replace("(", "")).replace(")", ""))).replace(/\//g, "")]
            = dataToJson[i];
  
              } 
          jsonAarray.push(jsonObject);
          jsonObject = {};
      } 
     this.testvar=JSON.stringify(jsonAarray, undefined, 2);
     return  JSON.stringify(jsonAarray, undefined, 2);
  }


  // create Json Array to be inserted and this method also create the necessary object against origilan csv
  public insertIntoDataBase(res,insertjson):any {

    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    let parsedData1 = papa.parse(csvData).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;

    var myData = []; 
    var fieldValue = []; 
    var valuesArray = parsedData;
    var fieldNames = this.headerRow;
    // var objectsArray = valuesArray.map(function(values){
                                      
    //                                         for (var i = 0; i < values.length; i++) {
    //                                             myData.push(values[i]);                                               
    //                                         };                                    
    //                                         fieldValue.push(myData);
    //                                         myData = [];                                     
                                                                            
    //                                     });
                                        
    // var onlyField=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
    //                 15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,
    //               30,31,32,33,34,35,36,37,38,39,40,
    //             41,42,43,44,45,46,47,48,49,50,
    //           51,52,53,54,55,56,57,58,59,60,
    //         61,62,63,64,65,66,67,68,69,70,
    //       71,72,73,74,75,76,77,78,79,80,81];

      var jsonObject = {};
      var jsonAarray=[];

      // for(var j=0; j<fieldValue.length; j++){
      //    var dataToJson=fieldValue[j];
      //         for(var i=0; i<fieldNames.length ; i++){
      //            if(onlyField.indexOf(i) > -1) // if exists

      //            jsonObject[((((fieldNames[i].replace(/ /g, "")).replace("(", "")).replace(")", ""))).replace(/\//g, "")]
      //       = dataToJson[i];
  
      //         } 
      //     jsonAarray.push(jsonObject);
      //     jsonObject = {};
      // } 




      for(var i=0; i<fieldNames.length ; i++){               
  
                   jsonObject[((((fieldNames[i].replace(/ /g, "")).replace("(", "")).replace(")", ""))).replace(/\//g, "")]
              = "";
    
                } 



                var keys = Object.keys(insertjson);
                var values = Object.keys(insertjson).map(function (key) { return insertjson[key]; });
    
    
                for (var j=0;j<keys.length;j++){

                  jsonObject[keys[j]] = values[j];
      
                } 

                jsonAarray.push(jsonObject);
     this.testvar=JSON.stringify(jsonAarray, undefined, 2);
     return  JSON.stringify(jsonAarray, undefined, 2);
  }



  public DBopen(jsonQuery):any{
    var indexedDB = window.indexedDB;
    var jsonObject = {};
    var jsonAarray=[];

    // Open (or create) the database
    var open = indexedDB.open("VodaDatabase", 1);

   // Create the schema
    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
       };
    open.onerror = function() {
      var db = open.result;
      var store = db.createObjectStore("MyObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
      };

      var obj = {"ID":"You are welcome"};
      var keys = Object.keys(jsonQuery);
      console.log( keys[ 0 ] );
   
    open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("VodaObjectStore", "readwrite");
        var store = tx.objectStore("VodaObjectStore");
     
        var cursorRequest = store.openCursor();

        cursorRequest.onerror = function(error) {
          console.log(error);
         };
         var count = 0;
        cursorRequest.onsuccess = function(evt) {                    
          var cursor = evt.target.result;
          if (cursor) {
           // console.log(cursor.value);
           //   items.push(cursor.value);
           // getString(keys[0])
         //  console.log(cursor.value[keys[0]]);
          // console.log(cursor.value.ID);
           if(cursor.value [ keys[0] ] ==8){
             // count++; 
             // console.log(count +"   "+cursor.value);
              console.log(cursor.value);
              
              jsonAarray.push(jsonObject);
              jsonObject = {};
              }
              cursor.continue();
          }
         };

        

       //  store.clear();
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };


    }
    return  JSON.stringify(jsonAarray, undefined, 2);
  }

/// insert data to DB and iswholeCSVsyncintoDB define that first time sync or one-by-one insertion
  BDinsert(data,iswholeCSVsyncintoDB) {

    var indexedDB = window.indexedDB;

    // Open (or create) the database
    var open = indexedDB.open("VodaDatabase", 1);
    
    // Create the schema
    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("VodaObjectStore", {keyPath: "ID"}/*{autoIncrement:true}*/);
    };
    
    open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("VodaObjectStore", "readwrite");
        var store = tx.objectStore("VodaObjectStore");

    
        // Add some data

        var obj = JSON.parse(data);
       // this.testvar=Object.keys(obj).length;
       if(iswholeCSVsyncintoDB){
        for (var j = 0; j < Object.keys(obj).length-1; j++) {
         // console.log(obj[j]);    
          store.put(obj[j]);

        }
      }
      else{
        for (var j = 0; j < Object.keys(obj).length; j++) {
          // console.log(obj[j]);    
           store.put(obj[j]);
 
         }
      }


        // store.put({id: 12, FirstName:"sy12", age: 42,school:"absdc"});
        // store.put({id: 13, FirstName:"sy12", age: 42,school:"abvcc"});
        // store.put({id: 14, FirstName:"syudygdvc12", age: 42,school:"abcfds"});
      
        var cursorRequest = store.openCursor();


        cursorRequest.onerror = function(error) {
          console.log(error);
         };
   
        cursorRequest.onsuccess = function(evt) {                    
          console.log("Success");
         };

       //  store.clear();
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
       

    }
   // this.DBopen();
  }

  public delEvent(){
    
    var DBDeleteRequest = window.indexedDB.deleteDatabase("VodaDatabase");

      DBDeleteRequest.onerror = function(event) {
        console.log("Error deleting database.");
      };
 
    DBDeleteRequest.onsuccess = function(event) {
        console.log("Database deleted successfully");   
     
      };
  }


}
