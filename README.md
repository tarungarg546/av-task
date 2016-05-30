# av-task
Task for Analytics Vidhya


## Setup
  - Install latest version of node.js from their official site.
  - Once you have "latest" version of node installed, clone this repo  and change your pwd to this project.
  - Once you have it cloned run :- 
          `npm i` or `npm install` on your terminal it will install all the dependencies required by my project to work.
  - Then you have to create tables as given by rules.csv and users.csv in my repo. _(The file you have provided for reference has two columns with same name 'Trier 1' so i have to modify to get it working with mysql as MySQL can't have two columns with same name)._
  - Now, you have to create a directory with name "creden"(without quotes) and inside that directory create an index.js file.
      Content of index.js would look something like :-
      ```
      module.exports={
      
             mysql:{
      
                host:"your host",
      
                user:"user of db",
      
                password:"password of db",
      
                database:"db to use"
             
             }
      
      }
      ```
      
  - Once you have it all done run node app.js from your terminal and you should not see any kind of error.
  - Now our application is set to launch.


## Action Time
  * Open "Google Chrome" head over to [http://localhost:8080/admin](http://localhost:8080/admin "Title") to see admin interface.
  
      - In admin interface you can add another user,remove user as well as modify membership of a user.(We'll discuss membership later)
  
      - You can also browse
          * [http://localhost:8080/recruiter/recruiter_1](http://localhost:8080/recruiter/recruiter_1 "Title") 
          * [http://localhost:8080/recruiter/recruiter_2](http://localhost:8080/recruiter/recruiter_2 "Title")
          * [http://localhost:8080/recruiter/recruiter_3](http://localhost:8080/recruiter/recruiter_3 "Title") 
        
        to see recruiter's interface.
  
  * Everyone of recruiter_1,recruiter_2 & recruiter_3 have different capabilities.
  
    - recruiter_1 can see everything except Contact Details, CTC & Serial number of user.
  
    - recruiter_2 can see everything except  CTC & Serial Number of user.
  
    - recruiter_3 can see everything.
  
  You can visualize these as three level of subscriptions made by recruiters and based on subscriptions we give them different pictures of our database.

_In case of any queries or error, feel free to reach out to [tarungarg546@gmail.com](mailto:tarungarg546@gmail.com "Title")
