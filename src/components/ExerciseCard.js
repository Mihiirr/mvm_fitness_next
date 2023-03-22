import React from 'react';
import { Link } from "next/link"
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise_card" href={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button sx={{
          ml: '21px', color: '#fff', background: '#ffa9a9',
          fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'
        }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{
          ml: '21px', color: '#fff', background: '#fcc757',
          fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'
        }}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold"
        mt="11px" textTransform="capitalize" pb="10px" fontSize="22px"
      >
        {exercise.name}
      </Typography>
    </Link>
  )
}

export default ExerciseCard;