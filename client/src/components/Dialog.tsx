import { Dialog, Box } from '@mui/material';

interface props {
    image: any,
    isOpen: boolean,
    onClose: (
        isOpen: boolean
    ) => void,
}

const ImageDialog = ({image, isOpen, onClose}: props) => {

    const handleClose = () => {
        onClose(!isOpen);
    }

    return(
        <Box>
            <Dialog onClose={handleClose} open={isOpen}>
                <img src={image}
                    alt="Card image"
                    width={400}
                    height={400}
                    />
            </Dialog>
        </Box>
    );
}

export default ImageDialog;