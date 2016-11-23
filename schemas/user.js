/**
 * Created by fuzhihong on 16/11/23.
 */
var mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
    name:String,
    password:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
});

UserSchema.statics={
    fetch:function(cb){
        return this.find({})
                   .sort('meta.updateAt')
                   .exec(cb)
    },
    findByName:function(name,cb){
        return this.findOne({name:name}).exec()
    }

};
module.exports=UserSchema