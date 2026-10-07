import React, { useState, useEffect } from 'react';
import { X, Database, CheckCircle2, AlertCircle, Copy, ExternalLink, RefreshCw, Key, Globe, Shield } from 'lucide-react';
import { getSupabaseConfig, saveSupabaseConfig, testSupabaseConnection } from '../services/supabaseClient';

export default function SupabaseModal({ isOpen, onClose, onConfigSaved }) {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getSupabaseConfig();
      setUrl(config.url || '');
      setKey(config.key || '');
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    saveSupabaseConfig(url, key);
    setIsTesting(true);
    const res = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(res);

    if (onConfigSaved) {
      onConfigSaved();
    }
  };

  const handleTest = async () => {
    saveSupabaseConfig(url, key);
    setIsTesting(true);
    const res = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(res);
  };

  const handleClear = () => {
    saveSupabaseConfig('', '');
    setUrl('');
    setKey('');
    setTestResult(null);
    if (onConfigSaved) onConfigSaved();
  };

  const sqlQuickSnippet = `-- Run this in Supabase -> SQL Editor
CREATE TABLE IF NOT EXISTS public.movies (
    id BIGSERIAL PRIMARY KEY,
    movie TEXT NOT NULL,
    theatre TEXT NOT NULL,
    show_time TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 250,
    language TEXT DEFAULT 'English',
    format TEXT DEFAULT '2D',
    genre TEXT DEFAULT 'Action/Drama',
    rating NUMERIC DEFAULT 9.0,
    votes TEXT DEFAULT '25K',
    city TEXT DEFAULT 'Mumbai',
    badge TEXT DEFAULT 'Available',
    duration TEXT DEFAULT '2h 30m',
    certificate TEXT DEFAULT 'UA 16+',
    poster TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.movies FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.movies FOR INSERT WITH CHECK (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlQuickSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content supabase-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="sb-modal-header">
          <div className="sb-icon-box">
            <Database size={24} className="sb-icon" />
          </div>
          <div>
            <h3 className="sb-title">Supabase Database Integration</h3>
            <p className="sb-sub">Connect your Supabase PostgreSQL database to store movies and bookings</p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="sb-modal-body">
          
          {/* Quick Guide */}
          <div className="sb-info-card">
            <h4>Quick Setup in 2 Easy Steps:</h4>
            <ol className="sb-steps-list">
              <li>
                Create a project at <a href="https://supabase.com" target="_blank" rel="noreferrer">supabase.com</a>
              </li>
              <li>
                In Supabase, go to <strong>SQL Editor</strong> and run <code>supabase_schema.sql</code> (provided in the repository root).
              </li>
              <li>
                Copy your <strong>Project URL</strong> and <strong>Anon Key</strong> from <em>Project Settings → API</em> and paste below.
              </li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="sb-form">
            <div className="form-group">
              <label htmlFor="sb-url-input">
                <Globe size={14} />
                Supabase Project URL
              </label>
              <input
                type="url"
                id="sb-url-input"
                placeholder="https://your-project-id.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sb-key-input">
                <Key size={14} />
                Supabase Anon / Public API Key
              </label>
              <input
                type="password"
                id="sb-key-input"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {testResult && (
              <div className={`sb-test-banner ${testResult.success ? 'success' : 'error'}`}>
                {testResult.success ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Connected to Supabase successfully! ({testResult.count} movie records found in table)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} />
                    <span>Connection notice: {testResult.message}</span>
                  </>
                )}
              </div>
            )}

            <div className="sb-actions-row">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleTest}
                disabled={!url || !key || isTesting}
              >
                {isTesting ? (
                  <RefreshCw size={14} className="spin-icon" />
                ) : (
                  <Database size={14} />
                )}
                <span>Test Connection</span>
              </button>

              {url && (
                <button
                  type="button"
                  className="btn-text-danger"
                  onClick={handleClear}
                >
                  Clear Config
                </button>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={isTesting}
              >
                Save & Connect Supabase
              </button>
            </div>
          </form>

          {/* Schema Snippet Helper */}
          <div className="sb-schema-box">
            <div className="sb-schema-title-row">
              <span>SQL Schema Quick Copy:</span>
              <button type="button" className="copy-sql-btn" onClick={copySql}>
                <Copy size={13} />
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
              </button>
            </div>
            <pre className="sb-sql-snippet">{sqlQuickSnippet}</pre>
            <p className="sb-schema-footer-note">Full schema with seed data is in <code>supabase_schema.sql</code>.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
