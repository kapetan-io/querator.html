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
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Queue. Scale. Deliver.</h1>
                    <p className={styles.heroSubtitle}>
                        The reliable queue system that scales from prototype to production without the complexity.
                        <br />
                        <span className={styles.heroTagline}>All you need is a database.</span>
                    </p>
                    <div className={styles.heroButtons}>
                        <Link
                            className={clsx('button button--primary button--lg', styles.primaryButton)}
                            to="/docs/getting-started/quick-start">
                            Try Querator
                        </Link>
                        <Link
                            className={clsx('button button--secondary button--lg', styles.secondaryButton)}
                            to="/docs/intro">
                            View Documentation
                        </Link>
                        <Link
                            className={clsx('button button--outline button--lg', styles.githubButton)}
                            href="https://github.com/kapetan-io/querator">
                            ⭐ Star on GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

function ValueProposition() {
    return (
        <section className={styles.valueProposition}>
            <div className="container">
                <div className={styles.valueGrid}>
                    <div className={styles.valueItem}>
                        <h3>Lease Pattern</h3>
                        <p>Uses the Lease pattern to ensure messages are delivered and processed by the consumer. Built with well known HTTP, Protobuf, JSON Protocols makes adoption easy.</p>
                    </div>
                    <div className={styles.valueItem}>
                        <h3>Simply Scalable</h3>
                        <p>Automatically balanced partitions means scale without the need for a complex protocol or clients. Server handles all the complexity of assigning consumers to partitions.</p>
                    </div>
                    <div className={styles.valueItem}>
                        <h3>Database-Backed</h3>
                        <p>Disaggregated data layer provides operators with the flexibility to select the desired level of fault tolerance and use of a data store with which they are familiar.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CodeShowcase() {
    const [activeTab, setActiveTab] = React.useState('produce');

    const codeExamples = {
        produce: {
            title: "Produce Messages",
            description: "Add work to your queue with a simple HTTP request",
            code: `curl -X POST localhost:2319/v1/queue.produce \\
  -H "Content-Type: application/json" \\
  -d '{
    "queue_name": "email-queue",
    "items": [{
      "kind": "welcome-email",
      "reference": "user-123",
      "utf8": "{\\"email\\": \\"user@example.com\\"}"
    }]
  }'`
        },
        consume: {
            title: "Consume Messages",
            description: "Workers lease messages for exclusive processing",
            code: `curl -X POST localhost:2319/v1/queue.lease \\
  -H "Content-Type: application/json" \\
  -d '{
    "queue_name": "email-queue",
    "client_id": "worker-1",
    "batch_size": 10
  }'`
        },
        complete: {
            title: "Complete Processing",
            description: "Mark messages as successfully processed",
            code: `curl -X POST localhost:2319/v1/queue.complete \\
  -H "Content-Type: application/json" \\
  -d '{
    "queue_name": "email-queue",
    "partition": 0,
    "ids": ["msg-id-1", "msg-id-2"]
  }'`
        }
    };

    return (
        <section className={styles.codeShowcase}>
            <div className="container">
                <div className={styles.showcaseHeader}>
                    <h2>Simple HTTP API</h2>
                    <p>Works with any programming language. No SDKs required.</p>
                </div>
                
                <div className={styles.codeDemo}>
                    <div className={styles.codeTabs}>
                        {Object.entries(codeExamples).map(([key, example]) => (
                            <button
                                key={key}
                                className={clsx(styles.codeTab, activeTab === key && styles.codeTabActive)}
                                onClick={() => setActiveTab(key)}>
                                {example.title}
                            </button>
                        ))}
                    </div>
                    
                    <div className={styles.codeContent}>
                        <div className={styles.codeDescription}>
                            <h3>{codeExamples[activeTab].title}</h3>
                            <p>{codeExamples[activeTab].description}</p>
                        </div>
                        <pre className={styles.codeBlock}>
                            <code>{codeExamples[activeTab].code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SocialProof() {
    return (
        <section className={styles.socialProof}>
            <div className="container">
                <div className={styles.proofGrid}>
                    <div className={styles.proofItem}>
                        <div className={styles.proofNumber}>5min</div>
                        <div className={styles.proofLabel}>Setup Time</div>
                    </div>
                    <div className={styles.proofItem}>
                        <div className={styles.proofNumber}>99.9%</div>
                        <div className={styles.proofLabel}>Reliability</div>
                    </div>
                    <div className={styles.proofItem}>
                        <div className={styles.proofNumber}>Millions</div>
                        <div className={styles.proofLabel}>Messages/Day</div>
                    </div>
                    <div className={styles.proofItem}>
                        <div className={styles.proofNumber}>HTTP</div>
                        <div className={styles.proofLabel}>Any Language</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function QuickStart() {
    return (
        <section className={styles.quickStart}>
            <div className="container">
                <h2>Why Querator?</h2>
                <div className={styles.quickStartGrid}>
                    <div className={styles.quickStartItem}>
                        <h3>🚀 Simple Setup</h3>
                        <p>Just add a database. No complex infrastructure or message brokers required.</p>
                    </div>
                    <div className={styles.quickStartItem}>
                        <h3>📈 Auto-Scaling</h3>
                        <p>Handles growth automatically with partition-based scaling. No manual configuration.</p>
                    </div>
                    <div className={styles.quickStartItem}>
                        <h3>🔒 Reliable Delivery</h3>
                        <p>Almost Exactly Once Delivery ensures your messages are processed reliably.</p>
                    </div>
                    <div className={styles.quickStartItem}>
                        <h3>🌐 HTTP Everything</h3>
                        <p>Works with any programming language. Integrate with curl, your favorite HTTP client, or any framework.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CallToAction() {
    return (
        <section className={styles.callToAction}>
            <div className="container">
                <div className={styles.ctaContent}>
                    <h2>Ready to get started?</h2>
                    <p>Join developers who've simplified their queue infrastructure with Querator.</p>
                    <div className={styles.ctaButtons}>
                        <Link
                            className={clsx('button button--primary button--lg', styles.primaryButton)}
                            to="/docs/getting-started/installation">
                            Get Started Now
                        </Link>
                        <Link
                            className={clsx('button button--secondary button--lg', styles.secondaryButton)}
                            to="/api">
                            View API Docs
                        </Link>
                    </div>
                    
                    {/* Integrated Footer Links */}
                    <div className={styles.ctaFooter}>
                        <div className={styles.footerLinks}>
                            <Link to="/docs/intro">Documentation</Link>
                            <Link to="/api">API Reference</Link>
                            <Link href="https://github.com/kapetan-io/querator">GitHub</Link>
                            <Link href="https://discord.gg/gQeRm48R">Discord</Link>
                            <Link href="https://trello.com/b/cey2cB3i/querator">Trello Board</Link>
                        </div>
                        <div className={styles.footerCopyright}>
                            Built with caffeine, desperation, and Docusaurus ☕
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home(): React.ReactElement {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="The reliable queue system that scales from prototype to production without the complexity."
            wrapperClassName="homepage">
            <HomepageHeader />
            <main>
                <ValueProposition />
                <CodeShowcase />
                <SocialProof />
                <QuickStart />
                <CallToAction />
            </main>
        </Layout>
    );
}