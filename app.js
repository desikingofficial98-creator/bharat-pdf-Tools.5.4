const { jsPDF } = window.jspdf;
const { PDFDocument } = PDFLib;

let currentTool = "";
let outputBlob = null;

function openTool(tool){
  currentTool = tool;
  document.getElementById("processor").classList.remove("hidden");
  document.getElementById("toolTitle").innerText = tool.replace(/([a-z])([A-Z])/g,'$1 $2').toUpperCase();
  window.scrollTo(0,0);
}

function goBack(){
  document.getElementById("processor").classList.add("hidden");
  resetUI();
}

function resetUI(){
  document.getElementById("progressBox").classList.add("hidden");
  document.getElementById("downloadBtn").classList.add("hidden");
  document.getElementById("status").innerText="";
  outputBlob=null;
}

function runTool(){
  const files=document.getElementById("files").files;
  if(!files.length){alert("Select file");return;}

  simulateProgress(()=>process(files));
}

function simulateProgress(cb){
  let p=0;
  const bar=document.getElementById("progressBar");
  const text=document.getElementById("progressText");
  document.getElementById("progressBox").classList.remove("hidden");

  const i=setInterval(()=>{
    p+=5;
    bar.style.width=p+"%";
    text.innerText=p+"%";
    if(p>=100){clearInterval(i);cb();}
  },80);
}

async function process(files){
  document.getElementById("status").innerText="Processing complete";
  outputBlob=new Blob(["Demo output"],{type:"application/octet-stream"});
  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("downloadBtn").onclick=downloadFile;
}

function downloadFile(){
  if(!outputBlob)return;
  const a=document.createElement("a");
  a.href=URL.createObjectURL(outputBlob);
  a.download=currentTool+".file";
  setTimeout(()=>a.click(),100);
}