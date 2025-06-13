import React, { useEffect, useRef } from 'react';
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
                    <h1 className={styles.heroTitle}>Almost Exactly Once Message Queue</h1>
                    <p className={styles.heroSubtitle}>
                        <span className={styles.heroTagline}>Querator delivers almost-exactly-once message processing at scale using HTTP and a databases of your choice.</span>
                    </p>
                    <div className={styles.heroButtons}>
                        <Link
                            className={clsx('button button--primary button--lg', styles.primaryButton)}
                            to="/docs/quick-start">
                            Try Querator
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

function AlmostExactlyOnce() {
    return (
        <section className={styles.inlineFeatures}>
            <div className="container">
                <h2>Almost Exactly Once?</h2>
                <div className={styles.featureContent}>
                    <p className={styles.featureParagraph}>
                        We say "Almost" Exactly Once because <a href="https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/" target="_blank" rel="noopener noreferrer" className={styles.highlightText}>Exactly Once Delivery (EOD) is theoretically impossible</a>.
                        However, in practice, you can achieve <span className={styles.highlightBadge}>AEOD</span>
                        which is functionally equivalent to EOD, with the understanding that occasional duplicate deliveries may occur due to system failures.
                    </p>

                    <p className={styles.featureParagraph}>
                        From our experience with <span className={styles.highlightBadge}>EOD</span> systems at scale,
                        the likelihood of <span className={styles.highlightText}>Duplicate Delivery</span> and
                        processing is about the same as your system's overall failure rate. In other words,
                        message delivery is only as reliable as the system it runs on.
                    </p>

                    <p className={styles.featureParagraph}>
                        Anyone claiming their system provides precise Exactly Once Delivery is being <span className={styles.highlightText}>disingenuous at best.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

function CodeShowcase() {
    const [activeTab, setActiveTab] = React.useState('produce');

    // Simple syntax highlighting function for curl + JSON
    const highlightCode = (code) => {
        return code
            // Highlight JSON strings (in quotes)
            .replace(/"([^"]*)":/g, '<span class="json-key">"$1":</span>')
            .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
            // Highlight numbers
            .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
            // Highlight curl command parts
            .replace(/(curl)/g, '<span class="curl-command">$1</span>')
            .replace(/(-[A-Z]+)/g, '<span class="curl-flag">$1</span>')
            .replace(/(localhost:\d+\/[^\s\\]*)/g, '<span class="curl-url">$1</span>')
            // Highlight HTTP headers
            .replace(/(-H\s+"[^"]*")/g, '<span class="curl-header">$1</span>');
    };

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
                    <p>Works with any programming language that supports JSON and HTTP.</p>
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
                            <code 
                                dangerouslySetInnerHTML={{ 
                                    __html: highlightCode(codeExamples[activeTab].code) 
                                }}
                            />
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

function InlineFeatures() {
    return (
        <section className={styles.inlineFeatures}>
            <div className="container">
                <h2>Why Querator?</h2>
                <div className={styles.featureContent}>
                    <p className={styles.featureParagraph}>
                        Querator combines <span className={styles.highlightBadge}>almost-exactly-once delivery</span> with
                        the simplicity of HTTP. Messages are <span className={styles.highlightText}>leased, not lost</span> – 
                        ensuring your data never disappears even when consumers crash. Unlike traditional message brokers that 
                        require complex configuration and vendor-specific clients, Querator works with 
                        <span className={styles.highlightBadge}>any programming language</span> that supports JSON and HTTP.
                    </p>
                    
                    <p className={styles.featureParagraph}>
                        Built for scale from day one, Querator features <span className={styles.highlightText}>automatic partition balancing</span> – 
                        no manual partition assignment needed. The server intelligently distributes your workload while you focus on 
                        your business logic. With support for both <span className={styles.highlightBadge}>JSON</span> and 
                        <span className={styles.highlightBadge}>high-performance Protobuf</span>, you get the flexibility 
                        to optimize for readability or performance as your needs evolve.
                    </p>
                    
                    <p className={styles.featureParagraph}>
                        What makes Querator truly different is its <span className={styles.highlightText}>database-first approach</span>. 
                        Instead of managing another piece of infrastructure, Querator leverages the 
                        <span className={styles.highlightBadge}>databases you already operate</span> – PostgreSQL, MySQL, or MongoDB. 
                        This means familiar backup strategies, monitoring tools, and operational procedures. 
                        <span className={styles.highlightText}>Your existing expertise</span> becomes your queue management expertise.
                    </p>
                </div>
            </div>
        </section>
    );
}

function UseCases() {
    return (
        <section className={styles.useCases}>
            <div className="container">
                <h2>Use Cases</h2>
                <div className={styles.useCaseColumns}>
                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIcon}>⚡</div>
                        <h3>Background Jobs</h3>
                        <p>Email notifications, report generation, AI Training Jobs</p>
                    </div>
                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIcon}>📊</div>
                        <h3>Event Processing</h3>
                        <p>User analytics, audit logs, webhook delivery</p>
                    </div>
                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIcon}>🔄</div>
                        <h3>Distributed Workflows</h3>
                        <p>Order processing, ETL pipelines, media transcoding</p>
                    </div>
                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIcon}>🔗</div>
                        <h3>Microservice Communication</h3>
                        <p>Async commands, event sourcing, saga patterns</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ArchitectureOverview() {
    return (
        <section className={styles.architectureOverview}>
            <div className="container">
                <div className={styles.architectureHeader}>
                    <h2>Architecture Overview</h2>
                    <p>Querator enables API users to interact with queues where each queue can consist of one or more partitions. Each partition is backed by a single table in the database.</p>
                </div>
                
                <div className={styles.architectureDiagram}>
                    <div className={styles.diagramSection}>
                        <div className={styles.clientsSection}>
                            <h3>Clients</h3>
                            <div className={styles.clientNodes}>
                                <div className={styles.clientNode}>Producer 1</div>
                                <div className={styles.clientNode}>Producer 2</div>
                                <div className={styles.clientNode}>Consumer 1</div>
                                <div className={styles.clientNode}>Consumer 2</div>
                            </div>
                        </div>
                        
                        <div className={styles.connectionFlow}>
                            <div className={styles.flowArrow}>
                                <span className={styles.flowLabel}>HTTP API</span>
                                <div className={styles.arrow}></div>
                            </div>
                        </div>
                        
                        <div className={styles.queratorSection}>
                            <h3>Querator</h3>
                            <div className={styles.queratorNode}>
                                Queue Management
                                <br />
                                Partition Balancing
                                <br />
                                Lease Management
                            </div>
                        </div>
                        
                        <div className={styles.connectionFlow}>
                            <div className={styles.flowArrow}>
                                <span className={styles.flowLabel}>SQL Queries</span>
                                <div className={styles.arrow}></div>
                            </div>
                        </div>
                        
                        <div className={styles.databaseSection}>
                            <h3>Database</h3>
                            <div className={styles.databaseNodes}>
                                <div className={styles.partitionTable}>Partition 1 Table</div>
                                <div className={styles.partitionTable}>Partition 2 Table</div>
                                <div className={styles.partitionTable}>Partition 3 Table</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={styles.architectureActions}>
                    <Link
                        className={clsx('button button--primary button--lg', styles.primaryButton)}
                        to="/docs/architecture">
                        Architecture Docs
                    </Link>
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
                    <h2>Open Source</h2>
                    <p>Querator is open source and community-driven. Whether you're fixing bugs, adding features, or sharing ideas, every contribution makes queuing better for everyone.</p>
                    
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
            description="Almost exactly once message queue with HTTP API simplicity, and your database."
            wrapperClassName="homepage">
            <HomepageHeader />
            <main>
                <CodeShowcase />
                <AlmostExactlyOnce />
                <UseCases />
                <InlineFeatures />
                <ArchitectureOverview />
                <CallToAction />
            </main>
        </Layout>
    );
}