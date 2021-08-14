const User = require('../models/user');
const Webpage = require('../models/webpage');

var log = {};

const create_webpage = async (url)=>{
    try{
       var webpage =  await Webpage({
           url:url,
           visits:0,
           visitors:[],
        }).save();
        return webpage;
    }catch(e){
        throw e;
    }
}

const get_webpage = async (url)=>{
    try{
        var webpage = await Webpage.findOne({url:url});
        if(!webpage) webpage = await create_webpage(url);

        return webpage;
    } catch(e){
        throw e;
    }
}

log.visit = async (url, user)=>{
    try{
        user.visits.push(url);
        await User(user).save();
        var webpage = await get_webpage(url);
        webpage.visits++;
        webpage.visitors.push(user._id);
        await Webpage(webpage).save();
        return;
    } catch(e){
        throw e;
    }
        
    
}

module.exports = log;