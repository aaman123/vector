import { useState, useEffect } from 'react';
import { cardData } from '../../data/static_data';
import { Card } from '../../interfaces/Card';
import useStyles from './useStyles';
import { Card as MuiCard, Box, CardContent, CardMedia, Typography } from '@mui/material';
import ImageDialog from '../../components/Dialog';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getCards, updateCards as updateCardApi } from '../../utils/ApiCaller';
import moment from 'moment';

const Dashboard = () => {
    const Cards: Card[] = [];
    const classes = useStyles();
    const [cards, updateCards] = useState(Cards);
    const [areCardsUpdated , setAreCardsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [savedTime, setSavedTime] = useState<number>(moment.now);
    const [timeDiff, setTimeDiff] = useState('');

    useEffect(() => {
        getCards().then((response) => { updateCards(response.data); })
        if(areCardsUpdated == true) {
            updateCardApi(cards).then((response) => {console.log('cards updated')});
            setAreCardsUpdated(!areCardsUpdated);
            setIsSaving(!isSaving);
            setSavedTime(moment.now());
            setTimeDiff('');
        }

        const timerId = setInterval(() => {setTimeDiff(moment(savedTime).fromNow())}, 20000);
        return () => {
            clearInterval(timerId);
        }
    }, [areCardsUpdated, isSaving, savedTime]);

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
    
        const cardItems = Array.from(cards);
        const [reorderedItem] = cardItems.splice(result.source.index, 1);
        cardItems.splice(result.destination.index, 0, reorderedItem);
        updateCards(cardItems);
        setAreCardsUpdated(!areCardsUpdated);
        setIsSaving(!isSaving);
      }

    const handleClose = () => {
        setIsOpen(!isOpen);
    };

    return(
        <> 
            <Box mt={10} display="flex" flexDirection="column" flexWrap="wrap" justifyContent="center">
                {
                    isSaving == true ?
                    <Typography alignSelf="center" variant="h4">Saving</Typography>:
                    <Typography alignSelf="center" variant="h4">Saved 
                        <span style={{marginLeft: '1rem'}}>
                            <Typography alignSelf="center" variant="caption">{ timeDiff } </Typography> 
                        </span>
                    </Typography>
                }
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="cards" direction="horizontal">
                        {(provided: any) => (
                            <ul className={classes.cards} {...provided.droppableProps} ref={provided.innerRef}>
                            {
                            cards.map((card, index) => {
                                return(
                                    <Draggable key={card.id.toString()} draggableId={card.id.toString()} index={index}>
                                        {(provided: any) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Box ml={5}>
                                                    <MuiCard key={index} sx={{ width: 200, height: 300, marginTop: 5 }}
                                                            onClick={() => {setIsOpen(!isOpen); setImage(card.imgUrl)}}
                                                    >
                                                        <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={card.imgUrl}
                                                        alt="green iguana"
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                {card.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {card.type}
                                                            </Typography>
                                                        </CardContent>
                                                    </MuiCard>     
                                                </Box>  
                                            </li>
                                        )}
                                    </Draggable>       
                                )
                            })
                        }
                    </ul>
                    )}
                    </Droppable>
                </DragDropContext>
                <ImageDialog 
                    image={image}
                    isOpen={isOpen}
                    onClose={handleClose}
                />
            </Box>
        </>
    )
};

export default Dashboard;
