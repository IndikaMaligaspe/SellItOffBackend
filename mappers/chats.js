
const config =  require("config");
const { date } = require("joi");

const mapper = (chat, _id) => {
    console.log("Inside Mapper")
    const baseUrl = config.get("assetsBaseUrl");
    const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    const daysOfWeek = ["Sun","Mon","Wed","Thu","Fri","Sat"]

    const getUser = (id) =>{
      if (_id===id)
          return "You";
      else
        return "";
    }
    
    const getDate = (dateTime)=>{
      let dateStr = ''
      try {
        let date = new Date(dateTime);
        dateStr =`${daysOfWeek[date.getUTCDay()]}, ${months[date.getUTCMonth()]}`;
      } catch (error) {
        console.log(error);
      }
      return dateStr
    }

    const getTime = (dateTime)=>{
      let dateStr = ''
      try {
        let date = new Date(dateTime);
        dateStr =`${date.getHours()}:${date.getMinutes()}`;
      } catch (error) {
        console.log(error);
      }
      return dateStr
    }

    const mapImage = image => ({
      thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`
    });
    
    return {
      ...chat,
      // images: chat.images.map(mapImage),
      sender: getUser(chat.fromUser),
      dateStr: getDate(chat.dateTime),
      timeStr: getTime(chat.dateTime),
    };
}

module.exports = mapper;