
export function addDays(date: Date, days: number): Date {
  let result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}

export function convert_dates(body: any, fields: string[] = ["created", "updated", "timestamp"]) {
  fields.forEach(field => {
    if (body[field] !== undefined) {
      body[field] = new Date(body[field]);
    }
  });
}