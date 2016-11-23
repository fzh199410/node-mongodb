/**
 * Created by fuzhihong on 16/11/23.
 */
var mongoose=require('mongoose');

var UserSchema=require('../schemas/user');

var User=mongoose.model('User',UserSchema);

module.exports=User