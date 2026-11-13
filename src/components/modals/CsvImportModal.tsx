import React, { useState, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { useCRM } from '../../context/CRMContext';
import { Lead } from '../../types/crm';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose }) => {
  const { importLeads, leads } = useCRM();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawText, setRawText] = useState('');
  const [parsedHeaders, setParsedHeaders] = useState<string[]>([]);
  const [parsedRows, setParsedRows] = useState<string[][]>([]);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSummary, setImportSummary] = useState<{ imported: number; duplicates: number } | null>(null);

  const targetFields = [
    { key: 'business_name', label: 'Business Name (Required)' },
    { key: 'contact_name', label: 'Contact Person' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'website', label: 'Website URL' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'lead_source', label: 'Lead Source' },
    { key: 'deal_value', label: 'Deal Value' },
    { key: 'notes', label: 'Notes' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        parseCSV(content);
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    setRawText(text);
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      toast.error('CSV must have a header row and at least 1 data row');
      return;
    }

    // Split headers respecting quotes
    const headers = splitCsvRow(lines[0]);
    const rows = lines.slice(1, 11).map(line => splitCsvRow(line)); // take first 10 for preview

    setParsedHeaders(headers);
    setParsedRows(rows);

    // Auto-detect mappings
    const mappings: Record<string, string> = {};
    headers.forEach((header, idx) => {
      const h = header.toLowerCase().trim();
      if (h.includes('business') || h.includes('company') || h.includes('firm')) {
        mappings[idx] = 'business_name';
      } else if (h.includes('contact') || h.includes('person') || h.includes('name')) {
        mappings[idx] = 'contact_name';
      } else if (h.includes('email') || h.includes('mail')) {
        mappings[idx] = 'email';
      } else if (h.includes('phone') || h.includes('tel') || h.includes('mobile')) {
        mappings[idx] = 'phone';
      } else if (h.includes('website') || h.includes('url') || h.includes('site')) {
        mappings[idx] = 'website';
      } else if (h.includes('city') || h.includes('town')) {
        mappings[idx] = 'city';
      } else if (h.includes('state') || h.includes('province')) {
        mappings[idx] = 'state';
      } else if (h.includes('source')) {
        mappings[idx] = 'lead_source';
      } else if (h.includes('value') || h.includes('amount') || h.includes('deal')) {
        mappings[idx] = 'deal_value';
      } else if (h.includes('note') || h.includes('detail')) {
        mappings[idx] = 'notes';
      }
    });

    setFieldMappings(mappings);
  };

  const splitCsvRow = (row: string): string[] => {
    const result: string[] = [];
    let insideQuote = false;
    let entry = '';

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        result.push(entry.trim().replace(/^"|"$/g, ''));
        entry = '';
      } else {
        entry += char;
      }
    }
    result.push(entry.trim().replace(/^"|"$/g, ''));
    return result;
  };

  const handleExecuteImport = async () => {
    // Check if business_name is mapped
    const hasBusinessName = Object.values(fieldMappings).includes('business_name');
    if (!hasBusinessName) {
      toast.error('Please map at least the "Business Name" column');
      return;
    }

    setIsProcessing(true);
    const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
    const dataLines = lines.slice(1);

    const compiledLeads: Partial<Lead>[] = [];

    dataLines.forEach(line => {
      const values = splitCsvRow(line);
      const leadObj: any = {};

      Object.entries(fieldMappings).forEach(([colIndexStr, targetField]) => {
        const colIdx = parseInt(colIndexStr, 10);
        if (targetField && values[colIdx] !== undefined) {
          if (targetField === 'deal_value') {
            leadObj[targetField] = parseFloat(values[colIdx].replace(/[^0-9.]/g, '')) || 0;
          } else {
            leadObj[targetField] = values[colIdx];
          }
        }
      });

      if (leadObj.business_name && leadObj.business_name.trim().length > 0) {
        compiledLeads.push(leadObj);
      }
    });

    const result = await importLeads(compiledLeads);
    setIsProcessing(false);
    setImportSummary(result);
  };

  const handleClose = () => {
    setRawText('');
    setParsedHeaders([]);
    setParsedRows([]);
    setFieldMappings({});
    setImportSummary(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Import Leads from CSV"
      subtitle="Smart auto-detection, column mapping, and automatic duplicate prevention"
      maxWidth="3xl"
    >
      {importSummary ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-foreground">Import Complete!</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Successfully imported <strong>{importSummary.imported}</strong> new leads into your pipeline.
            </p>
            {importSummary.duplicates > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Skipped {importSummary.duplicates} duplicate businesses already present in your CRM.
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              Done & View Leads
            </button>
          </div>
        </div>
      ) : parsedHeaders.length === 0 ? (
        <div className="py-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer flex flex-col items-center justify-center space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Click to upload or drag & drop CSV file</p>
              <p className="text-xs text-muted-foreground mt-0.5">Supports exports from Google Maps, Apollo, LinkedIn, or Excel</p>
            </div>
            <span className="px-3 py-1 text-xs rounded-lg bg-card border border-border text-muted-foreground font-mono">
              .csv files
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Summary */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">CSV Columns Detected</p>
                <p className="text-[11px] text-muted-foreground">Verify mapped destination fields below before importing</p>
              </div>
            </div>
            <button
              onClick={() => {
                setParsedHeaders([]);
                setParsedRows([]);
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              Choose different file
            </button>
          </div>

          {/* Mapping Controls */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Column Mapping
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {parsedHeaders.map((header, idx) => {
                const currentMapped = fieldMappings[idx] || '';
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-card">
                    <span className="text-xs font-medium text-foreground truncate max-w-[140px]" title={header}>
                      {header}
                    </span>
                    <select
                      value={currentMapped}
                      onChange={(e) => setFieldMappings({ ...fieldMappings, [idx]: e.target.value })}
                      className="text-xs bg-muted border border-border rounded-lg px-2 py-1 max-w-[160px]"
                    >
                      <option value="">(Skip column)</option>
                      {targetFields.map((tf) => (
                        <option key={tf.key} value={tf.key}>{tf.label}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Preview */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Preview (First {parsedRows.length} rows)
            </h4>
            <div className="border border-border rounded-xl overflow-x-auto max-h-40">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 border-b border-border sticky top-0">
                  <tr>
                    {parsedHeaders.map((h, i) => (
                      <th key={i} className="px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">
                        {h} {fieldMappings[i] ? `→ [${fieldMappings[i]}]` : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {parsedRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-muted/30">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-1.5 text-foreground whitespace-nowrap max-w-[180px] truncate">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExecuteImport}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isProcessing ? 'Processing...' : 'Run Auto-Deduplication & Import'}</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
