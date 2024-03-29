document.querySelector('body').style.backgroundImage = 'url(pattern_sayagata.png)';
const gallery = document.getElementById('gallery');


let jsonData;

//async function to fetch api data and parse using json
//the data is then stored in the jsonData variable and the function returns the data
async function fetchData(){
    const res = await fetch('https://randomuser.me/api/?nat=us&results=12');
    const data = await res.json();
    
    jsonData = data.results;
    return data;
    
}

//createCard function to create user cards and append them to the gallery
//it is only passed one parameter which is 'data', the list of random users and is cycled through while information is stored in their respective variables
function createCard(data){
    data.results.forEach( person => {
        const card = document.createElement('div');
        const cardImage = document.createElement('div');
        const cardInfo = document.createElement('div');
        card.className = ('card');
        cardImage.className = ('card-img-container');
        cardInfo.className = ('card-info-container');
        gallery.appendChild(card);
        card.appendChild(cardImage);
        card.appendChild(cardInfo);
        cardImage.innerHTML = `<img class="card-img" src="${person.picture.large}" alt="profile picture">
        `;
        
        cardInfo.innerHTML = `<h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        `;
    });
    
}

//fetchData function is called and the 'data' is passed to the createCard method 
fetchData()
    .then(data => createCard(data));

//function to create the modal popup container for users
function createModalContainer(){
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    gallery.appendChild(modalContainer);
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal';
    modalContainer.appendChild(modalDiv);
    const modalButton = document.createElement('button');
    modalButton.type = 'button';
    modalButton.id = 'modal-close-btn';
    modalButton.className = 'modal-close-btn';
    modalButton.innerHTML = '<strong>X</strong>';
    modalDiv.appendChild(modalButton);
    
    const modalInfo = document.createElement('div');
    modalInfo.className = 'modal-info-container';
    modalDiv.appendChild(modalInfo);
}

//function to create modal info based on the information passed from the person property from the parsed jsonData
function createModalInfo(name){
    jsonData.forEach(person => {
        const firstName = person.name.first;
        const lastName = person.name.last;
        if (name[0] === firstName && name[name.length - 1] === lastName){
            const infoContainer = document.querySelector('.modal-info-container');
            const dob = person.dob.date;
            const dobMonth = dob.slice(5,7);
            const dobDay = dob.slice(8,10);
            const dobYear = dob.slice(0,4);
            infoContainer.innerHTML = `
            <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.phone}</p>
                        <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city},${person.location.state} ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${dobMonth}/${dobDay}/${dobYear}</p>
    `;
        }
    })
}

//event listener listening for clicks to a given user modal
//once a modal is clicked it is then opened with the modal info and allows the ability to close it out with an 'X' icon
document.addEventListener('click', event =>{
    const target = event.target;
    
    if(target.id != 'gallery' && document.querySelector('.modal-container') == null){
        if(target.className != "card"){
            let name = target.parentElement.parentElement.querySelector('div #name').innerHTML.split(" ");
        createModalContainer();
        createModalInfo(name);
    } else {
        let name = target.querySelector('div #name').innerHTML.split(" ");
        createModalContainer();
        createModalInfo(name);
    }
        
    }
    
    if(target.id === 'modal-close-btn' || target.innerHTML === "X"){
        const modalContainer = document.querySelector('.modal-container');
        gallery.removeChild(modalContainer);
    }
        
    
});


















