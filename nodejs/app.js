var cust_name = "Pizza Planet";
var schedule_message = "Our schedule is 24 by 7";
var website = "pizzaplanet.com";
var address = "In the food court at Westfield century mall, near the AMC";
var address_link = "http://goo.gl/myaddress";
var location_name = "Pixar";
var full_schedule = "11am to 11pm, every day of the week";
var job_message_sms = "Apply here: https://rb.gy/jggmdm.  We have flexible full time and part time positions. Quick service and restaurant experience is a plus, but we also offer training on the job.  Thanks for your interest!";
var website_info_sms = "Skip the wait - order for pickup, delivery, or catering at ${website}.  Orders can be scheduled up to 1 week in advance";

const express = require('express')
const app = express()
const port = 3000

const greeting = {
  module: "tts",
  data: {
    text: `Thanks for calling ${cust_name}, ${schedule_message}`
  },
  children: {
    _: {
      module: "pivot",
      data: {
        voice_url: "http://app01.van1.voxter.net:3000/mainMenu?first=true",
        req_format: "kazoo"
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
      module: "flush_dtmf",
      data: {
        collection_name: "default",
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
                    voice_url: "http://app01.van1.voxter.net:3000/mainMenuOption",
                    req_format: "kazoo"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function buildHoursMenu(selectedDigit) {
  console.log("Entered buildHoursMenu: Selected Digit "+selectedDigit);

  switch (selectedDigit) {
    case '1':
      var hoursMenuOption = {
        module: "tts",
        data: {
          text: "You pressed 1. Hours and Address SMS being prepared."
        },
        children: {
          _: {
            module: "tts",
            data: {
              text: "Your information has been sent, please check your mobile device"
            },
            children: {
              _: {
                module: "pivot",
                data: {
                  voice_url: "http://app01.van1.voxter.net:3000/mainMenu",
                  req_format: "kazoo"
                }
              }
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
              voice_url: "http://app01.van1.voxter.net:3000/mainMenu",
              req_format: "kazoo"
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
      var mainMenuOption = {
        module: "tts",
        data: {
          text: "You pressed 1. SMS is being prepared.",
        },
        children: {
          _: {
            module: "tts",
            data: {
              text: "Your information has been sent, please check your mobile device"
            },
            children: {
              _: {
                module: "pivot",
                data: {
                  voice_url: "http://app01.van1.voxter.net:3000/mainMenu",
                  req_format: "kazoo"
                }
              }
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
                  voice_url: "http://app01.van1.voxter.net:3000/hoursMenuOption",
                  req_format: "kazoo"
                }
              }
            }
          }
        }
      }
      break;
    case '3':
  }

  var mainMenu = {
        module: "tts",
        data: {
          text: `This is the main menu.  You selected ${selectedDigit}`
        },
        children: {
          _: {
            module: "menu",
            data: {
              id: "b0aaf9e626a1efc7ac0fdf3c9c4e8d5c"
            },
            children: {
              1: {     // Website Info
                  module: "tts",
                  data: {
                    text: "You pressed 1",
                  },
                  engine: "google",
                  children: {
                    _: {
                      module: "tts",
                      data: {
                        text: "Your information has been sent, please check your mobile device",
                      }
                    }
                  }
              },
              2: {     // Hours and Address
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
                            voice_url: "http://app01.van1.voxter.net:3000/mainMenuOption",
                            req_format: "kazoo"
                          }
                        }
                      }
                    }
                  }
              },
              3: {     // Speak to someone
                      module: "tts",
                      engine: "google",
                      data: {
                        text: "You pressed 3",
                      },
              },
              5: {     // Apply for Job
                      module: "tts",
                      engine: "google",
                      data: {
                        text: "You pressed 5",
                      },
              },
              6: {     // Support
                      module: "tts",
                      engine: "google",
                      data: {
                        text: "You pressed 6",
                      },
              },
              7: {     // Repeat Options
                      module: "tts",
                      engine: "google",
                      data: {
                        text: "You pressed 7",
                      },
                }
              }
            }
          }
        }
  return mainMenuOption;
}

app.get('/', (req, res) => {

      console.log(req.url);

      console.log("Request to / received (greeting)");

      const jsonContent = JSON.stringify(greeting); 

      res.send(jsonContent);

});

app.get('/mainMenu', (req, res) => {

      console.log(req.url);

      console.log("Request to /mainMenu received");
      var query = req.query;

      //console.log(query);
      if ( req.query.first ) {
        console.log("CAME FROM greeting. first run.");
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
      } else {
        jsonContent = JSON.stringify(mainMenu);

        console.log(jsonContent);
        res.send(jsonContent);
      }
});

app.get('/mainMenuOption', (req, res) => {

      console.log(req.url);

      var selectedDigit = req.query.Digits['menu_selection'];

      mainMenuOption = buildMainMenu(selectedDigit);
      jsonContent = JSON.stringify(mainMenuOption);

      console.log("Request to /mainMenuOption received");
      console.log(jsonContent);
      res.send(jsonContent);
});

app.get('/hoursMenuOption', (req, res) => {

      console.log(req.url);

      var selectedDigit = req.query.Digits['hours_selection'];

      hoursMenuOption = buildHoursMenu(selectedDigit);
      jsonContent = JSON.stringify(hoursMenuOption);

      console.log("Request to /hoursMenuOption received");
      console.log(jsonContent);
      res.send(jsonContent);
});

app.listen(port, () => {
    console.log(`Example Toast IVR app listening on port ${port}`)
});

