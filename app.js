const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");
const countries = document.querySelector(".countries");

const getCountry = async () => {
  try {
    const url = `https://restcountries.com/v3.1/all`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    searchCountry(data);
    displayCountryInfo(data);
  } catch (error) {
    console.log(error);
    document.write(error);
  }
};
getCountry();

const searchCountry = (data) => {
  searchInput.addEventListener("input", (e) => {
    searchDiv.innerHTML = "";

    const query = searchInput.value.toLowerCase();

    const filteredCountries = data.filter((item) =>
      item.name.common.toLowerCase().includes(query)
    );

    if (filteredCountries.length === 1) {
      searchDiv.innerHTML = "";
      displayCountryInfo(data, filteredCountries[0]);
      searchInput.value = filteredCountries[0].name.common;
      return;
    }

    filteredCountries.forEach((item) => {
      const newSpan = document.createElement("span");
      newSpan.textContent = item.name.common;
      newSpan.style.cursor = "pointer";
      newSpan.style.backgroundColor = "lightblue";
      newSpan.style.padding = "7px 5px";
      newSpan.style.border = "2px solid gray";
      newSpan.style.borderRadius = "10px";
      newSpan.style.marginTop = "2px";
      searchDiv.appendChild(newSpan);

      newSpan.addEventListener("click", () => {
        searchDiv.innerHTML = "";
        displayCountryInfo(data, item);
        searchInput.value = item.name.common;
      });
    });
  });
};

const displayCountryInfo = (data, country = null) => {
  if (!country) {
    const random = Math.floor(Math.random() * data.length);
    country = data[random];
  }
  countries.innerHTML = `   
  <div class="card shadow-lg" style="width: 22rem">
            <img src="${country.flags.png}" class="card-img-top " alt="flag" />
            <div >
              <h2 class="p-2 text-center">${country.name.common}</h2>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
               <span class="fw-bold"> Region: </span> ${country.region}
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Capitals: </span>${country.capital}
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Languages: </span>${Object.values(
                  country.languages
                )}
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Currencies: </span>${Object.values(
                  country.currencies
                ).map((currency) => `${currency.name} (${currency.symbol})`)}
              </li>
              <li class="list-group-item">
              <span class="fw-bold"> Population: </span>${country.population}
            </li>
              <li class="list-group-item">
              <span class="fw-bold"> Borders: </span>${country.borders || null}
            </li>
            </li>
            <li class="list-group-item">
            <span class="fw-bold"> Map:</span> <a href="${
              country.maps.googleMaps
            }" target='_blank'> Go to google map</a> </li>
            </ul>
          </div>`;
};
