import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`container ${styles.navbar}`}>
            <Link href="/" className={styles.logo}>
                Peyman Hodjati
            </Link>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/portfolio" className={styles.link}>Portfolio</Link>
            </div>
        </nav>
    );
}

