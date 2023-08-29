const loadPhone = async(searchText) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''

//    display show all button if there are more than 12 phones
const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    
    //display only first 12 phone

    phones = phones.slice(0,5);

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
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false)
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchfield = document.getElementById('search-field');
    const searchText = searchfield.value;
    console.log(searchText);
    loadPhone(searchText)
}

const handleSearch2 = () => {
    toggleLoadingSpinner(true);
    const searchfield = document.getElementById('search-field2')
    const searchText = searchfield.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('remove')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}
// loadPhone();

