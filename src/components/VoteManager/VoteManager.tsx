import blackNote from '../../assets/icons/blackNote.png'
import whiteNote from '../../assets/icons/whiteNote.png'
import piano_up from '../../assets/audio/piano_up.wav'
import piano_down from '../../assets/audio/piano_down.wav'


import { useState } from 'react'
import useSound from 'use-sound'

import { Profile } from "../../types/models"
import { VoteManagerFormData } from '../../types/forms'

interface VoteManagerProps {
  profile: Profile;
  handleVote: (formData: VoteManagerFormData) => void
}

const VoteManager = (props: VoteManagerProps): JSX.Element => {
  const { profile, handleVote } = props

  const [hover, setHover] = useState<string | null>(null)

  const handleHover = (evt: React.MouseEvent): void => {
    if (evt.type === 'mouseover') {
      setHover(evt.currentTarget.id)
    } else if (evt.type === 'mouseleave') {
      setHover(null)
    }
  }

  const [rateUp] = useSound(piano_up, { volume: 0.2})
  const [rateDown] = useSound(piano_down, { volume: 0.2})

  const ratingOptions: [ 1, 2, 3, 4, 5 ] = [ 1, 2, 3, 4, 5 ]
  const voteCount = profile.votesReceived?.length
  let voteSum = 0

  profile.votesReceived.forEach(vote => voteSum += vote.value)
  console.log(profile)

  const profileRating = voteCount ? voteSum / voteCount : 1

  const handleClick = (evt: React.MouseEvent<HTMLImageElement>): void => {
    const newValue = parseInt(evt.currentTarget.id)

    newValue > profileRating ? rateUp() : rateDown()

    handleVote({ value: newValue, profileId: profile.id })
  }

  return (
    <section>
      {ratingOptions.map((rating: number): JSX.Element => (
        <img
          id={rating.toString()}
          key={rating}
          onClick={handleClick}
          onMouseOver={handleHover}
          onMouseLeave={handleHover}
          src={rating <= profileRating ? blackNote : whiteNote}
          alt="Music Note Symbol"
        />
      ))}

    </section>
  )
}

export default VoteManager