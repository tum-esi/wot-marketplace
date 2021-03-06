<template>
  <div class="about-page-content">
    <div class="about-content">
      <h1>About</h1>
      <div>
        <h2>Who are we</h2>
        <p>
          WoTify is developed by researchers and students at the
          <a
            href="https://www.esi.ei.tum.de/en/home"
            target="_blank"
          >Embedded Systems and Internet of Things Research Group of Technical University of Munich</a>
          who also actively contribute to the WoT standardization efforts at the World Wide Web Consortium (W3C).
        </p>

        <p>
          We have other open-source projects that you can find on
          <a
            href="https://github.com/tum-ei-esi/"
            target="_blank"
          >our Github page</a>
          or
          <a href="https://www.npmjs.com/~tumeisesi" target="_blank">npm</a>.
        </p>

        <p>
          You can follow WoTify on
          <a href="https://twitter.com/wot_ify" target="_blank">Twitter</a>,
          where we announce newly published projects and other news!
        </p>
      </div>
      <div>
        <h2>What is WoTify</h2>
        <p>
          WoTify is a collection of devices that have been WoT-enabled. This
          means that each time someone writes code (or Thing Description Templates)
          for a sensor, actuator, robot or anything that produces a W3C Thing Description,
          it can be contributed to WoTify. This way anyone who owns the same device can
          quickly make their device WoT enabled.
        </p>
        <p>
          For example, you can write a simple HTTP server on Raspberry Pi that returns a sensor value
          when receiving a GET request. Then you would write the Thing Description of this
          Thing and contribute to WoTify.
        </p>
        <p>Use the following paper for referencing WoTify : 
          <a href="https://github.com/w3c/wot/blob/master/workshop/ws2/Papers/35%20-%20Korkan%20et%20al%2C%20TU%20Munich%20-%20Wotify.pdf">
            WoTify: A platform to bring Web of Things to your devices
          </a>
        </p>
      </div>
      <div>
        <h2>Useful Links</h2>
        <ul>
          <li>
            <a
              href="https://w3c.github.io/wot-thing-description/#"
              target="_blank"
            >Thing Description Specification</a>
          </li>
          <li>
            <a
              href="https://w3c.github.io/wot-architecture"
              target="_blank"
            >Web of Things Architecture</a>
          </li>
          <li>
            <a
              href="http://plugfest.thingweb.io/playground/"
              target="_blank"
            >Thing Description Playground</a>
          </li>
          <li>
            <a
              href="https://github.com/eclipse/thingweb.node-wot"
              target="_blank"
            >Eclipse Thingweb node-wot</a>
          </li>
        </ul>
      </div>
    </div>
    <Timeline id="wot_ify" source-type="profile" widget-class="about-page-twitter"></Timeline>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Timeline } from "vue-tweet-embed";

@Component({
  components: {
    Timeline
  }
})
export default class pContribute extends Vue {}
</script>

<style scoped>
.about-page-content {
  display: grid;
  grid-auto-flow: column;
  margin: 0 5vw;
}

.about-content {
  margin: 0 5vw;
}

.about-page-twitter {
  height: 80vh;
  width: 25vw;
  overflow: scroll;
  margin: auto;
}

.about-content h1 {
  text-align: center;
}
</style>
