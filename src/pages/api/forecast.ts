// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const FORECAST_DAYS = 4;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { latitude, longitude, temperatureUnit } = req.query;

  const startDate = new Date(new Date().setDate(new Date().getDate() + 1));
  const bufferDate = new Date(startDate);
  const endDate = new Date(bufferDate.setDate(bufferDate.getDate() + FORECAST_DAYS));

  const startDateString = startDate.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=${temperatureUnit}&timezone=${timezone}&start_date=${startDateString}&end_date=${endDateString}`;
  const data = await fetch(URL).then((response) => response.json());

  res.status(200).json(data);
}

