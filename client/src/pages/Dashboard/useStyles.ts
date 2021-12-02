import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>  ({
        cardImage: {
            width: '100px',
            height: '100px',
            borderRadius: '50%'
        },
        cards: {
            display: 'flex',
            flexDirection: 'row',
            listStyleType: 'none',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
    })
);

export default useStyles;