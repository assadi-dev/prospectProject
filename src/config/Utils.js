export const getDateFull = (timesTamp) => {
  const date = new Date(timesTamp);
  let getDay = date.getDay();
  let getDate = date.getDate();
  let month = date.getMonth();
  let years = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let fullMonth = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  let day = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudis",
    "Vendredi",
    "Samedi",
  ];

  let toString = `${day[getDay]} ${getfullNumber(getDate)} ${
    fullMonth[date.getMonth()]
  }  ${date.getFullYear()}`;

  return toString;
};

export const fullMonth = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
export const fullDay = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudis",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export const getfullNumber = (number) => {
  const num = parseInt(number);
  if (num < 10) {
    return "0" + num;
  } else {
    return number;
  }
};

export const getFullHour = (timesTamp) => {
  const date = new Date(timesTamp);
  let hours = getfullNumber(date.getHours());
  let minutes = getfullNumber(date.getMinutes());
  return `${hours} h ${minutes}`;
};
