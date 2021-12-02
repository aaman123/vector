import { cardData } from '../../data/static_data';
import { Card } from '../../interfaces/Card';
import useStyles from './useStyles';
import { Card as MuiCard, Box, CardContent, CardMedia, Typography } from '@mui/material';

const Dashboard = () => {
    const Cards: Card[] = cardData;
    const classes = useStyles();

    return(
        <> 
            <Box mt={10} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
            {
            Cards.map((card, index) => {
                    return(
                        <Box ml={5}>
                            <MuiCard key={index} sx={{ width: 200, height: 300 }}>
                                <CardMedia
                                component="img"
                                height="140"
                                image=""
                                alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.type}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.position}
                                    </Typography>
                                </CardContent>
                            </MuiCard>     
                        </Box>         
                    )
                })
            }
            </Box>
        </>
    )
};

export default Dashboard;
