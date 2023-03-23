import axios from "axios";

export const exerciseOptions = {

  method: 'GET',
  headers: {
    'X-RapidAPI-Key': "85dba23580mshb484c2511b3409fp10e32ajsn8e716dd3e565",
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }

};
export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': "85dba23580mshb484c2511b3409fp10e32ajsn8e716dd3e565",
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const response = await axios.request(url, options);
  const data = await response.data;
  return data;
}