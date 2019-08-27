<template>
  <div class="about-content">
    <h1>About</h1>
    <div>
      <h2>Who are we</h2>
      <p>
        WoTify is developed by researchers and students at the
        <a href="https://www.esi.ei.tum.de/en/home" target="_blank">Embedded Systems and Internet of Things Research Group of Technical University of Munich</a>
        who also actively contribute to the WoT standardization efforts at the World Wide Web Consortium (W3C).
      </p>

      <p>
        We have other open-source projects that you can find on
        <a href="https://github.com/tum-ei-esi/" target="_blank">our Github page</a>
        or
        <a href="https://www.npmjs.com/~tumeisesi" target="_blank">npm</a>.
      </p>
    </div>
    <div>
      <h2>What is WoTify</h2>
      <p>WoTify is a collection of devices that have been WoT-enabled. This 
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
    </div>
    <div>
      <h2>Useful Links</h2>
      <ul>
        <li><a href="https://w3c.github.io/wot-thing-description/#" target="_blank">Thing Description Specification</a></li>
        <li><a href="https://w3c.github.io/wot-architecture" target="_blank">Web of Things Architecture</a></li>
        <li><a href="http://plugfest.thingweb.io/playground/" target="_blank">Thing Description Playground</a></li>
        <li><a href="https://github.com/eclipse/thingweb.node-wot" target="_blank">Eclipse Thingweb node-wot</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-content {
  margin: 0 15vw;
}

.about-content h1{
  text-align: center;
}
</style>
