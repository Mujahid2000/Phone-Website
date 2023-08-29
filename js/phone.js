const loadPhone = async(searchText=13, isShowAll) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''

//    display show all button if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all', isShowAll);
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    //display only first 12 phone



    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-3 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button onclick='handleShowDetaile("${phone.slug}")'  class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false)
}

const handleShowDetaile = async(id) =>{
    console.log('clicked show the detail',id);
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showPhoneDetails(data.data)
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML =`
    <img src="${phone.image}" alt=""\>
    <p>Stroage:<span>${phone?.mainFeatures?.storage}</span></p>
    <p>Display Size:<span>${phone?.mainFeatures?.displaySize}</span></p>
    <p>Chipset<span>${phone?.mainFeatures?.chipSet}</span></p>
    <p>Memory:<span>${phone?.mainFeatures?.memory}</span></p>
    <p>Release Date:<span>${phone?.releaseDate}</span></p>
    <p>Brand:<span>${phone?.brand}</span></p>
    <p>GPS:<span>${phone?.others?.GPS}</span></p>
    `
   
    show_details_modal.showModal();
} 

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchfield = document.getElementById('search-field');
    const searchText = searchfield.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

const handleSearch2 = () => {
    toggleLoadingSpinner(true);
    const searchfield = document.getElementById('search-field2')
    const searchText = searchfield.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    console.log(isLoading);
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
        console.log(loadingSpinner);
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// handleShowALl

const handleShowAll = () =>{
    handleSearch(true)
}
loadPhone();

