export const exerciseOptions = {

  method: 'GET',
  headers: {
    'X-RapidAPI-Key': "c2e525073fmsh0b366881682e17ep1844c9jsnd2b15e784f09",
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }

};
export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': "f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85",
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}