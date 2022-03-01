//Clear Results
const clearResult = (fieldName) => {
    const cardId = document.getElementById(fieldName)
    cardId.innerHTML = ''
}

// No phone found Notification
const noPhoneNotification = () => {
    const cardId = document.getElementById('phone-view')
    const notification = document.createElement("h1")
    notification.classList.add('mx-auto', 'text-danger')
    notification.innerText = "No Phone Found !!"
    cardId.appendChild(notification)
}

//Release Date/No data Validation
const releaseDateValidation = (releaseDate) => {
    if (releaseDate === "") {
        const notifi = 'No data Found'
        return notifi
    }
    return releaseDate
}

//search phones
const searchPhone = () => {
    clearResult('phone-details')
    //Getting Search Text
    const searchField = document.getElementById('search-text')
    const searchText = searchField.value
    searchField.value = ''
    //Making URL
    if (searchText != "") {
        clearResult('phone-view')
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => showResult(data.data))
    }
    else if (searchText === "") {
        clearResult('phone-view')
        clearResult('phone-details')
    }
}

//Show search phones result
const showResult = (apiData) => {
    if (apiData != '') {
        const selectedPhones = apiData.slice(0, 20)
        for (phones of selectedPhones) {
            const cardId = document.getElementById('phone-view')
            const newDiv = document.createElement('div')
            newDiv.classList.add('col')
            newDiv.innerHTML = `
        <div class="col">
            <div class="card">
                <img class="p-5" src="${phones.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><b>Phone Name:</b><span> ${phones.phone_name}</span></h5>
                    <p class="card-text"><b>Brand Name:</b><span> ${phones.brand}</span> </p>
                    <button onclick="fetchDetails('${phones.slug}')" class="btn btn-outline-dark" type="button" id="button-addon2">More
                        Details</button>
                </div>
            </div>
        </div>
        `
            cardId.appendChild(newDiv)
        }
    }
    else {
        noPhoneNotification()
    }
}

//fetching phone details
const fetchDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetails(data.data))
    clearResult('phone-details')
}

//Display phone details
const showPhoneDetails = (phoneDetails) => {
    const cardId = document.getElementById('phone-details')
    const newDiv = document.createElement('div')
    newDiv.classList.add('col')
    newDiv.innerHTML = ` <div class="col">
            <div class="card border-warning">
            <h2 class="card-title text-center pt-3">Details Info</h2>
                <img class="p-5" src="${phoneDetails.image}" class="card-img-top" alt="...">
                <div class="card-body bg-warning">
                    <h5 class="card-title"><b>Phone Name:</b><span> ${phoneDetails.name}</span></h5>
                    <p class="card-text"><b>Release Date:</b><span> ${releaseDateValidation(phoneDetails.releaseDate)}</span> </p>
                    <h5 class="card-title"><b>Main Features:</b></h5>
                    <p class="card-text"><b>Sensor Info:</b><span> ${phoneDetails.mainFeatures?.sensors}</span> </p>
                    <p class="card-text"><b>Storage Info:</b><span> ${phoneDetails.mainFeatures?.storage}</span> </p>
                    <p class="card-text"><b>Chipset Info:</b><span> ${phoneDetails.mainFeatures?.chipSet}</span> </p>
                    <p class="card-text"><b>Memory Info:</b><span> ${phoneDetails.mainFeatures?.memory}</span> </p>
                    <p class="card-text"><b>Sensor Info:</b><span> ${phoneDetails.mainFeatures?.sensors}</span> </p>
                    <p class="card-text"><b>Others Info:</b><span> ${phoneDetails.others?.WLAN}</span> </p>
                </div>
            </div>
        </div>
        `
    cardId.appendChild(newDiv)
    cardId.scrollIntoView()
}
