var con = require('../config/db');
class homemodels{
    // get ALL data
   get(conn,callback){
       con.query('SELECT *FROM user',callback);
   }
    //    Insert data
   create(conn,data,callback){
       con.query(`INSERT INTO user SET name='${data.fullname}',email = '${data.email}',
                                        address='${data.address}',
                                        phone='${data.phone}',
                                        publish='${data.publish?data.publish:0}'`,callback);
   }
    // get data where ID
   edit(conn,id,callback){
       con.query(`SELECT *FROM user WHERE id = ${id}`,callback);
   }
    // update data
   update(conn,data,id,callback){
       con.query(`UPDATE user SET name='${data.fullname}',email = '${data.email}',
        address='${data.address}',
        phone='${data.phone}',
        publish='${data.publish?data.publish:0}' WHERE id =${id}`,callback);
   }
    //  delete method DELETE
   destroy(conn,id,callback){
       con.query(`DELETE FROM user WHERE id =${id}`,callback);
   }
   checkGlobals(conn,data,callback){
       con.query(`UPDATE user SET publish=${data.publish} WHERE id = ${data.id}`,callback);
     
   }
     //  delete method GET
    delete(conn,data,callback){
        con.query(`DELETE FROM user WHERE id =${data.id}`,callback);
    }
   
}
module.exports = new homemodels;