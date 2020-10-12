const inputText = document.getElementById('first_name2');
const searchBTn = document.querySelector('.btn');
const notFound = document.querySelector('.not-found');
const defination = document.querySelector('.def');
const audioDiv = document.querySelector('.audio');

searchBTn.addEventListener('click',(e)=>{
    e.preventDefault();
    const word = inputText.value;

    inputText.value="";

    audioDiv.innerHTML="";

    notFound.innerText="";
    upadteWord(word)
});

async function upadteWord(word){
    defination.innerText="loading..."
    const url=`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=b304abba-3c42-4368-b7d1-89f6c4316645`
  const res = await fetch(url);
  const data = await res.json();

  if(!data.length){
  
  notFound.innerHTML='<h3>Word not found!!</h3>';
  }

  //if result are suggition
  console.log(data);
  if(typeof data[0]==='string'){
  const heading = document.createElement('h3');
  heading.className='heading';
  heading.innerText='did you mean this';
  notFound.append(heading);
  for(let words of data){
      let suggetion = document.createElement('span');
      suggetion.className="suggested";
      suggetion.innerText=words;
      notFound.appendChild(suggetion)
      
  }
  }
  const name_val = document.querySelector('.name');
  const sound = data[0].hwi.prs[0].sound.audio;
  if(sound){
      renderSound(sound)
  }
  else{
      audioDiv.innerText="no audio for this word"
  }
  name_val.innerText=word;
  let def = data[0].shortdef[0];
  
  defination.innerText='Def: '+def;
}

function renderSound(sound){
    //https://media.merriam-webster.com/soundc11

    let subFolder = sound.charAt(0);
    let soundUrl=`https://media.merriam-webster.com/soundc11/${subFolder}/${sound}.wav?key=b304abba-3c42-4368-b7d1-89f6c4316645`;
    let aud = document.createElement('audio');
    aud.src=soundUrl;
    aud.controls=true;
    audioDiv.appendChild(aud);

}


//https://www.dictionaryapi.com/api/v3/references/learners/json/apple?key=b304abba-3c42-4368-b7d1-89f6c4316645