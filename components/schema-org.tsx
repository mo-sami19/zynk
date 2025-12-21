'use client';

interface SchemaOrgProps {
  locale: 'en' | 'ar';
}

export function SchemaOrg({ locale }: SchemaOrgProps) {
  const isArabic = locale === 'ar';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    "@id": "https://zynk-adv.com/#organization",
    "name": isArabic ? "زينك للإعلان" : "ZYNK Advertising",
    "alternateName": "ZYNK Advertising Agency",
    "legalName": "ZYNK Advertising & Digital Marketing",
    "url": "https://zynk-adv.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zynk-adv.com/images/logo/zynk-logo.png",
      "width": 512,
      "height": 512
    },
    "image": "https://zynk-adv.com/images/logo/zynk-logo.png",
    "description": isArabic 
      ? "زينك للإعلان هي وكالة تسويق رقمي وإعلان رائدة في مصر. نقدم خدمات تحسين محركات البحث، التسويق عبر وسائل التواصل الاجتماعي، التسويق بالأداء، تطوير المواقع، والعلامات التجارية."
      : "ZYNK Advertising is a leading digital marketing and advertising agency in Egypt. We deliver SEO, social media marketing, performance marketing, web development, and branding services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cairo Digital Hub",
      "addressLocality": "Cairo",
      "addressRegion": "Cairo Governorate",
      "postalCode": "11511",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0444,
      "longitude": 31.2357
    },
    "areaServed": [
      // Egypt
      {
        '@type': 'City',
        name: isArabic ? 'القاهرة' : 'Cairo',
        '@id': 'https://www.wikidata.org/wiki/Q85',
      },
      {
        '@type': 'City',
        name: isArabic ? 'الإسكندرية' : 'Alexandria',
        '@id': 'https://www.wikidata.org/wiki/Q87',
      },
      {
        '@type': 'City',
        name: isArabic ? 'الجيزة' : 'Giza',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'مصر' : 'Egypt',
        '@id': 'https://www.wikidata.org/wiki/Q79',
      },
      // GCC Countries
      {
        '@type': 'Country',
        name: isArabic ? 'الإمارات العربية المتحدة' : 'United Arab Emirates',
        '@id': 'https://www.wikidata.org/wiki/Q878',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'المملكة العربية السعودية' : 'Saudi Arabia',
        '@id': 'https://www.wikidata.org/wiki/Q851',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'الكويت' : 'Kuwait',
        '@id': 'https://www.wikidata.org/wiki/Q817',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'قطر' : 'Qatar',
        '@id': 'https://www.wikidata.org/wiki/Q846',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'البحرين' : 'Bahrain',
        '@id': 'https://www.wikidata.org/wiki/Q398',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'عمان' : 'Oman',
        '@id': 'https://www.wikidata.org/wiki/Q842',
      },
      // Levant
      {
        '@type': 'Country',
        name: isArabic ? 'الأردن' : 'Jordan',
        '@id': 'https://www.wikidata.org/wiki/Q810',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'لبنان' : 'Lebanon',
        '@id': 'https://www.wikidata.org/wiki/Q822',
      },
      // North Africa
      {
        '@type': 'Country',
        name: isArabic ? 'المغرب' : 'Morocco',
        '@id': 'https://www.wikidata.org/wiki/Q1028',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'الجزائر' : 'Algeria',
        '@id': 'https://www.wikidata.org/wiki/Q262',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'تونس' : 'Tunisia',
        '@id': 'https://www.wikidata.org/wiki/Q948',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'ليبيا' : 'Libya',
        '@id': 'https://www.wikidata.org/wiki/Q1016',
      },
      // Other Arab Countries
      {
        '@type': 'Country',
        name: isArabic ? 'العراق' : 'Iraq',
        '@id': 'https://www.wikidata.org/wiki/Q796',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'اليمن' : 'Yemen',
        '@id': 'https://www.wikidata.org/wiki/Q805',
      },
      {
        '@type': 'Country',
        name: isArabic ? 'السودان' : 'Sudan',
        '@id': 'https://www.wikidata.org/wiki/Q1049',
      },
      // Regional Coverage
      {
        '@type': 'Place',
        name: isArabic ? 'الشرق الأوسط' : 'Middle East',
      },
      {
        '@type': 'Place',
        name: isArabic ? 'دول الخليج العربي' : 'GCC Countries',
      },
      {
        '@type': 'Place',
        name: isArabic ? 'شمال أفريقيا' : 'North Africa',
      },
      {
        '@type': 'Place',
        name: isArabic ? 'الوطن العربي' : 'Arab World',
      },
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+20-xxx-xxx-xxxx",
      "contactType": "customer service",
      "areaServed": "EG",
      "availableLanguage": ["en", "ar"]
    },
    "sameAs": [
      "https://www.facebook.com/zynkadv",
      "https://www.instagram.com/zynk.adv",
      "https://www.linkedin.com/company/zynk-advertising",
      "https://twitter.com/zynk_adv"
    ],
    "founder": {
      "@type": "Person",
      "name": "ZYNK Advertising Founders"
    },
    "foundingDate": "2020",
    "slogan": isArabic ? "فكر كبير، زينك أكبر" : "Think Big, Zynk Bigger",
    "knowsAbout": [
      "Digital Marketing",
      "SEO",
      "Social Media Marketing",
      "Performance Marketing",
      "Web Development",
      "Branding",
      "Content Marketing",
      "Advertising"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isArabic ? "تحسين محركات البحث" : "SEO Services",
          "description": isArabic 
            ? "خدمات تحسين محركات البحث الاحترافية في مصر"
            : "Professional SEO services in Egypt"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isArabic ? "التسويق عبر وسائل التواصل الاجتماعي" : "Social Media Marketing",
          "description": isArabic 
            ? "إدارة وتسويق وسائل التواصل الاجتماعي"
            : "Social media management and marketing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isArabic ? "تطوير المواقع" : "Web Development",
          "description": isArabic 
            ? "تطوير مواقع ويب احترافية ومتجاوبة"
            : "Professional responsive web development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isArabic ? "العلامات التجارية" : "Branding Services",
          "description": isArabic 
            ? "خدمات تصميم وتطوير العلامات التجارية"
            : "Brand design and development services"
        }
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zynk-adv.com/#localbusiness",
    "name": isArabic ? "زينك للإعلان" : "ZYNK Advertising",
    "image": "https://zynk-adv.com/images/logo/zynk-logo.png",
    "url": "https://zynk-adv.com",
    "telephone": "+20-xxx-xxx-xxxx",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cairo Digital Hub",
      "addressLocality": "Cairo",
      "addressRegion": "Cairo Governorate",
      "postalCode": "11511",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0444,
      "longitude": 31.2357
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/zynkadv",
      "https://www.instagram.com/zynk.adv",
      "https://www.linkedin.com/company/zynk-advertising"
    ]
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://zynk-adv.com/#brand",
    "name": "ZYNK Advertising",
    "alternateName": isArabic ? "زينك للإعلان" : "ZYNK Advertising Agency",
    "url": "https://zynk-adv.com",
    "logo": "https://zynk-adv.com/images/logo/zynk-logo.png",
    "slogan": isArabic ? "فكر كبير، زينك أكبر" : "Think Big, Zynk Bigger",
    "description": isArabic 
      ? "علامة تجارية رائدة في مجال التسويق الرقمي والإعلان في مصر"
      : "Leading digital marketing and advertising brand in Egypt"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://zynk-adv.com/#website",
    "url": "https://zynk-adv.com",
    "name": isArabic ? "زينك للإعلان" : "ZYNK Advertising",
    "description": isArabic 
      ? "وكالة تسويق رقمي وإعلان في مصر"
      : "Digital Marketing and Advertising Agency in Egypt",
    "publisher": {
      "@id": "https://zynk-adv.com/#organization"
    },
    "inLanguage": [locale],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zynk-adv.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isArabic ? "الرئيسية" : "Home",
        "item": `https://zynk-adv.com/${locale}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
