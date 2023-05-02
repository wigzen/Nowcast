import { Box, Typography, useTheme } from '@mui/material'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/UserImage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../../state'

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(userId, friends)
  return (
    <Box
      sx={{
        padding: '1.5rem 1.5rem 0.75rem 1.5rem',
        backgroundColor: palette.background.alt,
        borderRadius: '0.75rem',
      }}
    >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      {friends.map(({ _id, firstName, lastName, occupation, picturePath }) => (
        <div style={{ marginBottom: '1em' }} key={_id}>
          <Friend
            friendId={_id}
            name={`${firstName} ${lastName}`}
            subtitle={occupation}
            userPicturePath={picturePath}
          />
        </div>
      ))}
    </Box>
  )
}

export default FriendListWidget

//  const { friendId, name, subtitle, userPicturePath } = feef
