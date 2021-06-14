let control = 'home';
var homeModel = require('../models/homemodels');
class HomeController {
    index (req,res,next){
            var locals = {
                title: 'Page Title',
                description: 'Page Description',
                header: 'Page Header',
                control:'home'
            };
            homeModel.get(req.conn,function(err,rows){
                res.render("./backend/"+control+"/index",{ layout: './backend/layout',locals:locals,data:rows});
            });  
    }
    // add data
    add(req,res){
        res.render("./backend/"+control+"/add",{ layout: './backend/layout' });
    }
    store(req,res){
        homeModel.create(req.conn,req.body,function(err){
            if (!err) {
                res.redirect('/'+control);
            }
        });
    }
    edit(req,res){
        var locals = {
            title: 'Page Title',
            description: 'Page Description',
            header: 'Page Header',
            control:'home'
        };
        homeModel.edit(req.conn,req.params.id,function(err,rows){
            if (!err) {
                res.render("./backend/"+control+"/edit",{ layout: './backend/layout',data:rows,id:req.params.id,locals:locals});
            }
        });
    }
    update(req,res){
        homeModel.update(req.conn,req.body,req.params.id,function(err){
            if (!err) {
                res.redirect('/'+control);
            }
        });
    }
    destroy(req,res){
        homeModel.destroy(req.conn,req.params.id,function(err){
            if (err) {
                res.redirect('/'+control);
            }
            else{
                res.redirect('/'+control);
            }
           
        });
    }
    publish(req,res){
        homeModel.checkGlobals(req.conn,req.body,function(err){
           if (!err) {
                res.send(req.body)
           }
        });
    }
    delete(req,res){
        homeModel.delete(req.conn,req.body,function(error){
            if (!error) {
                res.send(req.body)
            }
        });
    }
}
module.exports = new HomeController;