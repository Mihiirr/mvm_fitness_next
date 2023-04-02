import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, CardActionArea } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData';
import customStyles from "@/styles/Home.module.css"

const SearchExercises = ({ setExercises, setBodyPart }) => {
  const [search, setSearch] = useState('')

  const [bodyParts, setBodyParts] = useState([]);
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyParts(['all', ...bodyPartsData]);
    }
    fetchExercisesData();
  }, [])

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData
        ('https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions,)
      const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
          || item.target.toLowerCase().includes(search)
          || item.equipment.toLowerCase().includes(search)
          || item.bodyPart.toLowerCase().includes(search)
      );
      setSearch('');
      setExercises(searchedExercises)
    }
  }
  return (
    <Stack alignItems="center" mt="37px"
      justifyContent="center" p="20px"
    >
      <Typography fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px" textAlign="center">
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className={customStyles.home_serachbar}
          placeholder="Example: legs"
        />
        <button className={customStyles.home_serachBtn} onClick={handleSearch}>Search</button>
      </Box>
      <div className={customStyles.home_searchbar_excard_container}>
        {bodyParts.map(item => (
          <div className={customStyles.home_searchbar_excard} onClick={() => setBodyPart(item)}>
            <CardActionArea sx={{ display: "flex", flexDirection: "column", height: 300 }}>
              <img src="/ani_gym.gif" alt="dumbell" height="200px" width="300px" style={{ marginBottom: 20 }} />
              <h1 className={customStyles.home_searchbar_excard_title}>{item.toUpperCase()}</h1>
            </CardActionArea>
          </div>
        ))}
      </div>
    </Stack>
  )
}

export default SearchExercises;