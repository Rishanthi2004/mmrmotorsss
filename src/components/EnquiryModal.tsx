import React, { useState } from 'react';
import { X, Phone, Mail, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/companyData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, defaultService = 'Vehicle Maintenance' }) => {
  const [serviceType, setServiceType] = useState(defaultService);
  const [vehicleReg, setVehicleReg] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mailSubject = encodeURIComponent(`Enquiry: ${serviceType} - MMR MOTORS LTD`);
  const mailBody = encodeURIComponent(
    `Hello MMR MOTORS LTD Team,\n\n` +
    `I would like to enquire about: ${serviceType}\n` +
    (customerName ? `Name: ${customerName}\n` : '') +
    (customerPhone ? `Contact Phone: ${customerPhone}\n` : '') +
    (vehicleReg ? `Vehicle Reg / Make: ${vehicleReg}\n` : '') +
    (notes ? `Details / Notes: ${notes}\n` : '') +
    `\nPlease get in touch with me regarding availability and assessment.\n\nThank you.`
  );

  const mailtoLink = `mailto:${COMPANY.email}?subject=${mailSubject}&body=${mailBody}`;

  const copyDetails = () => {
    const text = 
      `Enquiry for MMR MOTORS LTD\n` +
      `Service: ${serviceType}\n` +
      (customerName ? `Name: ${customerName}\n` : '') +
      (customerPhone ? `Phone: ${customerPhone}\n` : '') +
      (vehicleReg ? `Vehicle Reg: ${vehicleReg}\n` : '') +
      (notes ? `Notes: ${notes}\n` : '') +
      `Direct Phone: ${COMPANY.phone}\n` +
      `Email: ${COMPANY.email}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#171A20] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        {/* Subtle accent rim */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E32636] via-white/40 to-[#E32636]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#B8BEC7] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold tracking-wider text-[#E32636] uppercase">Direct Workshop Contact</span>
          <h2 id="enquiry-modal-title" className="text-2xl font-bold text-white mt-1">
            Connect With Our Team
          </h2>
          <p className="text-sm text-[#B8BEC7] mt-1">
            MMR MOTORS LTD — Croydon, United Kingdom
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#B8BEC7] uppercase tracking-wider mb-1.5">
              Select Enquiry Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                'Vehicle Maintenance',
                'Repair Services',
                'Used Car Sales'
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setServiceType(type)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center whitespace-nowrap ${
                    serviceType === type 
                      ? 'border-[#E32636] bg-[#E32636]/10 text-white shadow-sm' 
                      : 'border-white/10 bg-[#0B0D10]/60 text-[#B8BEC7] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {type === 'Vehicle Maintenance' ? 'Maintenance' : type === 'Repair Services' ? 'Repair' : 'Used Cars'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#B8BEC7] uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0B0D10] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E32636] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#B8BEC7] uppercase tracking-wider mb-1">
                Vehicle Reg / Model
              </label>
              <input
                type="text"
                placeholder="e.g. AB21 CDE"
                value={vehicleReg}
                onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-[#0B0D10] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E32636] transition-colors uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B8BEC7] uppercase tracking-wider mb-1">
              Your Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 07123 456789"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0B0D10] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E32636] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B8BEC7] uppercase tracking-wider mb-1">
              Specific Requirements / Symptoms
            </label>
            <textarea
              rows={2}
              placeholder="Describe what you need or ask about available vehicle stock..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0B0D10] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E32636] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <a
            href={mailtoLink}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E32636] hover:bg-[#c41e2d] text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#E32636]/20 transition-all hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
          >
            <Mail className="w-4 h-4" />
            <span>Launch Email Draft</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </a>

          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0B0D10] hover:bg-white/5 border border-white/20 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#E32636]" />
            <span>Call {COMPANY.phone}</span>
          </a>

          <button
            type="button"
            onClick={copyDetails}
            className="inline-flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[#B8BEC7] hover:text-white rounded-lg transition-colors"
            title="Copy formatted enquiry to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-[#B8BEC7]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct contact with our Croydon workshop</span>
          </div>
          <span>Croydon CRO 2EZ</span>
        </div>
      </div>
    </div>
  );
};
