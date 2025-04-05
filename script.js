
let selectedAlgorithm = "bubbleSort"; 
let isSorting = false;  

document.addEventListener("DOMContentLoaded", () => {
    setAlgorithm("bubbleSort");
});

function setAlgorithm(algorithm) {
    if (isSorting) {
        alert("Please wait! Sorting is in progress. Reset first to change the algorithm.");
        return;  
    }

    selectedAlgorithm = algorithm;
    displayCode(algorithm);
    document.getElementById("selectedAlgorithmDisplay").innerText = `Selected: ${algorithm}`;
}

function displayCode(algorithm) {
    const codes = {
        bubbleSort: `def bubble_sort(arr):\n    for i in range(len(arr)):\n        for j in range(len(arr)-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`,
        selectionSort: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
        insertionSort: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i-1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key`,
        mergeSort: `def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        left = arr[:mid]\n        right = arr[mid:]\n        merge_sort(left)\n        merge_sort(right)\n        i = j = k = 0\n        while i < len(left) and j < len(right):\n            if left[i] < right[j]:\n                arr[k] = left[i]\n                i += 1\n            else:\n                arr[k] = right[j]\n                j += 1\n            k += 1`,
        quickSort: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`
    };
    document.getElementById("codeDisplay").innerHTML = codes[algorithm]
        .split("\n")
        .map(line => `<div class="code-line">${line}</div>`)
        .join("");
}

function startSorting() {
    if (isSorting) {
        alert("Sorting is already in progress! Please wait or reset.");
        return;  
    }

    let arr = document.getElementById("arrayInput").value.split(',').map(Number);
    isSorting = true; 
    visualizeSorting(arr, selectedAlgorithm).then(() => {
        isSorting = false;  
    });
    console.log("Selected Algorithm:", algorithm);
}

function resetSorting() {
    isSorting = false; 
    document.getElementById("visualization").innerHTML = ""; 
    document.getElementById("arrayInput").value = ""; 
    let codeLines = document.getElementById("codeDisplay").querySelectorAll(".code-line");
    codeLines.forEach(line => line.classList.remove("code-highlight"));
    if (highlightTimeout) {
        clearTimeout(highlightTimeout);
    }
    highlightCode = originalHighlightCode; 
}




async function visualizeSorting(arr, algorithm) {
    const visualization = document.getElementById("visualization");
    visualization.innerHTML = "";
    let bars = arr.map(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.textContent = value;
        visualization.appendChild(bar);
        return bar;
    });

    if (algorithm === "bubbleSort") {
        await bubbleSort(arr, bars);
    } else if (algorithm === "selectionSort") {
        await selectionSort(arr, bars);
    } else if (algorithm === "insertionSort") {
        await insertionSort(arr, bars);
    } else if (algorithm === "mergeSort") {
        await mergeSort(arr, bars);
    } else if (algorithm === "quickSort") {
        await quickSort(arr, bars);
    }
}

let highlightTimeout; 

const originalHighlightCode = function (lines) {
    if (!isSorting) return;

    let codeLines = document.getElementById("codeDisplay").querySelectorAll(".code-line");
    codeLines.forEach(line => line.classList.remove("code-highlight"));

    lines.forEach(index => {
        if (codeLines[index]) {
            codeLines[index].classList.add("code-highlight");
        }
    });
    highlightTimeout = setTimeout(() => {
        codeLines.forEach(line => line.classList.remove("code-highlight"));
    }, 800);
};
let highlightCode = originalHighlightCode;


async function bubbleSort(arr, bars) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            highlightCode([3]); 
            bars[j].classList.add("bubble-highlight", "pop-animation");
            bars[j + 1].classList.add("bubble-highlight", "pop-animation");

            await sleep(getSpeed());

            if (arr[j] > arr[j + 1]) {
                highlightCode([4]);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapHeights(bars[j], bars[j + 1]);
                await sleep(getSpeed());
            }

            bars[j].classList.remove("bubble-highlight", "pop-animation");
            bars[j + 1].classList.remove("bubble-highlight", "pop-animation");
        }
    }
}

async function selectionSort(arr, bars) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            highlightCode([3]);
            bars[j].classList.add("selection-highlight", "pop-animtion");
           
            await sleep(getSpeed());

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                highlightCode([4]);
            }
            bars[j].classList.remove("selection-highlight", "pop-animation");
        }
        highlightCode([5]); 
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swapHeights(bars[i], bars[minIdx]);
        await sleep(getSpeed());

    }
}

async function insertionSort(arr, bars) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        highlightCode([2]); 
         bars[i].classList.add("insertion-highlight","pop-animation");

        while (j >= 0 && arr[j] > key) {
            highlightCode([3]);
            arr[j + 1] = arr[j];
            swapHeights(bars[j + 1], bars[j]);
            await sleep(getSpeed());
            j--;
        }
        highlightCode([4]);
        arr[j + 1] = key;
        bars[i].classList.remove("insertion-highlight","pop-animation");
        await sleep(getSpeed());

    }
}


async function mergeSort(arr, bars, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);
    
    highlightCode([2]);
    await sleep(getSpeed());
 
    await mergeSort(arr, bars, left, mid);
    await mergeSort(arr, bars, mid + 1, right);

    highlightCode([3]); 
    await sleep(getSpeed());

    await merge(arr, bars, left, mid, right);
}

async function mergeSort(arr, bars, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    highlightCode([2]); 
    await sleep(getSpeed());
  
    await mergeSort(arr, bars, left, mid);
    await mergeSort(arr, bars, mid + 1, right);

    highlightCode([3]); 
    await sleep(getSpeed());


    await merge(arr, bars, left, mid, right);
}

async function mergeSort(arr, bars, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    highlightCode([2]);
    await sleep(getSpeed());

    await mergeSort(arr, bars, left, mid);
    await sleep(getSpeed());
 
    await mergeSort(arr, bars, mid + 1, right);

    highlightCode([3]); // 
    await sleep(getSpeed());

    await merge(arr, bars, left, mid, right);
}

async function merge(arr, bars, left, mid, right) {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        highlightCode([4]);
        bars[k].classList.add("merge-highlight", "pop-animation");
        await sleep(getSpeed());

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i++];
        } else {
            arr[k] = rightArr[j++];
        }

        bars[k].textContent = arr[k]; 
        bars[k].classList.remove("merge-highlight", "pop-animation");
        k++;
    }

    while (i < leftArr.length) {
        highlightCode([5]); 
        bars[k].classList.add("merge-highlight", "pop-animation");
        await sleep(getSpeed());


        arr[k] = leftArr[i++];
        bars[k].textContent = arr[k];

        bars[k].classList.remove("merge-highlight", "pop-animation");
        k++;
    }

    while (j < rightArr.length) {
        highlightCode([6]);
        bars[k].classList.add("merge-highlight", "pop-animation");
        await sleep(getSpeed());


        arr[k] = rightArr[j++];
        bars[k].textContent = arr[k];

        bars[k].classList.remove("merge-highlight", "pop-animation");
        k++;
    }
}

async function quickSort(arr, bars, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pivotIndex = await partition(arr, bars, low, high);
        
        await quickSort(arr, bars, low, pivotIndex - 1); 
        await quickSort(arr, bars, pivotIndex + 1, high); 
    }
}

async function partition(arr, bars, low, high) {
    let pivot = arr[high];  
    highlightCode([3]); 
    bars[high].classList.add("quick-highlight","pop-animation");  
    await sleep(getSpeed());

    let i = low - 1;  
    for (let j = low; j < high; j++) {
        highlightCode([4]); 
        bars[j].classList.add("quick-highlight","pop-animation");
        await sleep(getSpeed());

        if (arr[j] < pivot) {  
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];  
            swapHeights(bars[i], bars[j]);  
            highlightCode([6]);
            await sleep(getSpeed());

        }
        
        bars[j].classList.remove("quick-highlight","pop-animation");
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  
    swapHeights(bars[i + 1], bars[high]);  
    bars[high].classList.remove("quick-highlight","pop-animation");
    
    return i + 1;  
}

function swapHeights(bar1, bar2) {
    let tempHeight = bar1.textContent;
    bar1.textContent = bar2.textContent;
    bar2.textContent = tempHeight;
    bar1.classList.add("pop-animation");
    bar2.classList.add("pop-animation");
    setTimeout(() => {
        bar1.classList.remove("pop-animation");
        bar2.classList.remove("pop-animation");
    }, 500);
}

function getSpeed() {
    const slider = document.getElementById('speedSlider');
    return parseInt(slider?.value || 500); 
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






