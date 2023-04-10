import User from '../models/User.js'

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    const FormattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )
    res.status(200).json(FormattedFriends)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendID } = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendID)
    if (user.friends.includes(friendID)) {
      user.friends = user.friends.filter((id) => id !== friendID)
      friend.friends = friend.friends.filter((id) => id !== id)
    } else {
      user.friends.push(friendID)
      friend.friends.push(id)
    }
    await user.save()
    await friend.save()
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    const FormattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )
    res.status(200).json(FormattedFriends)
  } catch (err) {
    res.status(404).json({ message: err, message })
  }
}
