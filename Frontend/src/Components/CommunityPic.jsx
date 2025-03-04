import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import CommunityPicture from '../assets/Images/Javascript-logo.png'
const CommunityPic = () =>{
    return (
        <div>
          <Stack direction="row" spacing={2}>
            <Avatar sx={{width: 50, height: 50}}alt="Dao" src={CommunityPicture}/>
          </Stack>
        </div>
    )
}

export default CommunityPic