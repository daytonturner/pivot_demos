var cust_name = "Pizza Planet";
var location_name = "Pixar";
var from_sms_number = "17787290818";
var to_sms_number = "16048893130";  // See sendSMS function for variable method using callerIDNumber
var schedule_message = "Our schedule is 24 by 7";
var website = "pizzaplanet.com";
var address = "In the food court at Westfield century mall, near the AMC";
var address_link = "http://goo.gl/myaddress";
var full_schedule = "11am to 11pm, every day of the week";
var job_message_sms = "Apply: https://rb.gy/jgdm. Full/part time positions. Quick svc/restaurant experience a plus, we also offer training. Thx for your interest!";
var website_info_sms = "Skip the wait - order for pickup, delivery, or catering at "+website+".  Orders can be scheduled up to 1 week in advance";

const express = require('express')
const https = require('https');
const app = express()
const port = 3000

const greeting = {
  module: "tts",
  data: {
    text: `Thanks for calling ${cust_name}, ${schedule_message}`,
    terminators: [ "#" ],
  },
  children: {
    _: {
      module: "pivot",
      data: {
        voice_url: "http://app01.van1.voxter.net:3000/mainMenu?first=true"
      }
    }
  }
}

const mainMenu = {
  module: "flush_dtmf",
  data: {
    collection_name: "menu_selection",
  },
  children: {
    _: {
      module: "tts",
      data: {
        text: `Main Menu. The fastest way to order is online.  If youd like us to text you a link to our website, press 1.  For our ${location_name} locations hours and address, press 2.  To place an order, press 3.   Were always looking for great people to join our team! If youd like us to text you a link to our job application, press 5.  For our customer support line, press 6.  To hear these options again, press 7.`
      },
      children: {
        _: {
          module: "collect_dtmf",
          data: {
            max_digits: 1,
            collection_name: "menu_selection",
          },
          children: {
            _: {
              module: "pivot",
              data: {
                voice_url: "http://app01.van1.voxter.net:3000/mainMenuOption"
              }
            }
          }
        }
      }
    }
  }
}

function sendSMS(messageText) {
  //Uncomment to use caller ID Number from pivot request.
  //var to_sms_number = callerIDNumber;

  var postData = "from="+from_sms_number+"&to="+to_sms_number+"&msg="+encodeURIComposnent(messageText);

  var httpsOptions = {
    hostname: 'manage.voxter.com',
    port: 443,
    path: '/api/v1/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = https.request(httpsOptions, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    console.log('postData:', postData);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();
}

function buildHoursMenu(selectedDigit) {
  console.log("Entered buildHoursMenu: Selected Digit "+selectedDigit);

  switch (selectedDigit) {
    case '1':
      var messageText = "We're located "+address;

      sendSMS(messageText);

      var messageText = "Link: "+address_link;

      sendSMS(messageText);

      var messageText = "Schedule this week is: "+full_schedule;

      sendSMS(messageText);

      var hoursMenuOption = {
        module: "tts",
        data: {
          text: "Your information has been sent, please check your mobile device"
        },
        children: {
          _: {
            module: "pivot",
            data: {
              voice_url: "http://app01.van1.voxter.net:3000/mainMenu"
            }
          }
        }
      }
    break;
    case '2':
      var hoursMenuOption = {
        module: "tts",
        data: {
          text: "You pressed 2. Returning to main menu."
        },
        children: {
          _: {
            module: "pivot",
            data: {
              voice_url: "http://app01.van1.voxter.net:3000/mainMenu"
            }
          }
        }
      }
    break;
  }
  return hoursMenuOption;
}

function buildMainMenu(selectedDigit) {

  console.log("Entered buildMainMenu: Selected Digit "+selectedDigit);

  switch (selectedDigit) {
    case '1':

      var messageText = website_info_sms;

      sendSMS(messageText);

      var mainMenuOption = {
        module: "tts",
        data: {
          text: "Your information has been sent, please check your mobile device"
        },
        children: {
          _: {
            module: "pivot",
            data: {
              voice_url: "http://app01.van1.voxter.net:3000/mainMenu"
            }
          }
        }
      }
      break;
    case '2':
      var mainMenuOption = {
        module: "tts",
        engine: "google",
        data: {
          text: `${schedule_message}. If you would like us to text you our full address and schedule, press 1.  To return to the main menu press 2.`,
        },
        children: {
          _: {
            module: "collect_dtmf",
            data: {
              max_digits: 1,
              collection_name: "hours_selection",
            },
            children: {
              _: {
                module: "pivot",
                data: {
                  voice_url: "http://app01.van1.voxter.net:3000/hoursMenuOption"
                }
              }
            }
          }
        }
      }
      break;
    case '3':
      var mainMenuOption = {
        module: "tts",
        engine: "google",
        data: {
          text: "Someone will be right with you"
        },
        children: {
          _: {
            module: "resources",
            data: {
              to_did: "16048893130",
              use_local_resources: false
            }
          }
        }
      }
      break;
    case '5':
      var messageText = job_message_sms;

      sendSMS(messageText);

      var mainMenuOption = {
        module: "tts",
        engine: "google",
        data: {
          text: "Our job application has been sent to you.  Please check your mobile device."
        },
        children: {
          _: {
            module: "pivot",
            data: {
              voice_url: "http://app01.van1.voxter.net:3000/mainMenu"
            }
          }
        }
      }
      break;
    case '6':
      var mainMenuOption = {
        module: "resources",
        data: {
          to_did: "16048893130",
          use_local_resources: false
        }
      }
      break;
    case '7':
      var mainMenuOption = {
        module: "pivot",
        data: {
          voice_url: "http://app01.van1.voxter.net:3000/mainMenu"
        }
      }
      break;
    default:
      var mainMenuOption = {
        module: "tts",
        data: {
          text: "Invalid Option, please try again"
        },
        children: {
          _: {
            module: "pivot",
            data: {
              voice_url: "http://app01.van1.voxter.net:3000/mainMenu"
            }
          }
        }
      }
  }

  return mainMenuOption;
}

// First point of entry - Play Greeting
app.get('/', (req, res) => {

      const callerIDNumber = req.query.Caller-ID-Number;
      console.log(req.url);
      console.log("=== Request to / received (greeting)");

      const jsonContent = JSON.stringify(greeting);

      res.send(jsonContent);

});

// Main Menu
app.get('/mainMenu', (req, res) => {

      console.log(req.url);
      console.log("=== Request to /mainMenu received");

      var query = req.query;

      // Found bug when collecting DTMF digits from the greeting, disabling for now.
      /*if ( req.query.first ) {
        //console.log("CAME FROM greeting. first run.");
         if ( query['Digits'] ) {
          var selectedDigit = query['Digits']['default'];

          mainMenuOption = buildMainMenu(selectedDigit);
          jsonContent = JSON.stringify(mainMenuOption);

          console.log("Request to /mainMenuOption received");
          console.log(jsonContent);

          res.send(jsonContent);
        } else {
          jsonContent = JSON.stringify(mainMenu);

          console.log(jsonContent);

          res.send(jsonContent);
        }
      } else { */
        jsonContent = JSON.stringify(mainMenu);

        console.log(jsonContent);

        res.send(jsonContent);
      // }
});

app.get('/mainMenuOption', (req, res) => {

      console.log(req.url);

      var selectedDigit = req.query.Digits['menu_selection'];

      mainMenuOption = buildMainMenu(selectedDigit);
      jsonContent = JSON.stringify(mainMenuOption);

      console.log("=== Request to /mainMenuOption received");
      console.log(jsonContent);

      res.send(jsonContent);
});

app.get('/hoursMenuOption', (req, res) => {

      console.log(req.url);

      var selectedDigit = req.query.Digits['hours_selection'];

      hoursMenuOption = buildHoursMenu(selectedDigit);
      jsonContent = JSON.stringify(hoursMenuOption);

      console.log("=== Request to /hoursMenuOption received");
      console.log(jsonContent);

      res.send(jsonContent);
});

app.listen(port, () => {
    console.log(`=== Example Toast IVR app listening on port ${port}`)
});