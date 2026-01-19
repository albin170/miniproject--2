const OPENAI_API_KEY = "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";


async function analyzeSymptoms(){
const symptoms = document.getElementById("symptoms").value;
const result = document.getElementById("result");


if(!symptoms.trim()){
result.innerHTML = "Please enter symptoms";
return;
}


result.innerHTML = "Analyzing with AI...";


try{
const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${OPENAI_API_KEY}`
},
body:JSON.stringify({
model:"gpt-3.5-turbo",
messages:[
{role:"system",content:"You are a rural healthcare assistant. Give simple, safe advice and suggest a doctor when needed."},
{role:"user",content:symptoms}
],
max_tokens:150
})
});


const data = await response.json();
result.innerHTML = `<b>AI Advice:</b><br>${data.choices[0].message.content}`;
}catch(e){
result.innerHTML = "AI service error";
}
}
