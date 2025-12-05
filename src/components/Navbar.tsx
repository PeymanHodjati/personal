import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`container ${styles.navbar}`}>
            <Link href="/" className={styles.logo}>
                PersonalSite
            </Link>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/portfolio" className={styles.link}>Portfolio</Link>
                <Link href="/blog" className={styles.link}>Blog</Link>
            </div>
        </nav>
    );
}
