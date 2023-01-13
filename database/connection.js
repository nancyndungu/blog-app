const mysql = require('mysql');
const DB = mysql.createConnection({
    host:   'sql7.freesqldatabase.com',
    user: 'sql7588511',
    port: 3306,
    password: 'LW4uSdIraf',
    database: 'sql7588511',
    multipleStatements: true
});


DB.connect((err) => {
    if (!err){
        console.log("connected to database")
        DB.query("SELECT 1 FROM blogs", (err,result)=>{
            if (err){
                console.log("creating table")
                DB.query(
                    `
                    CREATE TABLE blogs ( 
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(50) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP )
                    `
                )
                console.log("creating table")    
            }else{
                console.log("table already exist")
            }
        })
    }else{
        console.log("Connection Failed")
    }
    
})    
module.exports= DB