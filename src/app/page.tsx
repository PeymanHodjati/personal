import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Creative Developer &<br />Visual Storyteller</h1>
      <p className={styles.subtitle}>
        Crafting digital experiences with code, video, and interactive media.
      </p>
      <div className={styles.actions}>
        <Link href="/portfolio" className="btn btn-primary">
          View Work
        </Link>
        <Link href="/blog" className="btn btn-outline">
          Read Blog
        </Link>
      </div>
    </div>
  );
}
