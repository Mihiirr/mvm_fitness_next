import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Pagination } from '@mui/material';
import SearchExercises from '../components/SeachExercises';
import ExerciseCard from "../components/ExerciseCard";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import customStyles from "@/styles/Home.module.css"

const Home = () => {
    const navigate = useRouter();

    const [bodyPart, setBodyPart] = useState("all");
    const [exercises, setExercises] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 9;
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const isArray = Array.isArray(exercises);
    const currentExercises = isArray && exercises.slice(indexOfFirstExercise, indexOfLastExercise);
    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1800, behavior: 'smooth' });
    }

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("auth-token")) {
                navigate.push("/");
            }
        };
        const fetchExercisesData = async () => {
            let exercisesData = [];
            if (bodyPart === 'all') {
                exercisesData = await fetchData
                    ('https://exercisedb.p.rapidapi.com/exercises',
                        exerciseOptions);
            } else {
                exercisesData = await fetchData
                    (`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
                        exerciseOptions);
            }
            setExercises(exercisesData);
            console.log({ exercisesData })
        }
        checkUser();
        fetchExercisesData();
    }, [navigate, bodyPart]);
    return (
        <Box>
            <Header />
            {/* Hero Banner */}
            <Box sx={{
                mt: { lg: '212px', xs: '70px' },
                ml: { sm: '50px' }
            }} position="relative" p="20px">
                <Typography fontWeight={700}
                    sx={{
                        fontSize: { lg: '44px', xs: '40px' }
                    }}
                    mb="23px" mt="20px"
                >
                    Reach your Limits <br /> and get to the next level
                </Typography>
                <Typography fontSize="22px" lineHeight="35px" mb={4}>
                    check out the most effective exercises
                </Typography>
                <Button variant="contained" href="#exercises" color="error"
                    sx={{ backgroundColor: '#1E5128', padding: '10px' }}
                >Explore Exercises
                </Button>
                <Typography fontWeight={600}
                    color="#425F57"
                    sx={{ opacity: 0.1, display: { lg: 'block', xs: 'none' } }}
                    fontSize="200px" ml="-20px"
                >
                    Exercise
                </Typography>
                <img src="/gym_11.jpg" height="800px" alt="banner"
                    className={customStyles.hero_banner_img}
                />
            </Box>
            <SearchExercises
                setExercises={setExercises}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart} />

            {/* Exercises */}
            <Box id="exercises"
                sx={{ mt: { lg: '110px' } }}
                mt="50px"
                p="20px"

            >
                <Typography variant="h3" mb="46px">
                    Showing Results
                </Typography>
                {isArray ? (
                    <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' } }}
                        flexWrap="wrap" justifyContent="center"
                    >

                        {currentExercises.length === 0 ? <Typography variant="h3" mb="46px">
                            Showing Results
                        </Typography> : currentExercises.map((exercise) => (
                            <ExerciseCard key={exercise.id} exercise={exercise} />
                        ))}
                    </Stack>
                ) : <Typography color="red" variant="h3" mb="46px">
                    Somthing went wrong while fetching exercises.
                </Typography>}
                <Stack mt="100px" alignItems="center">
                    {exercises.length > 9 && (
                        <Pagination
                            color="standard"
                            shape="rounded"
                            defaultPage={1}
                            count={Math.ceil(exercises.length / exercisesPerPage)}
                            page={currentPage}
                            onChange={paginate}
                            size="large"
                        />
                    )}
                </Stack>
            </Box>
            <Footer />
        </Box>
    )
}

export default Home;