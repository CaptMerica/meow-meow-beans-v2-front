// components
import ProfileCard from '../../components/ProfileCard/ProfileCard'

// types
import { Profile } from '../../types/models'
import { VoteManagerFormData } from '../../types/forms'

interface ProfilesProps {
  profiles: Profile[];
  handleVote: (formData: VoteManagerFormData) => void
}

const Profiles = (props: ProfilesProps): JSX.Element => {
  const { profiles } = props

  if(!profiles.length) return <p>No profiles yet</p>

  return (
    <main className='list'>
      {profiles.map((profile: Profile) =>
        <ProfileCard 
          key={profile.id} 
          profile={profile}
          handleVote={props.handleVote}
        />
      )}
    </main>
  )
}
 
export default Profiles
