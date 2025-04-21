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
                <p className="hero__subtitle">A Distributed Durable Execution System & Exactly Once Delivery Queue</p>
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
                Querator is a <b>Distributed Durable Execution</b> System built on top of an <b>Almost Exactly Once Delivery</b>
                (AEOD) Queue. Querator addresses both <b>Durable Execution</b> and <b>Exactly Once Delivery Queues</b>, which together form a
                symbiotic relationship that enables developers to build event-driven, highly resilient, distributed,
                high-performance applications.

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
                <li>Implement multi-step, durable execution functions</li>
                <li>Implement the Saga Pattern for distributed transactions</li>
                <li>Use it as a FIFO queue with ordered delivery of items</li>
                <li>Use it as a limit locking system, where items in the queue represent a limited lockable resource</li>
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
            description="A Distributed Durable Execution System & Exactly Once Delivery Queue">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <QuickStart />
                <UseCases />
            </main>
        </Layout>
    );
}
