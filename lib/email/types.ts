export interface BookingEmailData {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  discipline: string;
  date: string;
  timeSlot: string;
  level: string;
  participants: number;
  notes?: string;
  studioName?: string;
  studioAddress?: string;
  totalPrice?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  locale?: "fr" | "en";
}

export interface ContactEmailData {
  messageId: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category?: string;
  message: string;
  locale?: "fr" | "en";
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  mode: "smtp" | "simulation";
  recipient: string;
  previewUrl?: string;
  error?: string;
}

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  city?: string;
  postalCode?: string;
  country?: string;
  items: {
    title: string;
    quantity: number;
    price: number;
  }[];
  subtotal?: string;
  shippingCost?: string;
  totalAmount: string;
  paymentMethod: string;
  locale?: "fr" | "en";
}
