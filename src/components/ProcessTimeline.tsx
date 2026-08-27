import React from 'react';
import { FileText, SlidersHorizontal, CheckSquare, Printer, Sparkles, Truck } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    { number: '01', title: 'Share Your Requirement', desc: 'Contact our Prayagraj press or select your product parameters online.', icon: FileText },
    { number: '02', title: 'Choose Your Product', desc: 'Configure paper stock, GSM, finishes, and exact quantities.', icon: SlidersHorizontal },
    { number: '03', title: 'Approve Design', desc: 'Provide artwork or review digital soft-proof layout from our designer.', icon: CheckSquare },
    { number: '04', title: 'We Print', desc: 'Precision digital or commercial offset press production.', icon: Printer },
    { number: '05', title: 'Finishing & Quality Check', desc: 'Thermal lamination, hydraulic die-cutting & inspection.', icon: Sparkles },
    { number: '06', title: 'Pickup / Delivery', desc: 'Direct studio pickup in Dhoomanganj or local doorstep dispatch.', icon: Truck },
  ];

  return (
    <section id="process" className="section-padding" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot cyan" />
            <span className="text-caption">WORKFLOW EXCELLENCE</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            How Your Print Job Moves.
          </h2>

          <p className="text-body-large">
            A transparent 6-step production workflow ensuring zero errors, precise color reproduction, and on-time delivery.
          </p>
        </div>

        {/* 6-step Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
            position: 'relative',
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-6)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      color: 'var(--cyan)',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--paper)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--charcoal)',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 'var(--space-2)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
