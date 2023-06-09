const input = document.getElementById("input");
const img = document.querySelector('#digimon-img');
const title = document.querySelector('.card-title');
const text = document.querySelector('.card-text');
const form = document.querySelector('.form');
const level =  document.querySelector('#level');
const description = document.querySelector('#description');

const fetchDigimon = async (digimon) => {
    const APIResponse = await fetch(`https://digimon-api.com/api/v1/digimon/${digimon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    else{
        Toastify({

            text: `Digimon não encontrado! "${digimon}"`,
            className: "warn",
            style:{
                background: "linear-gradient(to right, #FF7C60, #FF0000)"
            },
            duration: 3000
            
            }).showToast();
    }
}

const render = async (digimon) => {

    const data = await fetchDigimon(digimon);

    text.innerText = `${data.name} ID n° ${data.id}`;
    title.innerHTML = data.name;
    img.src = data['images'][0]['href'];
    level.innerHTML = `<strong><span class="descricao">Tipo:</span></strong> ${data['levels'][0].level}`;
    description.innerHTML = `<strong><span class="descricao">Descrição:</span></strong> ${data.descriptions[0].description}`;
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    render(input.value);
    input.value = ''
});
