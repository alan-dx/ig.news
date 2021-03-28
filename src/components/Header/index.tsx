import { SignInButton } from '../SiginInButton'
import Link from 'next/link'

import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'

export function Header() {

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/">
					<img src="/images/logo.svg" alt="ig.news"/>
				</Link>
				<nav>
					<ActiveLink activeClassName={styles.active} href="/">
						<a>Home</a>
					</ActiveLink>
					<ActiveLink activeClassName={styles.active} href="/posts" prefetch>
						<a>Posts</a>				
					</ActiveLink>
				</nav>

				<SignInButton />
			</div>
		</header>
	)
}