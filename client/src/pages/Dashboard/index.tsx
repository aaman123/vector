import { useState } from 'react';
import { cardData } from '../../data/static_data';
import { Card } from '../../interfaces/Card';
import useStyles from './useStyles';
import { Card as MuiCard, Box, CardContent, CardMedia, Typography } from '@mui/material';
import ImageDialog from '../../components/Dialog';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = () => {
    const Cards: Card[] = cardData;
    const classes = useStyles();
    const [cards, updateCards] = useState(Cards);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState('');

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
    
        const cardItems = Array.from(cards);
        const [reorderedItem] = cardItems.splice(result.source.index, 1);
        cardItems.splice(result.destination.index, 0, reorderedItem);
        updateCards(cardItems);
      }

    const handleClose = () => {
        setIsOpen(!isOpen);
    };

    return(
        <> 
            <Box mt={10} display="flex" flexDirection="column" flexWrap="wrap" justifyContent="center">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="cards" direction="horizontal">
                        {(provided: any) => (
                            <ul className={classes.cards} {...provided.droppableProps} ref={provided.innerRef}>
                            {
                            cards.map((card, index) => {
                                return(
                                    <Draggable key={card.position} draggableId={card.position} index={index}>
                                        {(provided: any) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Box ml={5}>
                                                    <MuiCard key={index} sx={{ width: 200, height: 300, marginTop: 5 }}
                                                            onClick={() => {setIsOpen(!isOpen); setImage(card.image)}}
                                                    >
                                                        <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={card.image}
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
