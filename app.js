/**
 * Created by fuzhihong on 16/11/19.
 */
var express=require('express')
var path=require('path');
var mongoose=require('mongoose');
var underscore=require('underscore')
var bodyParser = require('body-parser')
var port=process.env.PORT || 3000
var Movie=require('./models/movie')
var User=require('./models/user')
mongoose.connect('mongodb://127.0.0.1:27017/imooc')

var app=express();

app.set('views','./views/pages');

app.set('view engine','jade')
;
app.use(bodyParser())

app.use(express.static(path.join(__dirname,'public')))

app.locals.moment = require('moment')

app.listen(port)

console.log('start in port'+port)

// index page
app.get('/',function(req,res){
    //User.fetch(function(err,users){
    //    console.log(users)
    //})
    Movie.fetch(function(err,result){
        if(err){console.log(err)}
        res.render('index',{
            title:'小电影 首页',
            movies:result
        })
    })

})

// detail page
app.get('/detail/:id',function(req,res){
   var id=req.params.id;
   console.log('id:'+id)
   Movie.findById(id,function(err,result){
       console.log(result)
       res.render('detail',{
           title:result.title,
           movie:result
       })
   })
})

// list page
app.get('/admin/list',function(req,res){
   Movie.fetch(function(err,result){
       res.render('list',{
           title:'小电影 列表页',
           movies:result
       })
   })
})

// admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'小电影 后台',
        movie:{
            title:'',
            director:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
});

//更新电影
app.get('/admin/update/:id',function(req,res){
    var id=req.params.id

    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:movie.title,
                movie:movie
            })
        })
    }
})

//新建或者修改电影
app.post('/admin/movie/new',function(req,res){
    var id=req.body.movie._id;
    var movieObj=req.body.movie;
    var _movie;
    if(id!=='undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log('104:'+err)
            }else{

            }
            _movie=underscore.extend(movie,movieObj);
            console.log('109:'+_movie)
            _movie=new Movie(_movie)
            _movie.save(function(err,movie){
                if(err){console.log('112:'+err)}
                res.redirect('/detail/'+movie.id)
            })

        })
    }else{
        _movie=new Movie({
            director:movieObj.director,
            title:movieObj.title,
            language:movieObj.language,
            country:movieObj.country,
            summary:movieObj.summary,
            flash:movieObj.flash,
            poster:movieObj.poster,
            year:movieObj.year
        });
        _movie.save(function(err,movie){
            if(err){console.log('129:'+err)}
            res.redirect('/detail/'+movie.id)
        })
    }
})

//list delete
app.delete('/admin/list',function(req,res){
    var id=req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){console.log(err)}
            else{
                res.json({success:1})
            }
        })
    }

})
