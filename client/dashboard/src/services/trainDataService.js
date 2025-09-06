import * as XLSX from 'xlsx';

export async function fetchTrainData() {
  const response = await fetch('/train_data.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Map and clean data as needed
  return data.map(row => ({
    id: row.Train_ID,
    name: row.Train_Name,
    type: row.Train_Type,
    priority: row.Priority,
    source: row.Source,
    destination: row.Destination,
  delay: Number(row['Delay(mins)']),
    trackNo: row.Track_No,
    section: row.Section,
    scheduledDeparture: row.Scheduled_Departure,
    scheduledArrival: row.Scheduled_Arrival,
    actualArrival: row.Actual_Arrival,
    eta: row.ETA,
    sourceLat: Number(row.Source_Lat),
    sourceLon: Number(row.Source_Lon),
    destinationLat: Number(row.Destination_Lat),
    destinationLon: Number(row.Destination_Lon),
    currentStation: row.Current_Station,
    currentLat: Number(row.Current_Lat),
    currentLon: Number(row.Current_Lon),
  }));
}