import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';
import customStyles from "@/styles/Home.module.css"

export default function ImageCard({ place, checked }) {
    return (
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <Card className={customStyles.image_card_root}>
                <CardMedia
                    className={customStyles.image_card_media}
                    image={place.imageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h1"
                        className={customStyles.image_card_title}
                    >
                        {place.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={customStyles.image_card_desc}
                    >
                        {place.description}
                    </Typography>
                </CardContent>
            </Card>
        </Collapse>
    );
}