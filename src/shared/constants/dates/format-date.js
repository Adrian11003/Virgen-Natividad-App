export default function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, '0'); 
  const month = String(d.getUTCMonth() + 1).padStart(2, '0'); 
  const year = d.getUTCFullYear(); 

  return `${day}-${month}-${year}`;
}