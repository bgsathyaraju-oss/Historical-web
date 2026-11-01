import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, CheckCircle, Send } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: 'General Historical Inquiry'
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D8C3A2] pb-6 space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading">
          <Mail className="w-4 h-4 text-[#A87924]" />
          <span>Editorial Board & Community Communication</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          Contact the Historical Documentation Project
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948] max-w-2xl mx-auto leading-relaxed">
          Reach our academic editors, epigraphists, and archival curators regarding historical inquiries, document donations, or research corrections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-4">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
              Archival Liaison Offices
            </h3>

            <div className="space-y-4 text-xs text-[#292521]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A87924] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#54351F] block">Cuttack (Varanasi Kataka) Research Cell:</strong>
                  <span>Barabati Heritage Enclave, Cuttack, Odisha 753001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A87924] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#54351F] block">Southern Deccan Coordination Center:</strong>
                  <span>Visakhapatnam & Bengaluru Heritage Chapters</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A87924] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#54351F] block">Scholarly & Editorial Inquiries:</strong>
                  <span>editorial@suryavamsha-heritage.org</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-2 text-xs text-[#292521]">
            <h4 className="font-bold text-[#54351F]">Confidential Lineage Custody</h4>
            <p>
              If your family holds fragile palm-leaf manuscripts or copper charters requiring emergency physical conservation, our conservationists provide free non-destructive digital scanning.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          {sent ? (
            <div className="p-10 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-[#1c5236] mx-auto" />
              <h3 className="font-royal-heading font-bold text-xl text-[#54351F]">
                Thank You for Your Communication
              </h3>
              <p className="text-xs text-[#6B5948]">
                Your message has been routed to the appropriate editorial desk. A response will be provided within two working days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-[0_6px_20px_rgba(75,51,31,0.08)]">
              <div>
                <label className="block text-xs font-semibold text-[#54351F] mb-1">Inquiry Purpose</label>
                <select
                  value={formData.inquiry_type}
                  onChange={e => setFormData({ ...formData, inquiry_type: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FFFFFF] text-[#292521] border border-[#D8C3A2]"
                >
                  <option>General Historical Inquiry</option>
                  <option>Manuscript / Copper-Plate Donation</option>
                  <option>Correction to Published Citation</option>
                  <option>Community Matrimonial or Directory Question</option>
                  <option>Academic Research Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#54351F] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. K.S. Raju"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#54351F] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#54351F] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject of inquiry..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#54351F] mb-1">Detailed Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#762D35] text-white hover:bg-[#5e2229] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Communication to Editorial Board</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
