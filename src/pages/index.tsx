import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">A Reservation based FIFO queue with Exactly Once Delivery semantics</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}

function QuickStart() {
    return (
        <section className={styles.quickStart}>
            <h2>What is Querator?</h2>
            <p>
                Querator is a highly scalable queue system that uses the reservation pattern to implement
                "Almost Exactly Once Delivery" (AEOD). The Reservation Pattern ensures that each item is
                processed exactly once and in the order it was received, making it ideal for distributed
                systems and complex workflows.
            </p>
        </section>
    );
}

function UseCases() {
    return (
        <div className={styles.useCases}>
        <section >
            <h2>Use Cases</h2>
            <ul>
                <li>Implement multistep, retry-able workflows</li>
                <li>Implement the Saga Pattern for distributed transactions</li>
                <li>Use as a lock to gain exclusive access to an item of work</li>
                <li>Use as a FIFO queue with ordered delivery of messages</li>
                <li>Run async background tasks that can retry if failed</li>
                <li>Schedule cron-style jobs to run at a specific time in the future and retry if failed</li>
                <li>Retryable and reliable webhook delivery with external systems</li>
            </ul>
        </section>
        </div>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="A Reservation based FIFO queue with Almost Exactly Once Delivery semantics">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <QuickStart />
                <UseCases />
            </main>
        </Layout>
    );
}
