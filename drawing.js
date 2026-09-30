const params = new URLSearchParams(window.location.search);

const room = params.get("room") || "solo";

const roomConfig = {
  group: {
    title: "قروب رسم",
    hint: "ارسموا مع بعض في نفس المساحة",
    pages: [
      "الرسم الجماعي",
      "الأفكار",
      "النتيجة"
    ]
  },

  solo: {
    title: "رسم فردي",
    hint: "مساحتك الخاصة للرسم",
    pages: [
      "الرسم",
      "مسودة",
      "تفاصيل",
      "النتيجة"
    ]
  },

  guess: {
    title: "احزر",
    hint: "ارسم شيئًا ودع الآخرين يخمنونه",
    pages: [
      "الرسم",
      "محاولات",
      "النتيجة"
    ]
  },

  class: {
    title: "فصل",
    hint: "سبورة الفصل وصفحات الشرح والتمارين",
    pages: [
      "السبورة",
      "الشرح",
      "التمرين",
      "الحل"
    ]
  }
};


const config = roomConfig[room] || roomConfig.solo;


const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const roomTitle = document.getElementById("roomTitle");
const pageHint = document.getElementById("pageHint");
const pagesContainer = document.getElementById("pages");
const brushSize = document.getElementById("brushSize");


let currentPage = 0;

let pages = config.pages.map(() => null);

let drawing = false;

let currentTool = "pen";

let undoStack = [];
let redoStack = [];


roomTitle.textContent = config.title;
pageHint.textContent = config.hint;


/* =========================
   إعداد حجم الورقة
========================= */

function resizeCanvas() {

  const oldPage = pages[currentPage];

  const rect = canvas.getBoundingClientRect();

  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);

  ctx.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

  clearCanvas();

  if (oldPage) {
    restoreImage(oldPage);
  }
}


/* =========================
   تنظيف الورقة
========================= */

function clearCanvas() {

  const rect = canvas.getBoundingClientRect();

  ctx.globalCompositeOperation = "source-over";

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(
    0,
    0,
    rect.width,
    rect.height
  );
}


/* =========================
   معرفة مكان اللمسة
========================= */

function getPointerPosition(event) {

  const rect = canvas.getBoundingClientRect();

  const pointer = event.touches
    ? event.touches[0]
    : event;

  return {
    x: pointer.clientX - rect.left,
    y: pointer.clientY - rect.top
  };
}


/* =========================
   حفظ حالة للرسم
========================= */

function saveUndoState() {

  undoStack.push(
    canvas.toDataURL()
  );

  if (undoStack.length > 30) {
    undoStack.shift();
  }

  redoStack = [];
}


/* =========================
   بدء الرسم
========================= */

function startDrawing(event) {

  event.preventDefault();

  saveUndoState();

  drawing = true;

  const point = getPointerPosition(event);

  ctx.beginPath();

  ctx.moveTo(
    point.x,
    point.y
  );
}


/* =========================
   الرسم
========================= */

function draw(event) {

  if (!drawing) return;

  event.preventDefault();

  const point = getPointerPosition(event);

  ctx.lineWidth = Number(
    brushSize.value
  );

  ctx.lineCap = "round";
  ctx.lineJoin = "round";


  if (currentTool === "eraser") {

    ctx.globalCompositeOperation =
      "destination-out";

  } else {

    ctx.globalCompositeOperation =
      "source-over";

    ctx.strokeStyle = "#30445a";
  }


  ctx.lineTo(
    point.x,
    point.y
  );

  ctx.stroke();
}


/* =========================
   إنهاء الرسم
========================= */

function stopDrawing() {

  if (!drawing) return;

  drawing = false;

  ctx.closePath();

  ctx.globalCompositeOperation =
    "source-over";


  pages[currentPage] =
    canvas.toDataURL();

  renderPages();
}


/* =========================
   استرجاع صورة الصفحة
========================= */

function restoreImage(data) {

  const image = new Image();

  image.onload = function () {

    const rect =
      canvas.getBoundingClientRect();

    ctx.globalCompositeOperation =
      "source-over";

    ctx.drawImage(
      image,
      0,
      0,
      rect.width,
      rect.height
    );
  };

  image.src = data;
}


/* =========================
   تغيير الصفحة
========================= */

function selectPage(index) {

  pages[currentPage] =
    canvas.toDataURL();


  currentPage = index;


  undoStack = [];
  redoStack = [];


  clearCanvas();


  if (pages[currentPage]) {
    restoreImage(
      pages[currentPage]
    );
  }


  renderPages();
}


/* =========================
   عرض الصفحات
========================= */

function renderPages() {

  pagesContainer.innerHTML = "";


  config.pages.forEach(
    (pageName, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "page-thumb";


      if (index === currentPage) {
        button.classList.add(
          "active"
        );
      }


      button.textContent =
        index + 1;

      button.title =
        pageName;


      button.addEventListener(
        "click",
        () => {
          selectPage(index);
        }
      );


      pagesContainer.appendChild(
        button
      );
    }
  );
}


/* =========================
   أدوات الرسم
========================= */

document
  .querySelectorAll(".tool")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const selectedTool =
          button.dataset.tool;


        if (selectedTool === "undo") {
          undo();
          return;
        }


        if (selectedTool === "redo") {
          redo();
          return;
        }


        currentTool =
          selectedTool;


        document
          .querySelectorAll(".tool")
          .forEach(tool => {

            tool.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );
      }
    );
  });


/* =========================
   تراجع
========================= */

function undo() {

  if (!undoStack.length) {
    return;
  }


  redoStack.push(
    canvas.toDataURL()
  );


  const previous =
    undoStack.pop();


  restoreImage(previous);


  pages[currentPage] =
    previous;
}


/* =========================
   إعادة
========================= */

function redo() {

  if (!redoStack.length) {
    return;
  }


  undoStack.push(
    canvas.toDataURL()
  );


  const next =
    redoStack.pop();


  restoreImage(next);


  pages[currentPage] =
    next;
}


/* =========================
   إضافة ورقة
========================= */

document
  .getElementById("addPageButton")
  .addEventListener(
    "click",
    () => {

      pages.push(null);

      config.pages.push(
        "ورقة " +
        config.pages.length
      );


      currentPage =
        pages.length - 1;


      undoStack = [];
      redoStack = [];


      clearCanvas();

      renderPages();
    }
  );


/* =========================
   الصفحة السابقة
========================= */

document
  .getElementById("previousPageButton")
  .addEventListener(
    "click",
    () => {

      if (currentPage > 0) {

        selectPage(
          currentPage - 1
        );

      }
    }
  );


/* =========================
   الصفحة التالية
========================= */

document
  .getElementById("nextPageButton")
  .addEventListener(
    "click",
    () => {

      if (
        currentPage <
        pages.length - 1
      ) {

        selectPage(
          currentPage + 1
        );

      }
    }
  );


/* =========================
   مسح الصفحة
========================= */

document
  .getElementById("clearPageButton")
  .addEventListener(
    "click",
    () => {

      clearCanvas();

      pages[currentPage] =
        null;

      undoStack = [];
      redoStack = [];

      renderPages();
    }
  );


/* =========================
   زر الرجوع
========================= */

document
  .getElementById("backButton")
  .addEventListener(
    "click",
    () => {

      window.location.href =
        "index.html";

    }
  );


/* =========================
   الماوس
========================= */

canvas.addEventListener(
  "mousedown",
  startDrawing
);

canvas.addEventListener(
  "mousemove",
  draw
);

canvas.addEventListener(
  "mouseup",
  stopDrawing
);

canvas.addEventListener(
  "mouseleave",
  stopDrawing
);


/* =========================
   الهاتف
========================= */

canvas.addEventListener(
  "touchstart",
  startDrawing,
  { passive: false }
);

canvas.addEventListener(
  "touchmove",
  draw,
  { passive: false }
);

canvas.addEventListener(
  "touchend",
  stopDrawing
);


/* =========================
   تغيير حجم الشاشة
========================= */

window.addEventListener(
  "resize",
  resizeCanvas
);


/* =========================
   تشغيل الصفحة
========================= */

renderPages();

resizeCanvas();