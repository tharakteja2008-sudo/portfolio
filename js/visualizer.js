/**
 * INTERACTIVE ALGORITHM VISUALIZER MINI-APP
 * 
 * An interactive sandbox demonstrating sorting and search algorithms
 * with live step-by-step rendering, comparisons/swaps counters, and code explanations.
 */

class AlgorithmVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.arraySize = 18;
    this.array = [];
    this.animationSpeed = 120; // ms per step
    this.isRunning = false;
    this.isPaused = false;
    this.currentAlgorithm = "bubblesort";
    this.generator = null;
    this.stats = { comparisons: 0, swaps: 0 };
    
    this.init();
  }

  init() {
    this.generateNewArray();
    this.renderControls();
    this.renderBars();
    this.updateAlgorithmInfo();
  }

  generateNewArray() {
    this.stop();
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
      // Generate numbers between 15 and 100
      this.array.push(Math.floor(Math.random() * 85) + 15);
    }
    this.stats = { comparisons: 0, swaps: 0 };
    this.updateStats();
    this.renderBars();
  }

  renderControls() {
    // Event listeners are bound via DOM IDs
    const startBtn = document.getElementById("vis-start-btn");
    const pauseBtn = document.getElementById("vis-pause-btn");
    const stepBtn = document.getElementById("vis-step-btn");
    const resetBtn = document.getElementById("vis-reset-btn");
    const algoSelect = document.getElementById("vis-algo-select");
    const speedSelect = document.getElementById("vis-speed-select");

    if (startBtn) startBtn.addEventListener("click", () => this.start());
    if (pauseBtn) pauseBtn.addEventListener("click", () => this.togglePause());
    if (stepBtn) stepBtn.addEventListener("click", () => this.stepOnce());
    if (resetBtn) resetBtn.addEventListener("click", () => this.generateNewArray());
    if (algoSelect) {
      algoSelect.addEventListener("change", (e) => {
        this.currentAlgorithm = e.target.value;
        this.generateNewArray();
        this.updateAlgorithmInfo();
      });
    }
    if (speedSelect) {
      speedSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "fast") this.animationSpeed = 40;
        else if (val === "normal") this.animationSpeed = 120;
        else if (val === "slow") this.animationSpeed = 280;
      });
    }
  }

  renderBars(comparingIndices = [], swappingIndices = [], sortedIndices = []) {
    const barsContainer = document.getElementById("vis-bars-container");
    if (!barsContainer) return;

    barsContainer.innerHTML = "";
    const maxHeight = Math.max(...this.array, 100);

    this.array.forEach((val, idx) => {
      const bar = document.createElement("div");
      bar.className = "sort-bar";
      const heightPercent = (val / maxHeight) * 100;
      bar.style.height = `${Math.max(heightPercent, 8)}%`;
      bar.title = `Index ${idx}: ${val}`;

      // Value label on hover or if space permits
      bar.innerHTML = `<span class="hidden sm:inline-block text-[10px] text-slate-400 font-mono text-center w-full mt-[-20px]">${val}</span>`;

      if (comparingIndices.includes(idx)) {
        bar.classList.add("comparing");
      }
      if (swappingIndices.includes(idx)) {
        bar.classList.add("swapping");
      }
      if (sortedIndices.includes(idx)) {
        bar.classList.add("sorted");
      }

      barsContainer.appendChild(bar);
    });
  }

  updateStats() {
    const compEl = document.getElementById("vis-stat-comparisons");
    const swapEl = document.getElementById("vis-stat-swaps");
    if (compEl) compEl.textContent = this.stats.comparisons;
    if (swapEl) swapEl.textContent = this.stats.swaps;
  }

  updateAlgorithmInfo() {
    const timeEl = document.getElementById("vis-time-complexity");
    const spaceEl = document.getElementById("vis-space-complexity");
    const codeEl = document.getElementById("vis-code-snippet");

    const info = {
      bubblesort: {
        time: "O(n²)",
        space: "O(1)",
        code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]`
      },
      selectionsort: {
        time: "O(n²)",
        space: "O(1)",
        code: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
      },
      insertionsort: {
        time: "O(n²)",
        space: "O(1)",
        code: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key`
      },
      quicksort: {
        time: "O(n log n)",
        space: "O(log n)",
        code: `def quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)`
      }
    };

    const current = info[this.currentAlgorithm] || info.bubblesort;
    if (timeEl) timeEl.textContent = current.time;
    if (spaceEl) spaceEl.textContent = current.space;
    if (codeEl) codeEl.textContent = current.code;
  }

  // --- Algorithm Step Generators ---

  *bubbleSortGenerator() {
    const n = this.array.length;
    const sortedIndices = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.stats.comparisons++;
        this.updateStats();
        yield { comparing: [j, j + 1], swapping: [], sorted: [...sortedIndices] };

        if (this.array[j] > this.array[j + 1]) {
          const temp = this.array[j];
          this.array[j] = this.array[j + 1];
          this.array[j + 1] = temp;
          this.stats.swaps++;
          this.updateStats();
          yield { comparing: [], swapping: [j, j + 1], sorted: [...sortedIndices] };
        }
      }
      sortedIndices.push(n - i - 1);
    }
    // All elements sorted
    yield { comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) };
  }

  *selectionSortGenerator() {
    const n = this.array.length;
    const sortedIndices = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        this.stats.comparisons++;
        this.updateStats();
        yield { comparing: [minIdx, j], swapping: [], sorted: [...sortedIndices] };

        if (this.array[j] < this.array[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = this.array[i];
        this.array[i] = this.array[minIdx];
        this.array[minIdx] = temp;
        this.stats.swaps++;
        this.updateStats();
        yield { comparing: [], swapping: [i, minIdx], sorted: [...sortedIndices] };
      }
      sortedIndices.push(i);
    }
    yield { comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) };
  }

  *insertionSortGenerator() {
    const n = this.array.length;
    const sortedIndices = [0];

    for (let i = 1; i < n; i++) {
      let key = this.array[i];
      let j = i - 1;

      while (j >= 0) {
        this.stats.comparisons++;
        this.updateStats();
        yield { comparing: [j, j + 1], swapping: [], sorted: [...sortedIndices] };

        if (this.array[j] > key) {
          this.array[j + 1] = this.array[j];
          this.stats.swaps++;
          this.updateStats();
          yield { comparing: [], swapping: [j, j + 1], sorted: [...sortedIndices] };
          j = j - 1;
        } else {
          break;
        }
      }
      this.array[j + 1] = key;
      sortedIndices.push(i);
    }
    yield { comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) };
  }

  *quickSortGenerator() {
    const sortedIndices = [];
    const stack = [[0, this.array.length - 1]];

    while (stack.length > 0) {
      const [low, high] = stack.pop();
      if (low < high) {
        // Partition
        const pivot = this.array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          this.stats.comparisons++;
          this.updateStats();
          yield { comparing: [j, high], swapping: [], sorted: [...sortedIndices] };

          if (this.array[j] < pivot) {
            i++;
            const temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
            this.stats.swaps++;
            this.updateStats();
            yield { comparing: [], swapping: [i, j], sorted: [...sortedIndices] };
          }
        }

        const temp = this.array[i + 1];
        this.array[i + 1] = this.array[high];
        this.array[high] = temp;
        this.stats.swaps++;
        this.updateStats();
        const pi = i + 1;
        sortedIndices.push(pi);
        yield { comparing: [], swapping: [pi, high], sorted: [...sortedIndices] };

        stack.push([pi + 1, high]);
        stack.push([low, pi - 1]);
      } else if (low === high) {
        sortedIndices.push(low);
      }
    }
    yield { comparing: [], swapping: [], sorted: Array.from({ length: this.array.length }, (_, i) => i) };
  }

  getGenerator() {
    switch (this.currentAlgorithm) {
      case "selectionsort": return this.selectionSortGenerator();
      case "insertionsort": return this.insertionSortGenerator();
      case "quicksort": return this.quickSortGenerator();
      case "bubblesort":
      default: return this.bubbleSortGenerator();
    }
  }

  async start() {
    if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      this.updatePlayStateUI();
      this.loop();
      return;
    }

    if (this.isRunning) return;

    this.isRunning = true;
    this.isPaused = false;
    this.generator = this.getGenerator();
    this.updatePlayStateUI();
    this.loop();
  }

  togglePause() {
    if (!this.isRunning) return;
    this.isPaused = !this.isPaused;
    this.updatePlayStateUI();
    if (!this.isPaused) {
      this.loop();
    }
  }

  stepOnce() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.isPaused = true;
      this.generator = this.getGenerator();
      this.updatePlayStateUI();
    }
    
    if (this.generator) {
      const step = this.generator.next();
      if (!step.done) {
        const { comparing, swapping, sorted } = step.value;
        this.renderBars(comparing, swapping, sorted);
      } else {
        this.stop();
      }
    }
  }

  async loop() {
    while (this.isRunning && !this.isPaused) {
      if (!this.generator) break;
      const step = this.generator.next();

      if (step.done) {
        this.stop();
        this.renderBars([], [], Array.from({ length: this.array.length }, (_, i) => i));
        break;
      }

      const { comparing, swapping, sorted } = step.value;
      this.renderBars(comparing, swapping, sorted);
      await new Promise(r => setTimeout(r, this.animationSpeed));
    }
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    this.generator = null;
    this.updatePlayStateUI();
  }

  updatePlayStateUI() {
    const startBtn = document.getElementById("vis-start-btn");
    const pauseBtn = document.getElementById("vis-pause-btn");

    if (startBtn) {
      if (this.isRunning && !this.isPaused) {
        startBtn.classList.add("opacity-50", "pointer-events-none");
      } else {
        startBtn.classList.remove("opacity-50", "pointer-events-none");
      }
    }

    if (pauseBtn) {
      pauseBtn.innerHTML = this.isPaused 
        ? `<i class="fa-solid fa-play"></i> Resume` 
        : `<i class="fa-solid fa-pause"></i> Pause`;
    }
  }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("visualizer-container")) {
    window.algorithmVisualizer = new AlgorithmVisualizer("visualizer-container");
  }
});
