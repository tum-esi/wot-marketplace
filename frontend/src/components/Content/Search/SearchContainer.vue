<template>
  <div>
    <SearchBar
      v-on:search-btn-clicked="searchBtnClicked"
      v-on:add-project-btn-clicked="projectBtnClicked"
    />
    <Status
      v-bind:class="{invisible: !loading && status != 'load'}"
      v-bind:status="status"
      v-bind:propSearchTerm="searchTerm"
    />
    <div
      class="status-container"
      v-bind:class="{invisible: status != 'noResult'}"
    >There are no projects for "{{ searchTerm }}"</div>
    <SearchResults v-bind:projects="projects" v-on:project-item-clicked="projectItemClicked"/>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import Status from "./Status.vue";
import SearchResults from "./SearchResults.vue";
import fetch from "node-fetch";
import ProjectItemVue from "./ProjectItem.vue";

export default {
  name: "SearchContainer",
  components: {
    SearchBar,
    Status,
    SearchResults
  },
  data() {
    return {
      searchTerm: "",
      loading: false,
      status: "",
      projects: [],
      err: undefined
    };
  },
  methods: {
    searchBtnClicked(searchTerm) {
      this.searchTerm = searchTerm;
      this.status = "load";
      this.loading = true;
      // this.projects = [];
      // fetch(
      //   `../../api/search?q=${encodeURIComponent(
      //     this.searchTerm
      //   )}&count=10`
      // )
      //   .then(res => res.json())
      //   .then(json => {
      //     this.loading = false;
      //     this.status = "";
      //     this.projects = json.results;
      //     if (this.projects.length === 0) {
      //       this.status = "noResult";


      // this.projects = [];
      // fetch(
      //   `api/search?q=${encodeURIComponent(
      //     this.searchTerm
      //   )}&count=10`
      // )
      //   .then(res => res.json())
      //   .then(json => {
      //     this.loading = false;
      //     this.status = "";
      //     this.projects = json.results;
      //     if (this.projects.length === 0) {
      //       this.status = "noResult";
      //     }
      //     console.log("results", json.results);
      //   })
      //   .catch(err => {
      //     this.status = "error";
      //     this.error = err;
      //   });
      this.projects = [
        {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["python", "sensehat"],
          _id: "5cb1c65f1c9d440000eb922d",
          name: "SenseHAT_python",
          shortDescription: "senseHAT WoT implementation in python",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {
            "@context": "http://www.w3.org/ns/td",
            "@type": "Thing",
            name: "SenseHat",
            description: "Raspberry Pi SenseHat",
            security: [
              {
                scheme: "nosec"
              }
            ],
            properties: {
              displayRotation: {
                type: "integer",
                readOnly: false,
                writeOnly: false,
                description:
                  "The roation of the display. 0 is whith the HDMI port facing down.",
                enum: [0, 90, 180, 270],
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/displayRotation",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              pixels: {
                type: "array",
                minItems: 64,
                maxItems: 64,
                items: {
                  type: "array",
                  items: {
                    type: "integer",
                    minimum: 0,
                    maximum: 255
                  },
                  minItems: 3,
                  maxItems: 3
                },
                readOnly: false,
                writeOnly: false,
                description:
                  "An array containing the current colours of all LEDs.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pixels",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              lowLight: {
                type: "boolean",
                readOnly: false,
                writeOnly: false,
                description: "The LED Matrix low light mode.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/lowLight",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              humidity: {
                type: "number",
                description: "The percentage of relative humidity.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/humidity",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              temperature: {
                type: "number",
                description: "The current temperature in degrees Celsius.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/temperature",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              pressure: {
                type: "number",
                description: "The current pressure in Millibars.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pressure",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              gyro: {
                type: "object",
                description:
                  "Get 3 Floats representing the rotational intensity of each axis in rads/second.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/gyro",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              accel: {
                type: "object",
                description:
                  "Get 3 Floats representing the acceleration intensity of each axis in Gs",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/accel",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              compass: {
                type: "object",
                description:
                  "Get 3 Floats representing the magnetic intensity of the axis in microteslas.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/compass",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              eventHistory: {
                type: "array",
                description: "An array containing the complete event history.",
                readOnly: true,
                items: {
                  type: "string"
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/eventHistory",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              }
            },
            actions: {
              flipH: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipH",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flipV: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipV",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the scrolling speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    scrollSpeed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showLetter: {
                input: {
                  type: "object",
                  description:
                    "The letter to show. May include text/background colours.",
                  properties: {
                    s: {
                      type: "string"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["s"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showLetter",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flashMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the flashing speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    speed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/flashMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              setPixel: {
                input: {
                  type: "object",
                  description:
                    "Set the pixel in the given (x,y) coordinates to a given RGB color.",
                  properties: {
                    x: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    y: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    r: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    g: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    b: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/setPixel",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              clear: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/clear",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              }
            },
            events: {
              joystickPress: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickPress",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickRelease: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickRelease",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickHold: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickHold",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              }
            },
            id: "de:tum:ei:esi:sensehat:192.168.0.106",
            forms: [
              {
                href: "http://192.168.0.106:8080/SenseHat/all/properties",
                contentType: "application/json"
              }
            ]
          }
        },
        {
          topic: ["actuator", "sensor", "robotics", "other"],
          tags: ["python", "sensehat", "raspberry"],
          _id: "5cb1c6c01c9d440000eb922f",
          name: "SenseHAT_sensors_only_python",
          shortDescription:
            "senseHAT WoT implementation in python - sensors only",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {
            "@context": "http://www.w3.org/ns/td",
            "@type": "Thing",
            name: "SenseHat",
            description: "Raspberry Pi SenseHat",
            security: [
              {
                scheme: "nosec"
              }
            ],
            properties: {
              displayRotation: {
                type: "integer",
                readOnly: false,
                writeOnly: false,
                description:
                  "The roation of the display. 0 is whith the HDMI port facing down.",
                enum: [0, 90, 180, 270],
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/displayRotation",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              pixels: {
                type: "array",
                minItems: 64,
                maxItems: 64,
                items: {
                  type: "array",
                  items: {
                    type: "integer",
                    minimum: 0,
                    maximum: 255
                  },
                  minItems: 3,
                  maxItems: 3
                },
                readOnly: false,
                writeOnly: false,
                description:
                  "An array containing the current colours of all LEDs.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pixels",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              lowLight: {
                type: "boolean",
                readOnly: false,
                writeOnly: false,
                description: "The LED Matrix low light mode.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/lowLight",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              humidity: {
                type: "number",
                description: "The percentage of relative humidity.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/humidity",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              temperature: {
                type: "number",
                description: "The current temperature in degrees Celsius.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/temperature",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              pressure: {
                type: "number",
                description: "The current pressure in Millibars.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pressure",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              gyro: {
                type: "object",
                description:
                  "Get 3 Floats representing the rotational intensity of each axis in rads/second.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/gyro",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              accel: {
                type: "object",
                description:
                  "Get 3 Floats representing the acceleration intensity of each axis in Gs",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/accel",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              compass: {
                type: "object",
                description:
                  "Get 3 Floats representing the magnetic intensity of the axis in microteslas.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/compass",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              eventHistory: {
                type: "array",
                description: "An array containing the complete event history.",
                readOnly: true,
                items: {
                  type: "string"
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/eventHistory",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              }
            },
            actions: {
              flipH: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipH",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flipV: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipV",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the scrolling speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    scrollSpeed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showLetter: {
                input: {
                  type: "object",
                  description:
                    "The letter to show. May include text/background colours.",
                  properties: {
                    s: {
                      type: "string"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["s"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showLetter",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flashMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the flashing speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    speed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/flashMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              setPixel: {
                input: {
                  type: "object",
                  description:
                    "Set the pixel in the given (x,y) coordinates to a given RGB color.",
                  properties: {
                    x: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    y: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    r: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    g: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    b: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/setPixel",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              clear: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/clear",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              }
            },
            events: {
              joystickPress: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickPress",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickRelease: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickRelease",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickHold: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickHold",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              }
            },
            id: "de:tum:ei:esi:sensehat:192.168.0.106",
            forms: [
              {
                href: "http://192.168.0.106:8080/SenseHat/all/properties",
                contentType: "application/json"
              }
            ]
          }
        },
        {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["ipsum eiusmod ut officia", "aliqua culpa Duis consequat"],
          _id: "5cb1c6891c9d440000eb922e",
          name: "SenseHAT_display_only_python",
          shortDescription:
            "senseHAT WoT implementation in python - display only",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {
            "@context": "http://www.w3.org/ns/td",
            "@type": "Thing",
            name: "SenseHat",
            description: "Raspberry Pi SenseHat",
            security: [
              {
                scheme: "nosec"
              }
            ],
            properties: {
              displayRotation: {
                type: "integer",
                readOnly: false,
                writeOnly: false,
                description:
                  "The roation of the display. 0 is whith the HDMI port facing down.",
                enum: [0, 90, 180, 270],
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/displayRotation",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              pixels: {
                type: "array",
                minItems: 64,
                maxItems: 64,
                items: {
                  type: "array",
                  items: {
                    type: "integer",
                    minimum: 0,
                    maximum: 255
                  },
                  minItems: 3,
                  maxItems: 3
                },
                readOnly: false,
                writeOnly: false,
                description:
                  "An array containing the current colours of all LEDs.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pixels",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              lowLight: {
                type: "boolean",
                readOnly: false,
                writeOnly: false,
                description: "The LED Matrix low light mode.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/lowLight",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              humidity: {
                type: "number",
                description: "The percentage of relative humidity.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/humidity",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              temperature: {
                type: "number",
                description: "The current temperature in degrees Celsius.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/temperature",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              pressure: {
                type: "number",
                description: "The current pressure in Millibars.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pressure",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              gyro: {
                type: "object",
                description:
                  "Get 3 Floats representing the rotational intensity of each axis in rads/second.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/gyro",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              accel: {
                type: "object",
                description:
                  "Get 3 Floats representing the acceleration intensity of each axis in Gs",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/accel",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              compass: {
                type: "object",
                description:
                  "Get 3 Floats representing the magnetic intensity of the axis in microteslas.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/compass",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              eventHistory: {
                type: "array",
                description: "An array containing the complete event history.",
                readOnly: true,
                items: {
                  type: "string"
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/eventHistory",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              }
            },
            actions: {
              flipH: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipH",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flipV: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipV",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the scrolling speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    scrollSpeed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showLetter: {
                input: {
                  type: "object",
                  description:
                    "The letter to show. May include text/background colours.",
                  properties: {
                    s: {
                      type: "string"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["s"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showLetter",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flashMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the flashing speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    speed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/flashMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              setPixel: {
                input: {
                  type: "object",
                  description:
                    "Set the pixel in the given (x,y) coordinates to a given RGB color.",
                  properties: {
                    x: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    y: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    r: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    g: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    b: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/setPixel",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              clear: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/clear",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              }
            },
            events: {
              joystickPress: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickPress",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickRelease: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickRelease",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickHold: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickHold",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              }
            },
            id: "de:tum:ei:esi:sensehat:192.168.0.106",
            forms: [
              {
                href: "http://192.168.0.106:8080/SenseHat/all/properties",
                contentType: "application/json"
              }
            ]
          }
        },
        {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["ipsum eiusmod ut officia", "aliqua culpa Duis consequat"],
          _id: "5cadf50d2ee9cebbd40b97d9",
          name: "SenseHAT_node-wot",
          shortDescription:
            "senseHAT implementation using the node-wot library",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {
            "@context": "http://www.w3.org/ns/td",
            "@type": "Thing",
            name: "SenseHat",
            description: "Raspberry Pi SenseHat",
            security: [
              {
                scheme: "nosec"
              }
            ],
            properties: {
              displayRotation: {
                type: "integer",
                readOnly: false,
                writeOnly: false,
                description:
                  "The roation of the display. 0 is whith the HDMI port facing down.",
                enum: [0, 90, 180, 270],
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/displayRotation",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              pixels: {
                type: "array",
                minItems: 64,
                maxItems: 64,
                items: {
                  type: "array",
                  items: {
                    type: "integer",
                    minimum: 0,
                    maximum: 255
                  },
                  minItems: 3,
                  maxItems: 3
                },
                readOnly: false,
                writeOnly: false,
                description:
                  "An array containing the current colours of all LEDs.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pixels",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              lowLight: {
                type: "boolean",
                readOnly: false,
                writeOnly: false,
                description: "The LED Matrix low light mode.",
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/lowLight",
                    contentType: "application/json",
                    op: ["readproperty", "writeproperty"]
                  }
                ]
              },
              humidity: {
                type: "number",
                description: "The percentage of relative humidity.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/humidity",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              temperature: {
                type: "number",
                description: "The current temperature in degrees Celsius.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/temperature",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              pressure: {
                type: "number",
                description: "The current pressure in Millibars.",
                readOnly: true,
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/pressure",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              gyro: {
                type: "object",
                description:
                  "Get 3 Floats representing the rotational intensity of each axis in rads/second.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/gyro",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              accel: {
                type: "object",
                description:
                  "Get 3 Floats representing the acceleration intensity of each axis in Gs",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/properties/accel",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              compass: {
                type: "object",
                description:
                  "Get 3 Floats representing the magnetic intensity of the axis in microteslas.",
                readOnly: true,
                properties: {
                  x: {
                    type: "number"
                  },
                  y: {
                    type: "number"
                  },
                  z: {
                    type: "number"
                  }
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/compass",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              },
              eventHistory: {
                type: "array",
                description: "An array containing the complete event history.",
                readOnly: true,
                items: {
                  type: "string"
                },
                writeOnly: false,
                observable: false,
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/properties/eventHistory",
                    contentType: "application/json",
                    op: ["readproperty"]
                  }
                ]
              }
            },
            actions: {
              flipH: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipH",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flipV: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/flipV",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the scrolling speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    scrollSpeed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              showLetter: {
                input: {
                  type: "object",
                  description:
                    "The letter to show. May include text/background colours.",
                  properties: {
                    s: {
                      type: "string"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["s"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/showLetter",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              flashMessage: {
                input: {
                  type: "object",
                  description:
                    "The message to show. May include the flashing speed and text/background colours.",
                  properties: {
                    textString: {
                      type: "string"
                    },
                    speed: {
                      type: "number"
                    },
                    textColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    },
                    backColour: {
                      type: "array",
                      items: {
                        type: "integer",
                        minimum: 0,
                        maximum: 255
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/actions/flashMessage",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              setPixel: {
                input: {
                  type: "object",
                  description:
                    "Set the pixel in the given (x,y) coordinates to a given RGB color.",
                  properties: {
                    x: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    y: {
                      type: "integer",
                      minimum: 0,
                      maximum: 7
                    },
                    r: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    g: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    },
                    b: {
                      type: "integer",
                      minimum: 0,
                      maximum: 255
                    }
                  },
                  required: ["textString"]
                },
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/setPixel",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              },
              clear: {
                forms: [
                  {
                    href: "http://192.168.0.106:8080/SenseHat/actions/clear",
                    contentType: "application/json",
                    op: ["invokeaction"]
                  }
                ],
                idempotent: false,
                safe: false
              }
            },
            events: {
              joystickPress: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickPress",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickRelease: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickRelease",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              },
              joystickHold: {
                type: "string",
                enum: ["left", "right", "up", "down", "click"],
                forms: [
                  {
                    href:
                      "http://192.168.0.106:8080/SenseHat/events/joystickHold",
                    contentType: "application/json",
                    subprotocol: "longpoll",
                    op: ["subscribeevent"]
                  }
                ]
              }
            },
            id: "de:tum:ei:esi:sensehat:192.168.0.106",
            forms: [
              {
                href: "http://192.168.0.106:8080/SenseHat/all/properties",
                contentType: "application/json"
              }
            ]
          }
        },
        {
          topic: ["actuator", "sensor"],
          tags: ["sensehat"],
          _id: "5cadf50d2ee9cebbd40b97da",
          name: "senseHat-node-js-native",
          shortDescription:
            "senseHAT implementation using native http libraries",
          longDescription:
            "Implemented using the native http libraries of nodejs. Supports all button clicks and sensor readings with a 2ms refresh rate",
          github: "https://github.com/<#n:MoL2o",
          implementationType: "code",
          platform: "raspberry",
          complexity: "simple",
          td: {
            name: "senseHAT",
            id: "urn:dev:wot:com:example:servient:sensehat",
            securityDefinitions: {
              basic_sc: {
                scheme: "basic",
                in: "header"
              }
            },
            security: ["basic_sc"]
          }
        }
      ];
      this.loading = false;
      this.status = "";
    },
    projectBtnClicked() {
      this.$router.push({
        name: "AddProject"
      });
    },
    projectItemClicked(clickedProject) {
      //TODO: don't pass data with routes use data store instead
      this.$router.push({
        name: "Project",
        params: { project: { clickedProject } }
      });
    }
  }
};
</script>

<style scoped>
.status-container {
  padding: 10px;
  text-align: center;
}
</style>


