/**
 * Created by fuzhihong on 16/11/19.
 */
var mongoose=require('mongoose');

var MovieSchema=require('../schemas/movie');

var Movie=mongoose.model('Movie',MovieSchema)

module.exports=Movie