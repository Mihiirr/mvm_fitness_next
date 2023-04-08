import React from 'react';
import Link from "next/link"
import { Button } from '@mui/material';
import customStyles from "@/styles/Home.module.css"

const ExerciseCard = ({ exercise }) => {
  return (
    <Link style={{ textDecoration: "none" }} href={`/exercise/${exercise.id}`}>
      <div key={exercise.id} className={customStyles.exercise_cards_home}>
        <img style={{ borderRadius: "20px" }} src={exercise.gifUrl} alt={exercise.name} loading="lazy" height="" width="370px" />
        <div className={customStyles.title_container_home} style={{ display: "flex", maxWidth: "200px", justifyContent: "space-between", marginLeft: "20px" }}>
          <Button>
            {exercise.bodyPart}
          </Button>
          <Button>
            {exercise.target}
          </Button>
        </div>
        <p>{exercise.name}</p>
      </div>
    </Link >
  )
}

export default ExerciseCard