"use client";

import React, { useState } from 'react';
import { plans } from '@/data/plans';
import { Download, TrendingUp, Users, BriefcaseBusiness, ArrowRight } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

import confetti from 'canvas-confetti';

export function PricingCalculator() {
  const [seats, setSeats] = useState<number>(100);
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('gemini-enterprise-standard');
  const [rolloutMode, setRolloutMode] = useState<'pilot' | 'full'>('pilot');
  const [pilotSeats, setPilotSeats] = useState(25);
  const [seatMix, setSeatMix] = useState({ knowledgeWorkers: 65, managers: 25, executives: 10 });
  const [adoptionRate, setAdoptionRate] = useState(70);
  const [hoursSavedPerUserMonth, setHoursSavedPerUserMonth] = useState(18);
  const [averageHourlyRate, setAverageHourlyRate] = useState(50);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const baseMonthlyPrice = selectedPlan.monthlyPriceUSD || 30;
  const baseAnnualPrice = selectedPlan.annualPriceUSD || Math.round(baseMonthlyPrice * 0.83);

  const perUserPrice = isAnnual ? baseAnnualPrice : baseMonthlyPrice;
  const monthlyTotal = perUserPrice * seats;
  const annualTotal = monthlyTotal * 12;

  const activeSeats = rolloutMode === 'pilot' ? pilotSeats : seats;
  const monthlyValueGenerated = activeSeats * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate;
  const annualValue = monthlyValueGenerated * 12;
  const roi = monthlyTotal > 0 ? ((monthlyValueGenerated - monthlyTotal) / monthlyTotal) * 100 : 0;
  const breakEvenMonths = monthlyValueGenerated > 0 ? Math.max(0, monthlyTotal / monthlyValueGenerated) : 0;

  const pilotMonthly = perUserPrice * pilotSeats;
  const fullMonthly = perUserPrice * seats;

  const segmentBreakdown = [
    { label: 'Knowledge workers', percentage: seatMix.knowledgeWorkers, seats: Math.round((seats * seatMix.knowledgeWorkers) / 100), color: 'bg-google-blue' },
    { label: 'Managers', percentage: seatMix.managers, seats: Math.round((seats * seatMix.managers) / 100), color: 'bg-gemini-indigo' },
    { label: 'Executives', percentage: seatMix.executives, seats: Math.round((seats * seatMix.executives) / 100), color: 'bg-google-green' },
  ];

  const scenarioComparison = [
    {
      name: 'Pilot',
      seats: pilotSeats,
      investment: perUserPrice * pilotSeats,
      value: pilotSeats * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate,
      payback: pilotSeats * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate > 0 ? (perUserPrice * pilotSeats) / (pilotSeats * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate) : 0,
    },
    {
      name: 'Phased',
      seats: Math.round(seats * 0.6),
      investment: perUserPrice * Math.round(seats * 0.6),
      value: Math.round(seats * 0.6) * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate,
      payback: Math.round(seats * 0.6) * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate > 0 ? (perUserPrice * Math.round(seats * 0.6)) / (Math.round(seats * 0.6) * (hoursSavedPerUserMonth * adoptionRate / 100) * averageHourlyRate) : 0,
    },
    {
      name: 'Full rollout',
      seats,
      investment: monthlyTotal,
      value: monthlyValueGenerated,
      payback: breakEvenMonths,
    },
  ];

  const recommendation =
    roi > 150
      ? `Recommend ${selectedPlan.name} with a phased deployment to capture strong productivity returns while keeping governance risk controlled.`
      : rolloutMode === 'pilot'
        ? `Recommend starting with a pilot of ${pilotSeats} seats and validating adoption before expanding.`
        : `Recommend ${selectedPlan.name} once security controls, data governance, and adoption metrics are approved.`;

  const handleSeatMixChange = (key: 'knowledgeWorkers' | 'managers' | 'executives', value: number) => {
    const next = { ...seatMix, [key]: value };
    const total = next.knowledgeWorkers + next.managers + next.executives;
    if (total === 0) return;

    const normalized = {
      knowledgeWorkers: next.knowledgeWorkers / total,
      managers: next.managers / total,
      executives: next.executives / total,
    };

    setSeatMix({
      knowledgeWorkers: Math.round(normalized.knowledgeWorkers * 100),
      managers: Math.round(normalized.managers * 100),
      executives: 100 - Math.round(normalized.knowledgeWorkers * 100) - Math.round(normalized.managers * 100),
    });
  };

  const handleExport = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#7C3AED'],
      });
    } catch {
      // safe fallback
    }

    const content = `
Gemini Enterprise Quote Summary
-----------------------------
Plan: ${selectedPlan.name} (${selectedPlan.category})
Seats: ${seats}
Billing Cycle: ${isAnnual ? 'Annual Commitment (Billed Annually)' : 'Monthly Flexible'}

Investment:
Price per User: ${formatCurrency(perUserPrice)} / month
Total Monthly Commitment: ${formatCurrency(monthlyTotal)}
Total Annual Commitment: ${formatCurrency(annualTotal)}

Productivity & ROI Metrics:
Estimated Hours Saved: ${hoursSavedPerUserMonth} hours / user / month
Estimated Monthly Value: ${formatCurrency(monthlyValueGenerated)} / month
Estimated Annual Value: ${formatCurrency(annualValue)} / year
Estimated ROI: ${roi.toFixed(0)}%
Break-Even: ${breakEvenMonths.toFixed(1)} months

Generated by MarketStar Gemini Enterprise Intelligence Platform
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `gemini-quote-${seats}-seats.txt`);
    link.click();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div className="atlas-card rounded-2xl border p-6">
            <h3 className="text-lg font-semibold text-foreground">Rollout scenario</h3>
            <p className="mt-1 text-sm text-muted-foreground">Model a controlled pilot before committing to the full organization.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setRolloutMode('pilot')} className={cn('rounded-xl border p-4 text-left transition', rolloutMode === 'pilot' ? 'border-google-blue bg-google-blue/10' : 'border-border hover:bg-muted')}>
                <span className="block font-semibold text-foreground">Pilot rollout</span>
                <span className="mt-1 block text-xs text-muted-foreground">{pilotSeats} users · {formatCurrency(pilotMonthly)}/month</span>
              </button>
              <button type="button" onClick={() => setRolloutMode('full')} className={cn('rounded-xl border p-4 text-left transition', rolloutMode === 'full' ? 'border-google-blue bg-google-blue/10' : 'border-border hover:bg-muted')}>
                <span className="block font-semibold text-foreground">Full rollout</span>
                <span className="mt-1 block text-xs text-muted-foreground">{seats.toLocaleString()} users · {formatCurrency(fullMonthly)}/month</span>
              </button>
            </div>
            <label className="mt-5 block text-sm font-medium text-foreground">Pilot seats: <span className="font-mono text-google-blue">{pilotSeats}</span></label>
            <input aria-label="Pilot seats" type="range" min="5" max={Math.max(5, seats)} step="5" value={pilotSeats} onChange={(event) => setPilotSeats(Number(event.target.value))} className="mt-3 h-2 w-full accent-google-blue" />
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Organization Size</h3>
                <p className="text-sm text-muted-foreground">Adjust the number of user licenses needed.</p>
              </div>
              <div className="text-3xl font-bold font-mono bg-background text-foreground px-4 py-2 rounded-xl border border-border">
                {seats.toLocaleString()} <span className="text-base text-muted-foreground font-sans font-normal">seats</span>
              </div>
            </div>

            <input
              type="range"
              min="5"
              max="5000"
              step="5"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-google-blue"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
              <span>5</span>
              <span>2,500</span>
              <span>5,000</span>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Seat segmentation</h3>
                <p className="text-sm text-muted-foreground">Model who is actually using the platform across the org.</p>
              </div>
            </div>

            <div className="space-y-5">
              {segmentBreakdown.map((segment) => (
                <div key={segment.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{segment.label}</span>
                    <span className="font-mono text-muted-foreground">{segment.percentage}% · {segment.seats} seats</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={segment.percentage}
                    onChange={(event) => {
                      const nextValue = Number(event.target.value);
                      const targetKey = segment.label === 'Knowledge workers' ? 'knowledgeWorkers' : segment.label === 'Managers' ? 'managers' : 'executives';
                      const remaining = 100 - nextValue;
                      const otherTwo = ['knowledgeWorkers', 'managers', 'executives'].filter((key) => key !== targetKey);

                      const nextMix = { knowledgeWorkers: seatMix.knowledgeWorkers, managers: seatMix.managers, executives: seatMix.executives };
                      const totalOther = otherTwo.reduce((sum, key) => sum + nextMix[key as keyof typeof nextMix], 0);

                      if (totalOther === 0) {
                        setSeatMix({ knowledgeWorkers: 65, managers: 25, executives: 10 });
                        return;
                      }

                      const proportion = remaining / totalOther;
                      const updated = { ...nextMix, [targetKey]: nextValue };

                      for (const key of otherTwo) {
                        updated[key as keyof typeof updated] = Math.max(0, Math.round(nextMix[key as keyof typeof nextMix] * proportion));
                      }

                      const fixedTotal = updated.knowledgeWorkers + updated.managers + updated.executives;
                      if (fixedTotal !== 100) {
                        updated.executives = Math.max(0, 100 - updated.knowledgeWorkers - updated.managers);
                      }

                      setSeatMix(updated);
                    }}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-google-blue"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Select Plan</h3>
                <p className="text-sm text-muted-foreground">Choose the tier that fits your needs.</p>
              </div>

              <div className="flex items-center gap-2 p-1 bg-muted rounded-lg border border-border">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors',
                    !isAnnual ? 'bg-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-1',
                    isAnnual ? 'bg-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Annual <span className="text-[10px] bg-google-green/20 text-google-green px-1.5 py-0.5 rounded-full">Save ~17%</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    'p-4 rounded-xl border cursor-pointer transition-all hover:border-google-blue/50 relative',
                    selectedPlanId === plan.id ? 'bg-google-blue/5 border-google-blue ring-1 ring-google-blue' : 'bg-background border-border hover:bg-muted/30'
                  )}
                >
                  {selectedPlanId === plan.id && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-google-blue shadow-[0_0_8px_rgba(66,133,244,0.5)]" />}
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{plan.category}</div>
                  <div className="font-semibold text-foreground mb-2">{plan.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{plan.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="atlas-card rounded-2xl border p-6">
            <h3 className="text-lg font-semibold text-foreground">Adoption assumptions</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <label className="text-sm text-foreground">
                Adoption: <strong>{adoptionRate}%</strong>
                <input aria-label="Adoption rate" type="range" min="10" max="100" step="5" value={adoptionRate} onChange={(event) => setAdoptionRate(Number(event.target.value))} className="mt-3 w-full accent-google-blue" />
              </label>
              <label className="text-sm text-foreground">
                Hours saved/user: <strong>{hoursSavedPerUserMonth}</strong>
                <input aria-label="Hours saved per user" type="range" min="1" max="40" value={hoursSavedPerUserMonth} onChange={(event) => setHoursSavedPerUserMonth(Number(event.target.value))} className="mt-3 w-full accent-google-blue" />
              </label>
              <label className="text-sm text-foreground">
                Hourly value: <strong>${averageHourlyRate}</strong>
                <input aria-label="Hourly value" type="range" min="20" max="200" step="5" value={averageHourlyRate} onChange={(event) => setAverageHourlyRate(Number(event.target.value))} className="mt-3 w-full accent-google-blue" />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 bg-card p-6 rounded-2xl border border-border shadow-xl">
            <h3 className="text-xl font-bold text-foreground mb-6">Investment Summary</h3>

            <div className="space-y-6">
              <div className="pb-6 border-b border-border">
                <div className="text-sm text-muted-foreground mb-1">Per User / Month</div>
                <div className="text-4xl font-bold font-mono text-foreground">{formatCurrency(perUserPrice)}</div>
                <div className="text-xs text-muted-foreground mt-2">Billed {isAnnual ? 'annually' : 'monthly'}</div>
              </div>

              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Total</span>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(monthlyTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Annual Total</span>
                  <span className="font-mono font-bold text-lg text-foreground">{formatCurrency(annualTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated annual value</span>
                  <span className="font-mono font-bold text-foreground">{formatCurrency(annualValue)}</span>
                </div>
              </div>

              <div className="bg-gemini-indigo/10 p-4 rounded-xl border border-gemini-indigo/20">
                <div className="text-sm font-semibold text-gemini-indigo mb-2">Estimated ROI Impact</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Saved</span>
                    <span className="font-medium text-foreground">~{hoursSavedPerUserMonth} hrs/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value Generated</span>
                    <span className="font-medium text-google-green">+{formatCurrency(monthlyValueGenerated)}/mo</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t border-gemini-indigo/20">
                    <span className="font-semibold text-foreground">Est. Efficiency ROI</span>
                    <span className="font-bold text-google-green">{roi.toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between border-t border-gemini-indigo/20 pt-2">
                    <span className="text-muted-foreground">Break-even</span>
                    <span className="font-medium text-foreground">{breakEvenMonths.toFixed(1)} months</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-google-blue/20 bg-google-blue/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-google-blue">Plan recommendation</p>
                <p className="mt-2 text-sm text-foreground">{recommendation}</p>
              </div>

              <button
                onClick={handleExport}
                className="w-full py-3 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Quote Summary
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-google-blue">Scenario comparison</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">Pilot vs full rollout economics</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-google-green" />
            Value-focused planning
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {scenarioComparison.map((scenario) => (
            <div key={scenario.name} className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{scenario.name}</span>
                <span className="rounded-full bg-google-blue/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-google-blue">{scenario.seats} seats</span>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment</span>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(scenario.investment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly value</span>
                  <span className="font-mono font-medium text-google-green">{formatCurrency(scenario.value)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-muted-foreground">Break-even</span>
                  <span className="font-mono font-medium text-foreground">{scenario.payback.toFixed(1)} mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
