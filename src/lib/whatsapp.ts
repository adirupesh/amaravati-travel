export const whatsappNumber = "919030755369";
export const whatsappDisplayNumber = "+91 9030755369";

export function whatsappLink(trip?: string, week?: string) {
  const message = trip
    ? `Hello Amaravati Tours & Travel, I would like to enquire about ${trip}.${week ? ` I saw the sample weekly deal for the week of ${week}.` : ""} Please share availability and details.`
    : "Hello Amaravati Tours & Travel, I would like to plan a trip. Please help me with the details.";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
