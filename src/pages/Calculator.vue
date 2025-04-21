<!-- src/pages/Calculator.vue -->
<template>
    <div class="calculator">
      <!-- Display + History Toggle -->
      <div class="display-container">
        <button class="history-btn" @click="toggleHistory">📜</button>
        <div class="display">{{ inputBuffer || '0' }}</div>
      </div>
  
      <!-- History Panel -->
      <div v-if="showHistory" class="history-panel">
        <div
          v-for="(h, idx) in history"
          :key="idx"
          class="history-entry"
          @click="restoreHistory(idx)"
        >
          {{ h }}
        </div>
      </div>
  
      <!-- Buttons Grid -->
      <div class="buttons">
        <!-- Top row -->
        <button @click="toggleExpand">⚙️</button>
        <button @click="append('(')">(</button>
        <button @click="append(')')">)</button>
        <button @click="backspace">CE</button>
  
        <!-- Number pad and operators -->
        <button @click="append('7')">7</button>
        <button @click="append('8')">8</button>
        <button @click="append('9')">9</button>
        <button @click="append('÷')">÷</button>
  
        <button @click="append('4')">4</button>
        <button @click="append('5')">5</button>
        <button @click="append('6')">6</button>
        <button @click="append('×')">×</button>
  
        <button @click="append('1')">1</button>
        <button @click="append('2')">2</button>
        <button @click="append('3')">3</button>
        <button @click="append('−')">−</button>
  
        <button @click="append('0')">0</button>
        <button @click="append('.')">.</button>
        <button class="equals" @click="calculate">=</button>
        <button @click="append('+')">+</button>
  
        <!-- Advanced operations when expanded -->
        <button
          v-if="isExpanded"
          v-for="btn in advButtons"
          :key="btn.value"
          @click="applyUnary(btn.value)"
        >
          {{ btn.label }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // State
  const inputBuffer = ref('');
  const history = ref<string[]>([]);
  const showHistory = ref(false);
  const isExpanded = ref(false);
  
  // Advanced operations
  const advButtons = [
    { label: '√', value: 'sqrt' },
    { label: 'x²', value: 'square' },
    { label: 'xʸ', value: 'pow' },
    { label: 'ln', value: 'ln' },
    { label: 'log', value: 'log10' },
    { label: 'eˣ', value: 'exp' },
    { label: 'sin', value: 'sin' },
    { label: 'cos', value: 'cos' }
  ];
  
  // Append values with spacing around operators (except parentheses and dot)
  function append(val: string) {
    const ops = ['+', '−', '×', '÷', '^', 'pow'];
    if (ops.includes(val)) {
      inputBuffer.value += ` ${val} `;
    } else if (val === '(' || val === ')') {
      inputBuffer.value += val;
    } else {
      inputBuffer.value += val;
    }
  }
  
  function backspace() {
    // Remove last character or operator token
    if (inputBuffer.value.endsWith(' ')) {
      inputBuffer.value = inputBuffer.value.slice(0, -3);
    } else {
      inputBuffer.value = inputBuffer.value.slice(0, -1);
    }
  }
  
  function calculate() {
    try {
      // Replace custom operators with JS equivalents
      let expr = inputBuffer.value
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/pow/g, '**');
      // eslint-disable-next-line no-eval
      const result = eval(expr);
      history.value.unshift(`${inputBuffer.value} = ${result}`);
      inputBuffer.value = String(result);
    } catch {
      inputBuffer.value = 'Error';
    }
  }
  
  function applyUnary(op: string) {
    try {
      let expr = inputBuffer.value
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');
      // eslint-disable-next-line no-eval
      const val = eval(expr);
      let res: number;
      switch (op) {
        case 'sqrt': res = Math.sqrt(val); break;
        case 'square': res = val * val; break;
        case 'ln': res = Math.log(val); break;
        case 'log10': res = Math.log10(val); break;
        case 'exp': res = Math.exp(val); break;
        case 'sin': res = Math.sin(val); break;
        case 'cos': res = Math.cos(val); break;
        case 'pow': return; // handled in calculate
        default: res = val;
      }
      history.value.unshift(`${op}(${val}) = ${res}`);
      inputBuffer.value = String(res);
    } catch {
      inputBuffer.value = 'Error';
    }
  }
  
  function toggleHistory() { showHistory.value = !showHistory.value; }
  function toggleExpand() { isExpanded.value = !isExpanded.value; }
  function restoreHistory(idx: number) {
    const entry = history.value[idx];
    if (!entry) return;
    const parts = entry.split(' = ');
    inputBuffer.value = parts[0];
  }
  </script>
  
  <script lang="ts">
  // Metadata for the desktop shortcut
  export const meta = {
  label: 'Calculator',
  icon: '📟',
  version: '1.2.1',
  width: 400,
  height: 600,
};
  </script>
  
  <style scoped>
  .calculator {
    width: 100%;
    height: 90%;
    overflow-y: auto; /* allow scrolling if content exceeds window */
    background-color: var(--dark-gray);
    border: 2px solid var(--gray);
    border-radius: 6px;
    padding: 10px 10px 20px; /* prevent cutoff */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  
  .display-container {
    position: relative;
    margin-bottom: 8px;
    flex: 0 0 auto;
  }
  .display {
    background-color: var(--jet);
    color: var(--snow);
    font-size: 1.2rem;
    text-align: right;
    padding: 6px 6px;
    border-radius: 4px;
    white-space: nowrap;
    overflow-x: auto;
  }
  .history-btn {
    position: absolute;
    left: 6px;
    top: 6px;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    color: var(--snow);
    cursor: pointer;
  }
  
  .history-panel {
    background: var(--gray);
    color: var(--snow);
    padding: 5px;
    max-height: 30%;
    overflow-y: auto;
    margin-bottom: 8px;
    border: 1px solid var(--jet);
    border-radius: 4px;
    flex: 0 0 auto;
  }
  .history-entry {
    padding: 6px;
    border-bottom: 1px solid var(--jet);
  }
  .history-entry:last-child {
    border-bottom: none;
  }
  
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    gap: 6px;
    flex: 1 1 auto;
  }
  .buttons button {
    width: 100%;
    height: 100%;
    background: var(--gray);
    border: 1px solid var(--jet);
    border-radius: 4px;
    padding: 12px;
    font-size: 1rem;
    color: var(--snow);
    cursor: pointer;
    box-shadow: inset -1px -1px 3px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.2);
  }
  .buttons button:hover {
    background: var(--light-gray);
  }
  </style>
  