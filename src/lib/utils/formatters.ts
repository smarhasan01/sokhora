export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat('en-BD', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount || 0);
  return `৳${formatted}`;
}

export function formatPriceBn(amount: number): string {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  const formatted = new Intl.NumberFormat('en-BD', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount || 0);

  let banglaString = formatted;
  for (let i = 0; i < 10; i++) {
    banglaString = banglaString.replaceAll(englishDigits[i], banglaDigits[i]);
  }
  return `৳${banglaString}`;
}

export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `SHK-${year}-${randomSixDigits}`;
}

export function generateInvoiceNumber(orderId?: string): string {
  if (orderId && orderId.startsWith('SHK-')) {
    return `INV-${orderId.replace('SHK-', '')}`;
  }
  const year = new Date().getFullYear();
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `INV-${year}-${randomSixDigits}`;
}

export function isValidBdPhone(phone: string): boolean {
  // Matches 01XXXXXXXXX or +8801XXXXXXXXX
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
  const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return bdPhoneRegex.test(cleaned);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return dateString;
  }
}

export const BD_DISTRICTS = [
  'Dhaka',
  'Gazipur',
  'Narayanganj',
  'Tangail',
  'Faridpur',
  'Madaripur',
  'Manikganj',
  'Munshiganj',
  'Narsingdi',
  'Rajbari',
  'Shariatpur',
  'Kishoreganj',
  'Gopalganj',
  'Chattogram',
  'Cox\'s Bazar',
  'Cumilla',
  'Feni',
  'Brahmanbaria',
  'Noakhali',
  'Chandpur',
  'Lakshmipur',
  'Rangamati',
  'Khagrachhari',
  'Bandarban',
  'Sylhet',
  'Moulvibazar',
  'Habiganj',
  'Sunamganj',
  'Rajshahi',
  'Bogura',
  'Pabna',
  'Sirajganj',
  'Naogaon',
  'Natore',
  'Chapai Nawabganj',
  'Joypurhat',
  'Khulna',
  'Jashore',
  'Satkhira',
  'Kushtia',
  'Jhenaidah',
  'Chuadanga',
  'Bagerhat',
  'Magura',
  'Meherpur',
  'Narail',
  'Barishal',
  'Patuakhali',
  'Bhola',
  'Pirojpur',
  'Barguna',
  'Jhalokati',
  'Rangpur',
  'Dinajpur',
  'Gaibandha',
  'Kurigram',
  'Lalmonirhat',
  'Nilphamari',
  'Panchagarh',
  'Thakurgaon',
  'Mymensingh',
  'Jamalpur',
  'Netrokona',
  'Sherpur'
].sort();
