import React, { useContext } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import { exerciseOptions, youtubeOptions, fetchData } from '@/utils/fetchData';
import Loader from '@/components/Loader';
import exDetailStyles from "@/styles/ExDetail.module.css";
import { Context } from '@/context/authContext';
import ExerciseCard from '@/components/ExerciseCard';

const ExerciseDetail = ({ exerciseDetailData, exerciseVideosData, targetMuscleExercisesData, equipmentExercisesData }) => {
    const { bodyPart, gifUrl, name, equipment, target } = exerciseDetailData;
    const { state, dispatch } = useContext(Context);
    const favouriteChecker = (id) => {
        const boolean = state.favourites.some((exerciseDetailId) => exerciseDetailId.id === id);
        return boolean;
    }
    const extraDetail = [
        {
            icon: "/icons/body-part.png",
            name: bodyPart,
        },
        {
            icon: "/icons/target.png",
            name: target,
        },
        {
            icon: "/icons/equipment.png",
            name: equipment,
        }
    ]
    return (
        <Box sx={{ paddingTop: 10 }}>
            <Header />
            {/* Detail */}
            <Stack gap="60px" sx={{
                flexDirection: { lg: 'row' },
                p: '20px', alignItems: 'center'
            }}>
                <img src={gifUrl} alt={name} loading="lazy" className={exDetailStyles.detail_image} />
                <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
                    <Typography variant='h3'>
                        {name}
                        {favouriteChecker(exerciseDetailData.id) ?
                            <Button onClick={() => dispatch({
                                type: "REMOVE_FROM_FAVOURITE",
                                payload: exerciseDetailData
                            })} sx={{
                                ml: '61px', mt: '11px', color: '#ffffff', background: '#008000',
                                fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'
                            }}>
                                remove from favourites
                            </Button>
                            : <Button onClick={() => dispatch({
                                type: "ADD_TO_FAVOURITE",
                                payload: exerciseDetailData
                            })} sx={{
                                ml: '61px', mt: '11px', color: '#ffffff', background: '#008000',
                                fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'
                            }}>
                                Add to favourites
                            </Button>}

                    </Typography>
                    <Typography variant='h6'>
                        Exercises keep you strong. {name} {` `}
                        is one of the
                        best exercises to target your {target}.
                        it will help you improve
                        your mood and gain energy.

                    </Typography>
                    {extraDetail.map((item) => (


                        <Stack key={item.name} direction="row"
                            gap="24px" alignItems="center"
                        >
                            <Button sx={{
                                background: '#fff2db', borderRadius: '50%',
                                width: '100px', height: '100px'
                            }}>
                                <img src={item.icon} alt={bodyPart} style={{
                                    width: '50px', height: '50px'
                                }} />
                            </Button>

                            <Typography textTransform="capitalize" variant='h5'>
                                {item.name}

                            </Typography>
                        </Stack>

                    ))}
                </Stack>
            </Stack>

            <div> </div>
            {/* Exercise Video */}
            <Box sx={{ marginTop: { lg: '200px', xs: '20px' } }} p="20px">
                <Typography variant="h3" mb="33px">
                    Watch <span style={{ color: '#ff2625', textTransform: 'capitalize' }}>{exerciseDetailData.name}
                    </span> {` `}exercise videos
                </Typography>
                <Stack justifyContent="flex-start" alignItems="center"
                    sx={{
                        flexDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0' }
                    }}

                >
                    {exerciseVideosData.length ? exerciseVideosData?.slice(0, 3).map((item) => (
                        <a
                            key={item.channelId}
                            className={exDetailStyles.exercise_video}
                            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={item.video.thumbnails[0].url} alt="{item.video.title}" />
                            <Box>
                                <Typography variant="h5" color="#000">
                                    {item.video.title}
                                </Typography>
                                <Typography variant="h7" color="#000" mt="10px">
                                    {item.video.channelName}
                                </Typography>
                            </Box>

                        </a>
                    )) : <Loader />}
                </Stack>
            </Box>

            {/* Similar Exercises */}
            <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
                <Typography variant='h3' mb={5} ml={4}>
                    Exercises that target the same muscle groups
                </Typography>
                <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
                    {targetMuscleExercisesData.length ? (
                        <div className={exDetailStyles.exdetail_similar_excard_container}>
                            {targetMuscleExercisesData.map(item => (
                                <div key={item.id} className={exDetailStyles.exdetail_similar_excard}>
                                    <ExerciseCard exercise={item} />
                                </div>
                            ))}
                        </div>
                    ) : <Loader />}
                </Stack>
                <Typography variant='h3' mb={5} ml={4} mt={12}>
                    Exercises that target the same equipment
                </Typography>
                <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
                    {equipmentExercisesData.length ? (
                        <div className={exDetailStyles.exdetail_similar_excard_container}>
                            {equipmentExercisesData.map(item => (
                                <div key={item.id} className={exDetailStyles.exdetail_similar_excard}>
                                    <ExerciseCard exercise={item} />
                                </div>
                            ))}
                        </div>
                    ) : <Loader />}
                </Stack>
            </Box>
            <div>
            </div>
        </Box >
    )
}

export default ExerciseDetail;

export async function getServerSideProps({ query }) {
    const { id } = query;
    const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'
    const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
    const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
    const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
    const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
    return {
        props: { exerciseDetailData: JSON.parse(JSON.stringify(exerciseDetailData)), exerciseVideosData: JSON.parse(JSON.stringify(exerciseVideosData.contents)), targetMuscleExercisesData: JSON.parse(JSON.stringify(targetMuscleExercisesData)), equipmentExercisesData: JSON.parse(JSON.stringify(equipmentExercisesData)) }
    }
}