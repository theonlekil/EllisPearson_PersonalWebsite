const lines = [
  "[  system  ] Booting system",
  "[  system  ] Loading kernel modules...",
  "[  system  ] Loading...",
  "[  system  ] Loading...",
  " ",
  { text: "[  Error   ] Module 'net_adapter' failed to load.", error: true },
  "[  system  ] Retrying network initialization",
  "[  system  ] Loading...",
  " ",
  { text: "[  Error   ] Network unreachable.", error: true },
  "[  system  ] Mounting /ellis/homepage",
  "[  system  ] Checking file system integrity",
  "[  system  ] Loading...",
  "[  system  ] Done",
  " ",
  "[  system  ] System ready. Welcome!"
];

const terminal = document.getElementById("terminal");
let currentLine = 0;

function typeLine(lineObj, callback) {
  const line = document.createElement("div");
  line.classList.add("line");
  if (lineObj.error) line.classList.add("error");
  terminal.appendChild(line);

  let i = 0;
  const text = typeof lineObj === "string" ? lineObj : lineObj.text;
  const speed = lineObj.error ? 60 : 45;

  const typing = setInterval(() => {
    line.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typing);
      if (callback) callback();
    }
  }, speed);
}

function nextLine() {
  if (currentLine < lines.length) {
    typeLine(lines[currentLine], () => {
      currentLine++;
      setTimeout(nextLine, 300);
    });
  } else {
    showPrompt();
  }
}

function showPrompt() {
  const promptLine = document.createElement("div");
  promptLine.classList.add("prompt");
  promptLine.textContent = "Press ENTER or TAP to continue";
  terminal.appendChild(promptLine);

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  promptLine.appendChild(cursor);

  function proceed() {
    cursor.remove();

    const loader = document.createElement("div");
    loader.classList.add("loading");
    terminal.appendChild(loader);

    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 10);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      proceed();
    }
  }, { once: true });

  document.addEventListener("click", () => {
    proceed();
  }, { once: true });
}

nextLine();