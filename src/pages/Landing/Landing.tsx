// assets and stylesheets
import logo from '../../assets/logo.svg'
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

import * as authService from '../../services/authService'

interface LandingProps {
  user: User | null
  handleLogout: () => void;
}

const Landing = ({ user, handleLogout}: LandingProps): JSX.Element => {

  const handleDeleteAccount = async(): Promise<void> => {
    await authService.deleteAccount()
    handleLogout()
  }

  return (
    <main className={styles.container}>
      <h1>Meow Meow <br/> Beans</h1>
      <img src={logo} alt="A meow meow bean" />

      { user &&
      <button onClick={handleDeleteAccount}>
        DELETE ACCOUNT
      </button>
      }
    </main>
  )
}

export default Landing
