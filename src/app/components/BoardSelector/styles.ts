import { styled } from "@stitches/react";

export const BoardListContainer = styled('section', {
    padding: '0 50px',
});

export const BoardList = styled('ul', {
    display: 'flex',
    flexDirection: 'row',
    height: '240px',
});

export const BoardItem = styled('li', {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '199px',
    height: '204px',
    '&:hover': {

    },
});
