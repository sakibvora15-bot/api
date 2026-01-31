const populate = async (value, currency) => {
  const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_2LKda32YQHJd6fnraSxk9H6UEQEp0iPRvlqvhS5k&base_currency=" + currency;

  try {
    const response = await fetch(url);
    const rjson = await response.json();
    console.log(rjson);

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = `
      <tr>
        <td>${currency}</td>
        <td>${value}</td>
        <td>${(rjson.data.INR.value || "N/A") * value}</td>
      </tr>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("Button is clicked");

  const value = parseInt(document.querySelector("input[name='quantity']").value);
  const currency = document.querySelector("select[name='country']").value;

  if (isNaN(value) || !currency) {
    alert("Please enter a quantity and select a currency");
    return;
  }

  populate(value, currency);
});
