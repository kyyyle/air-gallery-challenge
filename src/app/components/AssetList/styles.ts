import { styled } from "@stitches/react";

export const AssetContainer = styled('section', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0 50px',
    alignItems: 'flex-start',
});

export const StyledList = styled('ul', {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '25px',
});

export const AssetItem = styled('li', {
    display: 'flex',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    '&&:not(:last-child)': {
        marginRight: '25px',
    },
});
