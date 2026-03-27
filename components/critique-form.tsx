'use client';

import { useState, useTransition } from 'react';
import { critiqueWebsite } from '@/app/actions';
import type { Critique } from '@/lib/schema';
import CritiqueResults from '@/components/critique-results';
import LoadingAnimation from '@/components/loading-animation';

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 text-white/40"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#1ae5b1]/25 bg-[#0b2a24]/70 px-4 py-2 text-sm font-medium text-[#29f0ba] shadow-[0_0_30px_rgba(41,240,186,0.08)] backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-[#29f0ba]" />
      AI-Powered Analysis
    </div>
  );
}

export default function CritiqueForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Critique | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  const hasResult = !!result;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    startTransition(async () => {
      const trimmedUrl = url.trim();
      setSubmittedUrl(trimmedUrl);

      const response = await critiqueWebsite(trimmedUrl);

      if (!response.success) {
        setError(response.error);
        setResult(null);
        return;
      }

      setError(null);
      setResult(response.data);
    });
  }

  return (
    <div
      className={
        hasResult
          ? 'mx-auto max-w-7xl px-6 py-12'
          : 'mx-auto flex min-h-screen max-w-7xl items-start justify-center px-6 pt-20 md:pt-28'
      }
    >
      <div className={hasResult ? 'w-full' : 'w-full max-w-4xl'}>
        {!hasResult ? (
          <div className="text-center">
            <Badge />

            

            <h1 className="mx-auto mt-8 max-w-4xl text-[54px] font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-[84px]">
              <span className="font-serif">Get a brutally honest</span>
              <br />
              <span className="font-serif text-[#29f0ba]">website critique</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-[#95a0b8]">
              Paste any URL and receive a detailed, conversion-focused
              analysis powered by AI.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-14 flex w-full max-w-4xl items-center gap-3 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,40,0.94),rgba(13,18,30,0.94))] p-3 shadow-[0_10px_50px_rgba(0,0,0,0.28)] backdrop-blur"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <SearchIcon />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white/35"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-14 items-center gap-2 rounded-2xl bg-[#22cfa2] px-7 text-base font-semibold text-[#07241d] transition hover:bg-[#2ae6b7] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? 'Analyzing...' : 'Analyze'}
                {!isPending ? <ArrowIcon /> : null}
              </button>
            </form>

            {/* Lottie loading animation */}
            {isPending && (
            // <div className="mt-8 rounded-[24px] border border-white/10 bg-[#0e1322] pb-8">
                <LoadingAnimation />
            // </div> 
            )}

            {error ? (
              <p className="mt-4 text-sm text-red-400">{error}</p>
            ) : null}
          </div>
        ) : (
          <div>

            <div className="mb-8">
              <form
                onSubmit={handleSubmit}
                className="flex w-full items-center gap-3 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,40,0.9),rgba(13,18,30,0.9))] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <SearchIcon />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#22cfa2] px-6 text-sm font-semibold text-[#07241d] transition hover:bg-[#2ae6b7] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? 'Analyzing...' : 'Analyze'}
                  {!isPending ? <ArrowIcon /> : null}
                </button>
              </form>

              {submittedUrl ? (
                <p className="mt-3 text-sm text-white/45">
                  Reviewing <span className="text-white/70">{submittedUrl}</span>
                </p>
              ) : null}

              {error ? (
                <p className="mt-3 text-sm text-red-400">{error}</p>
              ) : null}
            </div>

            {isPending ? (
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,22,37,0.96),rgba(11,15,28,0.96))] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-[#29f0ba]" />
                  <p className="text-base text-white/75">
                    Fetching site, extracting content, and generating critique...
                  </p>
                </div>
              </div>
            ) : null}


            {result ? <CritiqueResults critique={result} /> : null}
          </div>
        )}
      </div>
    </div>
  );
}