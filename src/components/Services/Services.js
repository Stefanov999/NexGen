/// Regex for Email

export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);

/// Regex for Username

export const validUsernames = new RegExp("^[A-Za-z][A-Za-z]{2,20}$");

///Getting current time function

export const dateInf = () => {
  const currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    "  " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();
  return datetime;
};

///Get async fucntion

export async function getData(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      let apiData = await response.json();
      return apiData;
    }
  } catch (err) {
    console.log("error");
  }
};

///Post async function

export async function sendData(formsData, url) {
  let metod = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formsData),
  };
  try {
    const response = await fetch(url, metod);
  } catch (err) {
    console.log("Error with dataBases");
  }
};


/// Delete Async Function
export async function deleteData(el, ur) {
  let url = `${ur}${el}.json`;
  let metod = {
    method: "DELETE",
  };
  try {
    const response = await fetch(url, metod);
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.log("Errror with dataBases");
  }
};
