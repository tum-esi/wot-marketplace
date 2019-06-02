<template>
  <div class="code-container">
    <vue-json-pretty
      :data="code"
      :showDoubleQuotes="true"
      :showLine="true"
      :showLength="true"
      :highlightMouseoverNode="true"
    ></vue-json-pretty>
    <!-- showDoubleQuotes is for showing quotes at property names
    showLine is for the vertical line, not sure if it is better or not this way. Cleaner without but makes it easier to understand a TD
    showLength puts "// 1 item" on the line that would make it annoying for copy pasting since it would be invalid JSON but could be enabled
    highlightMouseoverNode puts the highlight on a string or object or array, not sure if it usefull in deployment but it doesn't hurt and also nice for demo videos and screenshots
    -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueJsonPretty from "vue-json-pretty";

export default Vue.extend({
  name: "aCodeBox",
  components: {
    VueJsonPretty
  },
  props: {
    /**
     * The code which should be shown. Needs to be a valid json object.
     */
    code: {
      // type: Object,
      required: true
    }
  }
});
</script>


<style scoped>
.code-container {
  word-wrap: normal;
  padding: 5px 10px;
  color: #222;
  background: #fff;
}

.code-container code {
  overflow: auto;
  tab-size: 4;
}
</style>


 "properties": {
            "humidity": {
                "type": "number",
                "description": "The percentage of relative humidity.",
                "readOnly": true,
                "writeOnly": false,
                "observable": false,
                "forms": [{
                    "href": 
"http://192.168.0.106:8080/SenseHat/properties/humidity",
                    "contentType": "application/json",
                    "op": ["readproperty"]
                }]
            },
            "temperature": {
                "type": "number",
                "description": "The current temperature in degrees 
Celsius.",
                "readOnly": true,
                "writeOnly": false,
                "observable": false,
                "forms": [{
                    "href": 
"http://192.168.0.106:8080/SenseHat/properties/temperature",
                    "contentType": "application/json",
                    "op": ["readproperty"]
                }]
            },
            "pressure": {
                "type": "number",
                "description": "The current pressure in Millibars.",
                "readOnly": true,
                "writeOnly": false,
                "observable": false,
                "forms": [{
                    "href": 
"http://192.168.0.106:8080/SenseHat/properties/pressure",
                    "contentType": "application/json",
                    "op": ["readproperty"]
                }]
            },