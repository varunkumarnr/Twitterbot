const Twit = require("twit");

var config = require("./config");
const T = new Twit(config);

var stream = { q: "#100DaysofCode", count: 25, result_type: "recent" };

const retweetLatest = () => {
  T.get("search/tweets", stream, (error, data) => {
    console.log(error, data);
    if (!error) {
      let retweet_id = data.statuses[0].id_str;
      T.post("statuses/retweet/" + retweet_id, {}, (error, response) => {
        if (response) {
          console.log("Success");
        }
        if (error) {
          console.log(error);
        }
      });
    } else {
      console.log("There was an error with your hashtag search:", error);
    }
  });
};
retweetLatest();
setInterval(retweetLatest, 1000 * 60 * 10);

console.log("running");
