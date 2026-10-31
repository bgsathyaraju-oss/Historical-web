import React, { useState, useEffect } from 'react';
import { HistoricalDocument } from '../types';
import { BookOpen } from 'lucide-react';
import { getCanonicalDocuments } from '../data/archivalSeedData';
import { useLanguage } from '../context/LanguageContext';
import { HistoricalRecordsExplorer } from '../components/HistoricalRecordDetailView';

const DOC_PAGE_HEADER: Record<string, { badge: string; title: string; subtitle: string; catalogLabel: string }> = {
  en: {
    badge: 'Archival Preservation & Manuscript Repository',
    title: 'Digitized Historical Documents & Royal Chronicles',
    subtitle: 'High-resolution records of palm-leaf manuscripts, temple chronicles (Madala Panji), legal codices (Sarasvati Vilasa), and copper-plate grants with provenance details and open educational licensing.',
    catalogLabel: 'Archival Catalog'
  },
  hi: {
    badge: 'अभिलेखीय संरक्षण एवं पांडुलिपि कोष',
    title: 'डिजिटल ऐतिहासिक दस्तावेज़ एवं राजकीय इतिवृत्त',
    subtitle: 'ताड़पत्र पांडुलिपियों, मंदिर इतिवृत्तों (मादला पांजी), विधिक संहिताओं (सरस्वती विलास) और ताम्रपत्रों का प्रामाणिक संग्रह।',
    catalogLabel: 'अभिलेखीय सूची'
  },
  te: {
    badge: 'పురాతన తాళపత్ర & చారిత్రక పత్రాల భాండాగారం',
    title: 'డిజిటలైజ్డ్ చారిత్రక పత్రాలు & రాజ వంశావళి గ్రంథాలు',
    subtitle: 'తాళపత్ర గ్రంథాలు, పూరి ఆలయ చరిత్ర (మాదళ పంజి), న్యాయ గ్రంథాలు (సరస్వతీ విలాసం) మరియు తామ్రశాసనాల ప్రామాణిక సేకరణ.',
    catalogLabel: 'చారిత్రక పత్రాల జాబితా'
  },
  kn: {
    badge: 'ಪುರಾತನ ಹಸ್ತಪ್ರತಿ ಮತ್ತು ದಾಖಲೆಗಳ ಸಂಗ್ರಹಾಲಯ',
    title: 'ಡಿಜಿಟಲ್ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ರಾಜ ವೃತ್ತಾಂತಗಳು',
    subtitle: 'ತಾಳೆಗರಿಯ ಹಸ್ತಪ್ರತಿಗಳು, ದೇವಾಲಯ ವೃತ್ತಾಂತಗಳು (ಮಾದಲಾ ಪಂಜಿ), ನ್ಯಾಯ ಗ್ರಂಥಗಳು (ಸರಸ್ವತೀ ವಿಲಾಸ) ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳ ದಾಖಲಾತಿ।',
    catalogLabel: 'ದಾಖಲೆಗಳ ಪಟ್ಟಿ'
  },
  ta: {
    badge: 'ஆவணப் பாதுகாப்பு மற்றும் ஓலைச்சுவடி களஞ்சியம்',
    title: 'டிஜிட்டல் வரலாற்று ஆவணங்கள் மற்றும் அரச குறிப்புகள்',
    subtitle: 'ஓலைச்சுவடிகள், கோயில் வரலாறுகள் (மாதளா பஞ்சி), சட்ட நூல்கள் (சரஸ்வதி விலாசம்) மற்றும் செப்பேடுகளின் தொகுப்பு.',
    catalogLabel: 'ஆவணப் பட்டியல்'
  },
  mr: {
    badge: 'अभिलेखीय जतन आणि हस्तलिखित संग्रहालय',
    title: 'डिजिटल ऐतिहासिक दस्तऐवज आणि राजकीय बखरी',
    subtitle: 'ताडपत्र हस्तलिखिते, मंदिर इतिवृत्त (मादला पांजी), विधी संहिता (सरस्वती विलास) आणि ताम्रपटांचा प्रामाणिक संग्रह.',
    catalogLabel: 'दस्तऐवज सूची'
  },
  or: {
    badge: 'ଅଭିଲେଖ ସଂରକ୍ଷଣ ଓ ତାଳପତ୍ର ପୋଥି ଭଣ୍ଡାର',
    title: 'ଡିଜିଟାଲ୍ ଐତିହାସିକ ଦଲିଲ ଓ ରାଜକୀୟ ଇତିବୃତ୍ତ',
    subtitle: 'ତାଳପତ୍ର ପୋଥି, ମାଦଳା ପାଞ୍ଜି, ଆଇନ ଗ୍ରନ୍ଥ (ସରସ୍ୱତୀ ବିଳାସ) ଏବଂ ତାମ୍ରଶାସନର ପ୍ରାମାଣିକ ସଂଗ୍ରହ।',
    catalogLabel: 'ଅଭିଲେଖ ତାଲିକା'
  },
  bn: {
    badge: 'আর্কাইভাল সংরক্ষণ ও পাণ্ডুলিপি ভাণ্ডার',
    title: 'ডিজিটাল ঐতিহাসিক নথিপত্র ও রাজকীয় ইতিবৃত্ত',
    subtitle: 'তালপাতার পুঁথি, মন্দির ইতিবৃত্ত (মাদলা পাঞ্জি), আইনগ্রন্থ (সরস্বতী বিলাস) এবং তাম্রশাসনের প্রামাণ্য সংগ্রহ।',
    catalogLabel: 'নথিপত্র তালিকা'
  }
};

interface HistoricalDocumentsPageProps {
  onNavigate?: (path: string) => void;
  initialDocumentId?: string | null;
}

export const HistoricalDocumentsPage: React.FC<HistoricalDocumentsPageProps> = ({ onNavigate, initialDocumentId }) => {
  const { language } = useLanguage();
  const hdr = DOC_PAGE_HEADER[language] || DOC_PAGE_HEADER.en;

  const [documents, setDocuments] = useState<HistoricalDocument[]>(() => getCanonicalDocuments(language));

  useEffect(() => {
    const localDocs = getCanonicalDocuments(language);
    setDocuments(localDocs);

    fetch(`/api/content/documents?lang=${language}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.documents && d.documents.length > 0) {
          setDocuments(d.documents);
        }
      })
      .catch(() => {});
  }, [language]);

  return (
    <HistoricalRecordsExplorer
      defaultCategory="documents"
      basePath="/documents"
      initialRecordId={initialDocumentId}
      onNavigate={onNavigate}
      externalDocuments={documents}
      pageBadge={hdr.badge}
      pageTitle={hdr.title}
      pageSubtitle={hdr.subtitle}
      headerIcon={<BookOpen className="w-4 h-4" />}
    />
  );
};

