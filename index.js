const loadAllPhones = async (status, searchtext) => {
  // console.log(brandName);
  document.getElementById("spinner").style.display = "none";

  //  fetch data
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchtext ? searchtext : "iphone"
    }`
  );
  const data = await response.json();
  // status check
  if (status) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }

  //console.log(data.data);
};

// Show allPhone in display
const displayAllPhone = (phones) => {

  

  document.getElementById("phones-container").innerHTML = " "
  // console.log(phones);
  const phoneContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    // console.log(phone);
    //   {
    //     "brand": "Apple ",
    //     "phone_name": "iPhone 13 mini",
    //     "slug": "apple_iphone_13_mini-11104",
    //     "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
    // }
    const { brand, image, slug } = phone;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 w-96 m-2 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
   

      <button onclick = "phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    `;
    phoneContainer.appendChild(div);
  });
};

// search btn
const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchtext = document.getElementById("search-box").value;

  setTimeout(() => {
    loadAllPhones(false, searchtext);
  }, 3000);
};

// showall btn
const handleShowAll = () => {
  loadAllPhones(true);
};

// modal functionality
const phoneDetails = async (slugs) => {
  // console.log(slug);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await response.json();
  console.log(data.data);

  //   {
  //     "mainFeatures": {
  //         "storage": "128GB/256GB/512GB storage, no card slot",
  //         "displaySize": "5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)",
  //         "chipSet": "Apple A15 Bionic (5 nm)",
  //         "memory": "128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM",
  //         "sensors": [
  //             "Face ID",
  //             "accelerometer",
  //             "gyro",
  //             "proximity",
  //             "compass",
  //             "barometer"
  //         ]
  //     },
  //     "slug": "apple_iphone_13_mini-11104",
  //     "name": "iPhone 13 mini",
  //     "releaseDate": "Released 2021, September 24",
  //     "brand": "Apple",
  //     "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
  // }

  const { brand, image, slug ,releaseDate} = data.data;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
   <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">${brand}</h3>
          <h3 class="text-lg font-bold">${releaseDate}</h3>
        
          <p class="py-4">${slug}</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  `;

  my_modal_1.showModal();
};

loadAllPhones(false, "iphone");
