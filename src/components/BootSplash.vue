<!-- src/components/BootSplash.vue -->
<template>
    <div class="boot-splash">
      <pre class="ascii-art">{{ asciiArt }}</pre>
      <div class="log">
        <pre v-for="(line, index) in displayedLines" :key="index">{{ line }}</pre>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'BootSplash',
    emits: ['bootFinished'],
    setup(_, { emit }) {
      // ASCII art for a cat with a wizard hat
      const asciiArt = `

     \／l、
    （ﾟ､｡７
      |、~ヽ
          じし_,)\ノ 
        Welcome to Moshirvar.os 
        Booting...
      `;
  

      // alt art
        /*
        /\\_/\\  
        ( o.o )   
        > ^ <  

        */
      // Boot log lines that simulate a terminal startup sequence
      const logLines = [
        'Initializing system...',
        'Loading kernel modules...',
        'Starting services: network, display, storage...',
        'Checking file system integrity...',
        'Mounting drives...',
        'Loading drivers...',
        'Moshirvar OS - Version 1.0.0',
        'Boot sequence complete.'
      ];
  
      const displayedLines = ref<string[]>([]);
      let lineIndex = 0;
  
      // Recursively add each log line with a delay to simulate terminal output
      const addNextLine = () => {
        if (lineIndex < logLines.length) {
          displayedLines.value.push(logLines[lineIndex]);
          lineIndex++;
          setTimeout(addNextLine, 500); // 500ms delay between lines
        } else {
          // After the final line, wait a moment then signal that boot is complete
          setTimeout(() => {
            emit('bootFinished');
          }, 1000);
        }
      };
  
      onMounted(() => {
        setTimeout(addNextLine, 500); // Initial delay before starting the log
      });
  
      return { asciiArt, displayedLines };
    },
  });
  </script>
  
  <style scoped>
  .boot-splash {
    background-color: var(--jet);
    color: var(--snow);
    height: 100vh;
    width: 100vw;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .ascii-art {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .log {
    text-align: left;
    width: 80%;
    max-width: 600px;
  }
  </style>
  