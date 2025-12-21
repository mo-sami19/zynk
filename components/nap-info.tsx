'use client';

interface NAPInfoProps {
  locale: 'en' | 'ar';
  variant?: 'full' | 'compact';
}

export function NAPInfo({ locale, variant = 'full' }: NAPInfoProps) {
  const isArabic = locale === 'ar';
  
  const napData = {
    name: isArabic ? 'زينك للإعلان' : 'ZYNK Advertising',
    address: {
      street: 'Cairo Digital Hub',
      city: isArabic ? 'القاهرة' : 'Cairo',
      region: isArabic ? 'محافظة القاهرة' : 'Cairo Governorate',
      country: isArabic ? 'مصر' : 'Egypt',
      postalCode: '11511'
    },
    phone: '+20-xxx-xxx-xxxx',
    email: 'info@zynk-adv.com',
    hours: isArabic 
      ? 'الأحد - الخميس: 9:00 صباحًا - 6:00 مساءً'
      : 'Sunday - Thursday: 9:00 AM - 6:00 PM'
  };

  if (variant === 'compact') {
    return (
      <div className="text-sm">
        <p className="font-semibold">{napData.name}</p>
        <p>{napData.address.street}, {napData.address.city}, {napData.address.country}</p>
        <p>{napData.phone}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold mb-2">
          {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
        </h3>
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-primary">{napData.name}</p>
            <p className="text-sm text-muted-foreground">
              {isArabic ? 'وكالة تسويق رقمي وإعلان' : 'Digital Marketing & Advertising Agency'}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium">{isArabic ? 'العنوان:' : 'Address:'}</p>
            <p className="text-sm text-muted-foreground">
              {napData.address.street}<br />
              {napData.address.city}, {napData.address.region}<br />
              {napData.address.country} {napData.address.postalCode}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium">{isArabic ? 'الهاتف:' : 'Phone:'}</p>
            <a href={`tel:${napData.phone}`} className="text-sm text-primary hover:underline">
              {napData.phone}
            </a>
          </div>
          
          <div>
            <p className="text-sm font-medium">{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</p>
            <a href={`mailto:${napData.email}`} className="text-sm text-primary hover:underline">
              {napData.email}
            </a>
          </div>
          
          <div>
            <p className="text-sm font-medium">{isArabic ? 'ساعات العمل:' : 'Business Hours:'}</p>
            <p className="text-sm text-muted-foreground">{napData.hours}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm font-medium mb-2">
          {isArabic ? 'المناطق التي نخدمها:' : 'Areas We Serve:'}
        </p>
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <p className="font-medium text-foreground">{isArabic ? 'مصر:' : 'Egypt:'}</p>
            <p>
              {isArabic 
                ? 'القاهرة، الجيزة، الإسكندرية، التجمع الخامس، الشيخ زايد، 6 أكتوبر، وجميع المحافظات'
                : 'Cairo, Giza, Alexandria, New Cairo, Sheikh Zayed, 6th of October, all governorates'}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">{isArabic ? 'دول الخليج:' : 'GCC Countries:'}</p>
            <p>
              {isArabic 
                ? 'الإمارات، السعودية، الكويت، قطر، البحرين، عمان'
                : 'UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman'}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">{isArabic ? 'بلاد الشام:' : 'Levant:'}</p>
            <p>
              {isArabic 
                ? 'الأردن، لبنان'
                : 'Jordan, Lebanon'}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">{isArabic ? 'شمال أفريقيا:' : 'North Africa:'}</p>
            <p>
              {isArabic 
                ? 'المغرب، الجزائر، تونس، ليبيا'
                : 'Morocco, Algeria, Tunisia, Libya'}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">{isArabic ? 'دول عربية أخرى:' : 'Other Arab Countries:'}</p>
            <p>
              {isArabic 
                ? 'العراق، اليمن، السودان'
                : 'Iraq, Yemen, Sudan'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
